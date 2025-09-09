import { CreditCard, Shield, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function PaymentInfo() {
  const paymentMethods = [
    { name: "PIX", logo: "/payment-pix.png" },
    { name: "Mastercard", logo: "/mastercard-logo.png" },
    { name: "Visa", logo: "/visa-logo-generic.png" },
    { name: "Elo", logo: "/elo-card-logo.jpg" },
    { name: "American Express", logo: "/american-express-logo.png" },
    { name: "Hipercard", logo: "/hipercard-logo.jpg" },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Métodos de pagamento
            </h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="flex items-center justify-center p-2">
                  <Image
                    src={method.logo || "/placeholder.svg"}
                    alt={method.name}
                    width={60}
                    height={24}
                    className="h-6 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="bg-green-50 text-green-700 text-center py-2 px-4 rounded-full text-sm">
              Parcele sua compra em até 12x
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Segurança para sua compra
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Image
                  src="/pci-dss-security-certification-logo.jpg"
                  alt="PCI DSS"
                  width={120}
                  height={43}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/google-safe-browsing-security-logo.jpg"
                  alt="Google Safe"
                  width={120}
                  height={43}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Precisa de ajuda?
            </h4>
            <p className="text-gray-600 mb-4 text-sm">
              Nossa equipe está pronta para te auxiliar, clique no botão abaixo e fale com nossos atendentes.
            </p>
            <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 px-4 rounded-full transition-colors flex items-center justify-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Fale conosco
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
