import Image from "next/image"

export default function Footer() {
  const footerLinks = [
    { name: "Minha Conta", href: "/cadastro" },
    { name: "Perguntas Frequentes", href: "/faq" },
    { name: "Contato", href: "/contato" },
    { name: "Termos de Uso", href: "/termos-de-uso" },
    { name: "Política de Privacidade", href: "/politica-de-privacidade" },
    { name: "Política de Cookies", href: "/politica-de-cookies" },
  ]

  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Formas de Pagamento</h4>
            <Image
              src="https://images.tcdn.com.br/img/editor/up/1158656/formasdepagamentocompix.png"
              alt="Formas de Pagamento"
              width={400}
              height={100}
              className="mx-auto h-20 w-auto object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-gray-200 pt-8">
          {/* Links */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="https://eleventickets.s3.amazonaws.com/ambiente_operacoes/front_socios_experience/Eleven_Tickets_Positivo_Horizontal.png"
              alt="ElevenTickets"
              width={150}
              height={60}
              className="h-12 w-auto"
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p className="mb-2">© 2025 ElevenTickets. Todos os direitos reservados.</p>
          <p className="text-xs">
            Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
            <a href="/politica-de-privacidade" className="text-purple-600 hover:underline">
              Política de Privacidade
            </a>{" "}
            e{" "}
            <a href="/termos-de-uso" className="text-purple-600 hover:underline">
              Termos de Uso
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
