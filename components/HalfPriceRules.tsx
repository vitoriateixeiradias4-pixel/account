"use client"

import { GraduationCap, Users, Heart, FileText, AlertCircle } from "lucide-react"

export default function HalfPriceRules() {
  const halfPriceCategories = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Jovens menores de 18 anos",
      subtitle: "(Lei Federal nº 12.933/Lei Estadual 12.570)",
      description:
        "Apresentar documento de identificação com foto, acompanhado por responsável legal quando menor de 16 anos.",
      color: "bg-blue-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Pessoas com deficiência e acompanhante",
      subtitle: "(Lei Federal nº 12.933/Lei Estadual 12.570)",
      description:
        "Apresentar documento oficial com foto, acompanhado por laudo médico que comprove a deficiência ou cartão de benefício.",
      color: "bg-green-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Doadores regulares de sangue",
      subtitle: "(Lei Estadual nº 17.291)",
      description:
        "Apresentar documento oficial com foto, acompanhado por comprovante de doação nos últimos 12 meses emitido por órgão oficial.",
      color: "bg-red-500",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Professores de instituições públicas ou privadas",
      subtitle: "(Lei Federal nº 12.933/Lei Estadual 12.570)",
      description:
        "Apresentar documento oficial com foto, acompanhado por comprovante de vínculo empregatício ou carteira de trabalho atualizada.",
      color: "bg-purple-500",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Estudantes (Lei Federal nº 12.933/Lei Estadual 12.570)",
      subtitle: "Portadores de Carteira de Identificação Estudantil (CIE)",
      description:
        "Apresentar Carteira de Identificação Estudantil (CIE) válida, emitida pela ANPG, UNE, UBES ou entidades estudantis estaduais e municipais.",
      color: "bg-amber-500",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Regras para <span className="text-red-600">Meia Entrada</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto text-balance">
            Descubra especiais para estudantes, professores, PCDs e pessoas acima de 60 anos. Aproveite uma meia-entrada
            e viva a experiência da Oktoberfest Blumenau com ainda mais vantagens!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {halfPriceCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`${category.color} text-white p-3 rounded-full flex-shrink-0`}>{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-600 font-medium mb-3">{category.subtitle}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="bg-amber-100 border-l-4 border-amber-500 p-6 rounded-r-lg max-w-4xl mx-auto">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">Informações Importantes</h3>
              <div className="space-y-2 text-amber-700 text-sm">
                <p>
                  • <strong>Obrigatória apresentação de documento oficial com foto</strong> no momento da entrada.
                </p>
                <p>• Documentos digitais são aceitos apenas se apresentados em aplicativos oficiais.</p>
                <p>
                  • <strong>Menores de 16 anos</strong> devem estar acompanhados por responsável legal.
                </p>
                <p>
                  • <strong>Pessoas com deficiência</strong> têm direito a um acompanhante com meia-entrada.
                </p>
                <p>
                  • A <strong>meia-entrada não é cumulativa</strong> com outras promoções ou descontos.
                </p>
                <p>• Documentos em língua estrangeira devem estar traduzidos por tradutor juramentado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
