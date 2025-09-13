"use client"

import { Shirt, Crown, Heart, Camera } from "lucide-react"
import Image from "next/image"

export default function TypicalCostume() {
  const costumeInfo = [
    {
      icon: <Shirt className="h-8 w-8" />,
      title: "Dirndl Feminino",
      description: "Vestido tradicional alemão com avental, blusa e acessórios típicos",
      tips: ["Cores tradicionais: azul, verde, vermelho", "Avental sempre por cima", "Blusa branca por baixo"],
      color: "bg-pink-500",
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Lederhosen Masculino",
      description: "Calça de couro tradicional com suspensórios e camisa xadrez",
      tips: ["Suspensórios são essenciais", "Camisa xadrez ou lisa", "Meias até o joelho"],
      color: "bg-blue-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Acessórios Típicos",
      description: "Complete o visual com chapéus, sapatos e joias tradicionais",
      tips: ["Chapéu tirolês com pena", "Sapatos de couro", "Joias em prata"],
      color: "bg-green-500",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Meia entrada <span className="text-green-600">Traje Típico</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto text-balance">
            Quer garantir meia-entrada? Venha vestido com traje típico alemão! Aproveite a tradição e garanta que a
            tradição alemã seja preservada. Confira como se vestir corretamente com nosso guia completo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-12">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl p-8 text-center">
              <Image
                src="/traje-tipico.jpg"
                alt="Trajes típicos alemães"
                width={400}
                height={500}
                className="rounded-xl mx-auto"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            {costumeInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className={`${info.color} text-white p-3 rounded-full flex-shrink-0`}>{info.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-gray-700 mb-4">{info.description}</p>
                    <div className="space-y-1">
                      {info.tips.map((tip, tipIndex) => (
                        <p key={tipIndex} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {tip}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-green-200">
          <div className="text-center mb-6">
            <Camera className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Regras Específicas</h3>
            <p className="text-gray-600">Garanta que a tradição alemã seja preservada</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-green-700 text-lg">✓ Aceito para meia-entrada:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Dirndl completo (vestido + avental + blusa)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Lederhosen com suspensórios e camisa
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Acessórios típicos complementares
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  Trajes infantis tradicionais
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-red-700 text-lg">✗ Não aceito:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Fantasias ou imitações baratas
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Apenas um item do traje
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Trajes incompletos ou inadequados
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Roupas comuns com acessórios alemães
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 text-center">
              <strong>Importante:</strong> A avaliação do traje será feita na entrada do evento. Trajes inadequados não
              garantem o desconto da meia-entrada.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
