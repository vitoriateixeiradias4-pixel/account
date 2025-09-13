import { type NextRequest, NextResponse } from "next/server"

const EXPFYPAY_API_URL = "https://pro.expfypay.com/api/v1"
const EXPFYPAY_PUBLIC_KEY = "pk_8ff8931040d747c35681fca332705c5c8ed8ebcad7b0bf75"
const EXPFYPAY_SECRET_KEY = "sk_06889fa35c930f3ae67f76063eac467ed0764d2f4415ba7a5210985b9ec47ea5"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Processando transação EXPFY Pay:", body)

    const payload = {
      amount: body.amount,
      description: body.description || "Oktoberfest Blumenau 2025",
      customer: {
        name: body.customer.name,
        document: body.customer.document,
        email: body.customer.email,
      },
      external_id: `oktoberfest_${Date.now()}`,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"}/api/webhook/expfypay`,
    }

    console.log("[v0] Enviando payload EXPFY Pay:", JSON.stringify(payload))

    try {
      console.log(`[v0] Tentando endpoint oficial: ${EXPFYPAY_API_URL}/payments`)

      const response = await fetch(`${EXPFYPAY_API_URL}/payments`, {
        method: "POST",
        headers: {
          "X-Public-Key": EXPFYPAY_PUBLIC_KEY,
          "X-Secret-Key": EXPFYPAY_SECRET_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "Oktoberfest-Site/1.0",
        },
        body: JSON.stringify(payload),
      })

      console.log(`[v0] Status da resposta:`, response.status)
      console.log(`[v0] Headers da resposta:`, Object.fromEntries(response.headers.entries()))

      const contentType = response.headers.get("content-type")

      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.log(`[v0] Resposta não-JSON:`, textResponse.substring(0, 500))

        return NextResponse.json(
          {
            error: "API EXPFY Pay retornou HTML em vez de JSON",
            details: "Possível problema com credenciais ou endpoint",
            response_preview: textResponse.substring(0, 200),
            status_code: response.status,
          },
          { status: 500 },
        )
      }

      const data = await response.json()
      console.log("[v0] Resposta completa da API:", JSON.stringify(data, null, 2))

      if (response.ok) {
        console.log("[v0] Transação EXPFY Pay criada com sucesso:", data)

        return NextResponse.json({
          success: true,
          transaction_id: data.transaction_id || data.data?.transaction_id,
          qr_code: data.qr_code || data.data?.qr_code,
          qr_code_image: data.qr_code_image || data.data?.qr_code_image,
          amount: data.amount || data.data?.amount || payload.amount,
          status: data.status || data.data?.status || "pending",
          external_id: data.external_id || data.data?.external_id || payload.external_id,
          pix_code: data.pix_code || data.data?.pix_code,
          expires_at: data.expires_at || data.data?.expires_at,
        })
      } else {
        console.log(`[v0] Erro na API EXPFY Pay:`, data)

        return NextResponse.json(
          {
            error: "Erro na API EXPFY Pay",
            details: data,
            status_code: response.status,
            endpoint_used: "/payments",
          },
          { status: response.status },
        )
      }
    } catch (fetchError) {
      console.log(`[v0] Erro de conexão com EXPFY Pay:`, fetchError)

      return NextResponse.json(
        {
          error: "Erro de conexão com EXPFY Pay",
          details: fetchError instanceof Error ? fetchError.message : "Erro desconhecido",
          suggestion: "Verifique se a API EXPFY Pay está online e as credenciais estão corretas",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Erro interno EXPFY Pay:", error)
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
