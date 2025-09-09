import { type NextRequest, NextResponse } from "next/server"

const BLACKCAT_API_URL = "https://api.blackcatpagamentos.com/v1/transactions"
const BLACKCAT_PUBLIC_KEY = "pk_oDkKF3U0xJtl-K3wdCkWXDpGV3eS9mEZPnWtHMcfKR-5k9c7"
const BLACKCAT_SECRET_KEY = "sk_gz6O18QV8W_badQfYWSy_V735ZRR99_eEHkQWvuHAjIlyUnd"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Processando transação BlackCat:", body)

    const payload = {
      amount: Math.round(body.amount * 100), // Converter para centavos
      paymentMethod: "pix",
      items: [
        {
          title: body.description || "Ingresso Oktoberfest", // Mudando de 'name' para 'title'
          quantity: 1,
          unitPrice: Math.round(body.amount * 100), // Mudando de 'price' para 'unitPrice'
          tangible: false, // Adicionando campo obrigatório 'tangible'
        },
      ],
      customer: {
        name: body.customer.name,
        document: {
          type: "cpf", // Transformando document em objeto com type e number
          number: body.customer.document,
        },
        email: body.customer.email,
        phone: body.customer.phone || "",
      },
      postbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/api/webhook/blackcat`,
      externalRef: `oktoberfest_${Date.now()}`,
      ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
    }

    console.log("[v0] Enviando payload BlackCat:", JSON.stringify(payload))

    const auth = "Basic " + Buffer.from(BLACKCAT_PUBLIC_KEY + ":" + BLACKCAT_SECRET_KEY).toString("base64")

    const response = await fetch(BLACKCAT_API_URL, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log(`[v0] Status da resposta BlackCat:`, response.status)

    const contentType = response.headers.get("content-type")

    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text()
      console.log(`[v0] Resposta não-JSON:`, textResponse.substring(0, 500))

      return NextResponse.json(
        {
          error: "API BlackCat retornou HTML em vez de JSON",
          details: "Possível problema com credenciais ou endpoint",
          response_preview: textResponse.substring(0, 200),
          status_code: response.status,
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    console.log("[v0] Resposta completa BlackCat:", JSON.stringify(data, null, 2))

    if (response.ok) {
      console.log("[v0] Transação BlackCat criada com sucesso:", data)

      return NextResponse.json({
        success: true,
        transaction_id: data.id || data.transaction_id,
        qr_code: data.pix?.qrcode || data.qr_code, // BlackCat usa 'qrcode' não 'qr_code'
        qr_code_image: data.pix?.qr_code_image || data.qr_code_image,
        amount: data.amount,
        status: data.status,
        external_ref: data.externalRef || payload.externalRef,
        pix_code: data.pix?.qrcode || data.pix_code, // Usando 'qrcode' como fallback
        expires_at: data.pix?.expirationDate || data.expires_at, // BlackCat usa 'expirationDate'
      })
    } else {
      console.log(`[v0] Erro na API BlackCat:`, data)

      return NextResponse.json(
        {
          error: "Erro na API BlackCat",
          details: data,
          status_code: response.status,
        },
        { status: response.status },
      )
    }
  } catch (error) {
    console.error("[v0] Erro interno BlackCat:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
