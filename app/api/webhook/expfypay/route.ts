import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const EXPFYPAY_SECRET_KEY = "sk_06889fa35c930f3ae67f76063eac467ed0764d2f4415ba7a5210985b9ec47ea5"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("X-Signature")

    console.log("[v0] Webhook EXPFY Pay recebido - Body length:", body.length)
    console.log("[v0] Signature recebida:", signature)

    if (!signature) {
      console.error("[v0] Webhook sem assinatura")
      return NextResponse.json({ error: "Assinatura ausente" }, { status: 401 })
    }

    const expectedSignature = crypto.createHmac("sha256", EXPFYPAY_SECRET_KEY).update(body, "utf8").digest("hex")

    console.log("[v0] Assinatura esperada:", expectedSignature)
    console.log("[v0] Assinatura recebida:", signature)

    // Comparação segura de assinaturas
    const signatureBuffer = Buffer.from(signature, "hex")
    const expectedBuffer = Buffer.from(expectedSignature, "hex")

    if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
      console.error("[v0] Assinatura inválida - webhook rejeitado")
      return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 })
    }

    const data = JSON.parse(body)
    console.log("[v0] Webhook EXPFY Pay validado com sucesso:", JSON.stringify(data, null, 2))

    switch (data.event) {
      case "payment.received":
        console.log("[v0] 💰 Pagamento recebido e em processamento")
        console.log("[v0] Transaction ID:", data.transaction_id)
        console.log("[v0] External ID:", data.external_id)
        console.log("[v0] Valor:", data.amount)

        // Aqui você pode atualizar o status do pedido para "processando"
        // Exemplo: await updateOrderStatus(data.external_id, 'processing')
        break

      case "payment.confirmed":
        console.log("[v0] ✅ Pagamento confirmado e concluído!")
        console.log("[v0] Transaction ID:", data.transaction_id)
        console.log("[v0] External ID:", data.external_id)
        console.log("[v0] Valor:", data.amount)
        console.log("[v0] Pago em:", data.paid_at)

        if (data.pix_data) {
          console.log("[v0] End-to-End ID:", data.pix_data.end2end_id)
          console.log("[v0] Recibo:", data.pix_data.receipt_url)
        }

        // Aqui você pode atualizar o status do pedido para "pago" e liberar o produto/ingresso
        // Exemplo: await updateOrderStatus(data.external_id, 'completed')
        // Exemplo: await sendTicketEmail(data.external_id)
        break

      case "withdrawl.processing":
        console.log("[v0] 🔄 Saque em processamento:", data.transaction_id)
        break

      case "withdrawl.completed":
        console.log("[v0] ✅ Saque concluído:", data.transaction_id)
        break

      default:
        console.log("[v0] ⚠️ Evento desconhecido recebido:", data.event)
        console.log("[v0] Dados completos:", data)
    }

    return NextResponse.json({
      received: true,
      event: data.event,
      transaction_id: data.transaction_id,
      processed_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Erro no webhook EXPFY Pay:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Erro interno",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
