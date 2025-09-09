import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const BLACKCAT_SECRET_KEY = "sk_gz6O18QV8W_badQfYWSy_V735ZRR99_eEHkQWvuHAjIlyUnd"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-signature")

    console.log("[v0] Webhook BlackCat recebido:", body)

    if (signature) {
      const expectedSignature = crypto.createHmac("sha256", BLACKCAT_SECRET_KEY).update(body).digest("hex")

      if (signature !== expectedSignature) {
        console.log("[v0] Assinatura inválida no webhook BlackCat")
        return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 })
      }
    }

    const data = JSON.parse(body)

    switch (data.event) {
      case "payment.approved":
        console.log("[v0] Pagamento aprovado:", data.transaction)
        // Aqui você pode atualizar o status do pedido no seu banco de dados
        break

      case "payment.refused":
        console.log("[v0] Pagamento recusado:", data.transaction)
        break

      case "payment.pending":
        console.log("[v0] Pagamento pendente:", data.transaction)
        break

      default:
        console.log("[v0] Evento desconhecido:", data.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Erro no webhook BlackCat:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
