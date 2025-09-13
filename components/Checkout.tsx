"use client"

import { useState } from "react"
import { X, CreditCard, QrCode, ArrowLeft, Lock, AlertCircle, Copy, CheckCircle } from "lucide-react"
import Image from "next/image"
import type { CartItem } from "@/app/page"

interface CheckoutProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  total: number
}

type PaymentMethod = "pix" | "credit_card"

interface CustomerData {
  name: string
  email: string
  phone: string
  document: string
}

export default function Checkout({ isOpen, onClose, cartItems, total }: CheckoutProps) {
  const [step, setStep] = useState<"payment" | "details" | "processing" | "success">("payment")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [isLoading, setIsLoading] = useState(false)
  const [showCardMessage, setShowCardMessage] = useState(false)
  const [copied, setCopied] = useState(false)

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    document: "",
  })

  const [transactionResult, setTransactionResult] = useState<any>(null)

  if (!isOpen) return null

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    if (method === "credit_card") {
      setShowCardMessage(true)
      return
    }
    setPaymentMethod(method)
    setStep("details")
  }

  const copyPixCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setStep("processing")

    try {
      const transactionData = {
        amount: total,
        description: `Oktoberfest Blumenau 2025 - ${cartItems.length} item(s)`,
        customer: {
          name: customerData.name,
          email: customerData.email,
          document: customerData.document.replace(/\D/g, ""), // Remove formatação do CPF
        },
      }

      console.log("[v0] Enviando dados da transação EXPFY Pay:", transactionData)

      const response = await fetch("/api/expfypay/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao processar pagamento")
      }

      console.log("[v0] Resposta da transação EXPFY Pay:", result)
      setTransactionResult(result)
      setStep("success")
    } catch (error) {
      console.error("[v0] Erro na transação:", error)
      alert(`Erro ao processar pagamento: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
      setStep("details")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      customerData.name.trim().length >= 3 &&
      customerData.email.includes("@") &&
      customerData.phone.trim().length >= 10 &&
      customerData.document.replace(/\D/g, "").length === 11
    )
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const renderPaymentSelection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-6">Escolha a forma de pagamento</h3>

      <button
        onClick={() => handlePaymentMethodSelect("pix")}
        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors flex items-center space-x-4"
      >
        <QrCode className="h-8 w-8 text-purple-600" />
        <div className="text-left">
          <div className="font-semibold">PIX</div>
          <div className="text-sm text-gray-600">Pagamento instantâneo</div>
        </div>
      </button>

      <button
        onClick={() => handlePaymentMethodSelect("credit_card")}
        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors flex items-center space-x-4 opacity-75"
      >
        <CreditCard className="h-8 w-8 text-gray-400" />
        <div className="text-left">
          <div className="font-semibold text-gray-600">Cartão de Crédito</div>
          <div className="text-sm text-red-500">Temporariamente indisponível</div>
        </div>
      </button>

      {showCardMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-500" />
              <h4 className="font-semibold text-gray-800">Pagamento Temporariamente Indisponível</h4>
            </div>
            <p className="text-gray-600 mb-6">
              Pagamentos no cartão estão temporariamente indisponíveis devido ao alto volume de vendas. Por favor,
              utilize o PIX para finalizar sua compra.
            </p>
            <button
              onClick={() => setShowCardMessage(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderDetailsForm = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={() => setStep("payment")} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold">Dados para pagamento PIX</h3>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Dados pessoais</h4>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Nome completo"
            value={customerData.name}
            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={customerData.email}
            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <input
            type="tel"
            placeholder="Telefone (11) 99999-9999"
            value={customerData.phone}
            onChange={(e) => setCustomerData({ ...customerData, phone: formatPhone(e.target.value) })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={15}
            required
          />
          <input
            type="text"
            placeholder="CPF (000.000.000-00)"
            value={customerData.document}
            onChange={(e) => setCustomerData({ ...customerData, document: formatCPF(e.target.value) })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={14}
            required
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !isFormValid()}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Lock className="h-5 w-5" />
        <span>Gerar PIX - R$ {total.toFixed(2).replace(".", ",")}</span>
      </button>

      {!isFormValid() && (
        <p className="text-sm text-gray-500 text-center">Preencha todos os campos corretamente para continuar</p>
      )}
    </div>
  )

  const renderProcessing = () => (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold mb-2">Gerando PIX...</h3>
      <p className="text-gray-600">Aguarde enquanto criamos seu código PIX</p>
    </div>
  )

  const renderSuccess = () => {
    console.log("[v0] Transaction result EXPFY Pay:", transactionResult)

    if (paymentMethod === "pix") {
      const qrCode = transactionResult?.qr_code || transactionResult?.pix_code
      const qrCodeImage = transactionResult?.qr_code_image
      const transactionId = transactionResult?.transaction_id
      const status = transactionResult?.status

      if (!transactionResult?.success && !qrCode) {
        return (
          <div className="text-center py-8 space-y-6">
            <div className="flex items-center justify-center space-x-2 text-red-600 mb-4">
              <AlertCircle className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Erro ao Gerar PIX</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Não foi possível gerar o código PIX. Verifique os dados e tente novamente.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
              <p className="font-semibold mb-1">⚠️ Detalhes técnicos:</p>
              <p>ID da transação: {transactionId || "N/A"}</p>
              <p>Status: {status || "Erro"}</p>
              {transactionResult?.error && <p>Erro: {transactionResult.error}</p>}
            </div>
            <button
              onClick={() => setStep("payment")}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )
      }

      return (
        <div className="text-center py-8 space-y-6">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
            <CheckCircle className="h-8 w-8" />
            <h3 className="text-2xl font-bold">PIX Gerado com Sucesso!</h3>
          </div>

          <p className="text-gray-600 mb-6">Escaneie o QR Code com seu banco ou copie o código PIX abaixo:</p>

          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg max-w-sm mx-auto">
            {qrCodeImage ? (
              <img
                src={qrCodeImage || "/placeholder.svg"}
                alt="QR Code PIX"
                className="w-full h-auto max-w-[280px] mx-auto rounded-lg"
                onError={(e) => {
                  console.log("[v0] Erro ao carregar QR Code image")
                  e.currentTarget.style.display = "none"
                }}
              />
            ) : (
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500 text-sm">QR Code não disponível</span>
                </div>
              </div>
            )}
          </div>

          {qrCode && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800">Ou copie o código PIX:</p>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-xs font-mono break-all text-gray-700 mb-3 leading-relaxed max-h-20 overflow-y-auto">
                  {qrCode}
                </div>
                <button
                  onClick={() => copyPixCode(qrCode)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      <span>Copiar Código PIX</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">⏰ Importante:</p>
            <p>O PIX expira em 24 horas. Após o pagamento, você receberá a confirmação por e-mail.</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
            <p className="font-semibold mb-1">✅ Transação criada:</p>
            <p>ID: {transactionId}</p>
            <p>Valor: R$ {total.toFixed(2).replace(".", ",")}</p>
            <p>Status: {status || "Aguardando pagamento"}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-600">Pagamento aprovado!</h3>
        <p className="text-gray-600">Seu pagamento foi processado com sucesso.</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="https://eleventickets.s3.amazonaws.com/ambiente_operacoes/front_socios_experience/Eleven_Tickets_Positivo_Horizontal.png"
              alt="ElevenTickets"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-3">Resumo do pedido</h4>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <span className="text-sm">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-sm font-semibold">
                  R$ {((item.price + item.tax) * item.quantity).toFixed(2).replace(".", ",")}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          </div>

          {step === "payment" && renderPaymentSelection()}
          {step === "details" && renderDetailsForm()}
          {step === "processing" && renderProcessing()}
          {step === "success" && renderSuccess()}
        </div>
      </div>
    </div>
  )
}
