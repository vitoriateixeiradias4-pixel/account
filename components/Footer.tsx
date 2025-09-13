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
    <footer className="bg-gradient-to-b from-red-600 via-yellow-400 to-black text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-yellow-300">Oktoberfest Blumenau 2025</h3>
          <p className="text-lg mb-6 text-yellow-100">A maior festa alemã das Américas</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="font-bold text-yellow-300">📅 Data</div>
              <div>08 a 26 de Outubro</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-300">📍 Local</div>
              <div>Parque Vila Germânica</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-300">🎪 Pavilhões</div>
              <div>Múltiplos Espaços</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-300">🍺 Tradição</div>
              <div>Desde 1984</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-6 text-yellow-300">Formas de Pagamento</h4>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 inline-block">
              <Image
                src="https://images.tcdn.com.br/img/editor/up/1158656/formasdepagamentocompix.png"
                alt="Formas de Pagamento"
                width={400}
                height={100}
                className="mx-auto h-20 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-yellow-300/30 pt-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-yellow-100 hover:text-yellow-300 transition-colors text-sm font-medium hover:underline"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
              <Image
                src="https://eleventickets.s3.amazonaws.com/ambiente_operacoes/front_socios_experience/Eleven_Tickets_Positivo_Horizontal.png"
                alt="ElevenTickets"
                width={150}
                height={60}
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-yellow-300/30 text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
            <p className="mb-2 text-yellow-100 font-medium">© 2025 ElevenTickets. Todos os direitos reservados.</p>
            <p className="text-xs text-yellow-200/80">
              Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
              <a
                href="/politica-de-privacidade"
                className="text-yellow-300 hover:text-yellow-100 underline font-medium"
              >
                Política de Privacidade
              </a>{" "}
              e{" "}
              <a href="/termos-de-uso" className="text-yellow-300 hover:text-yellow-100 underline font-medium">
                Termos de Uso
              </a>
              .
            </p>
            <div className="mt-4 text-yellow-200/60 text-xs">🍺 Prost! Celebre com responsabilidade 🍺</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
