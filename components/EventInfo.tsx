"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function EventInfo() {
  const [isExpanded, setIsExpanded] = useState(true)

  const schedule = [
    { day: "Quarta-feira - 08/10", hours: "18h às 3h", price: "Gratuito" },
    { day: "Quinta-feira - 09/10", hours: "11h às 3h", price: "Gratuito" },
    { day: "Sexta-feira - 10/10", hours: "11h às 4h", price: "Cobrança a partir das 18h" },
    { day: "Sábado - 11/10", hours: "10h às 4h", price: "Cobrança a partir das 13h" },
    { day: "Domingo - 12/10", hours: "10h à 1h", price: "Cobrança a partir das 13h" },
    { day: "Segunda-feira - 13/10", hours: "11h à 1h", price: "Gratuito" },
    { day: "Terça-feira - 14/10", hours: "11h à 1h", price: "Gratuito" },
    { day: "Quarta-feira - 15/10", hours: "11h às 3h", price: "Cobrança a partir das 18h" },
    { day: "Quinta-feira - 16/10", hours: "11h às 3h", price: "Cobrança a partir das 18h" },
    { day: "Sexta-feira - 17/10", hours: "11h às 4h", price: "Cobrança a partir das 18h" },
    { day: "Sábado - 18/10", hours: "10h às 4h", price: "Cobrança a partir das 13h" },
    { day: "Domingo - 19/10", hours: "10h à 1h", price: "Cobrança a partir das 13h" },
    { day: "Segunda-feira - 20/10", hours: "11h à 1h", price: "Gratuito" },
    { day: "Terça-feira - 21/10", hours: "11h à 1h", price: "Gratuito" },
    { day: "Quarta-feira - 22/10", hours: "11h às 3h", price: "Cobrança a partir das 18h" },
    { day: "Quinta-feira - 23/10", hours: "09h às 3h", price: "Cobrança a partir das 18h" },
    { day: "Sexta-feira - 24/10", hours: "11h às 4h", price: "Cobrança a partir das 18h" },
    { day: "Sábado - 25/10", hours: "10h às 4h", price: "Cobrança a partir das 13h" },
    { day: "Domingo - 26/10", hours: "10h à 1h", price: "Gratuito" },
  ]

  const prices = [
    {
      category: "Entrada gratuita:",
      items: [
        "Primeiro dia (08/10)",
        "Quinta-feira (09/10)",
        "Segunda-Feira (13/10)",
        "Terça-Feira (14/10)",
        "Segunda-Feira (20/10)",
        "Terça-Feira (21/10)",
        "Último dia (26/10)",
      ],
    },
    {
      category: "Domingo* / Quarta* / Quinta:",
      items: ["Inteira: R$ 24,00", "Meia: R$ 12,00", "*Exceto (08/10, 09/10 e 26/10)"],
    },
    {
      category: "Sexta-feira:",
      items: ["Inteira: R$ 56,00", "Meia: R$ 28,00"],
    },
    {
      category: "Sábado:",
      items: ["Inteira: R$ 70,00", "Meia: R$ 35,00"],
    },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">
                  Informações <span className="font-black">Gerais</span>
                </h2>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Horário de Funcionamento e Cobrança de Ingressos</h3>

                    <div className="space-y-3">
                      {schedule.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900">{item.day}</div>
                          <div className="text-gray-600">{item.hours}</div>
                          <div
                            className={`font-semibold ${item.price.includes("Gratuito") ? "text-green-600" : "text-purple-600"}`}
                          >
                            {item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Valores</h3>
                    <p className="mb-4 text-gray-600">
                      Confira abaixo a planilha de valores para a Oktoberfest Blumenau 2025:
                    </p>

                    <div className="space-y-4">
                      {prices.map((priceGroup, index) => (
                        <div key={index}>
                          <h4 className="font-bold text-gray-900 mb-2">{priceGroup.category}</h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            {priceGroup.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Programação</h3>
                    <p className="text-gray-600">
                      <a
                        href="https://oktoberfestblumenau.com.br/programacao-e-atividades/programacao-oktoberfest-2025/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Clique aqui
                      </a>{" "}
                      para conferir a programação completa da Oktoberfest Blumenau 2025!
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Locais de Venda - Público em Geral</h3>

                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-red-600 mb-2">
                          ..:: SEM TAXA DE CONVENIÊNCIA ::.. ➡️ A partir de 06/10.
                        </p>
                        <div className="ml-4">
                          <p className="font-medium">1. Parque Vila Germânica</p>
                          <p className="text-gray-600">R. Alberto Stein, 199 - Velha, Blumenau - SC</p>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-red-600 mb-2">..:: COM TAXA DE CONVENIÊNCIA ::..</p>
                        <div className="ml-4">
                          <p className="font-medium">1. Sistema de Vendas Online ElevenTickets</p>
                          <a
                            href="https://eleventickets.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            Clique aqui.
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-center w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Removed accommodation section */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">{/* Empty sidebar for future content */}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
