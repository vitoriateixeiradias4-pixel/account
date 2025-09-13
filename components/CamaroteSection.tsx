"use client"

import { useState } from "react"
import { Star, Users, Wine, Plus, Minus } from "lucide-react"
import Image from "next/image"
import type { CartItem } from "@/app/page"

interface CamaroteSectionProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
}

export default function CamaroteSection({ onAddToCart }: CamaroteSectionProps) {
  const [camaroteQuantities, setCamaroteQuantities] = useState<Record<string, number>>({})

  const camarotes = [
    {
      id: "camarote-spaten",
      name: "Camarote Spaten",
      description: "Experiência premium com vista privilegiada para o palco principal e serviço exclusivo",
      price: 180.0,
      tax: 21.6,
      capacity: "Até 8 pessoas",
      includes: ["Vista privilegiada", "Serviço de garçom", "Mesa reservada", "Área coberta"],
      image: "/camarote-spaten.jpg",
    },
    {
      id: "camarote-vip",
      name: "Camarote Prost VIP",
      description: "A experiência mais exclusiva da Oktoberfest com todos os benefícios premium",
      price: 280.0,
      tax: 33.6,
      capacity: "Até 6 pessoas",
      includes: ["Vista frontal do palco", "Open bar premium", "Cardápio especial", "Recepção VIP"],
      image: "/camarote-vip.jpg",
    },
    {
      id: "camarote-indie",
      name: "Camarote Tô Indo",
      description: "Camarote jovem com ambiente descontraído e vista lateral do palco",
      price: 120.0,
      tax: 14.4,
      capacity: "Até 10 pessoas",
      includes: ["Vista lateral", "Mesa compartilhada", "Ambiente jovem", "Área semi-coberta"],
      image: "/camarote-indie.jpg",
    },
  ]

  const handleCamaroteQuantityChange = (camaroteId: string, change: number) => {
    const newQuantity = Math.max(0, (camaroteQuantities[camaroteId] || 0) + change)
    setCamaroteQuantities((prev) => ({ ...prev, [camaroteId]: newQuantity }))

    if (change > 0) {
      const camarote = camarotes.find((c) => c.id === camaroteId)
      if (camarote) {
        onAddToCart({
          id: camarote.id,
          name: camarote.name,
          price: camarote.price,
          tax: camarote.tax,
          type: "ticket",
        })
      }
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Camarotes <span className="text-amber-600">Oktoberfest 2025</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto text-balance">
            Experimente a Oktoberfest com todo o conforto e exclusividade que você merece. Aproveite uma visão
            privilegiada da festa com serviços premium.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {camarotes.map((camarote) => (
            <div
              key={camarote.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-amber-400 to-red-600">
                <Image src={camarote.image || "/placeholder.svg"} alt={camarote.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    VIP
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">{camarote.name}</h3>
                <p className="text-gray-600 mb-4 text-balance">{camarote.description}</p>

                {/* Capacity */}
                <div className="flex items-center mb-4 text-amber-700">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-semibold">{camarote.capacity}</span>
                </div>

                {/* Includes */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                    <Wine className="h-4 w-4 mr-2 text-amber-600" />
                    Inclui:
                  </h4>
                  <ul className="space-y-1">
                    {camarote.includes.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-700">
                      R$ {camarote.price.toFixed(2).replace(".", ",")}
                    </p>
                    <p className="text-sm text-gray-600">+ Taxa: R$ {camarote.tax.toFixed(2).replace(".", ",")}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Quantidade:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleCamaroteQuantityChange(camarote.id, -1)}
                      disabled={(camaroteQuantities[camarote.id] || 0) === 0}
                      className="p-2 rounded-full bg-amber-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-amber-700 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">{camaroteQuantities[camarote.id] || 0}</span>
                    <button
                      onClick={() => handleCamaroteQuantityChange(camarote.id, 1)}
                      className="p-2 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Informações Importantes</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-bold text-amber-700 mb-2">Reservas</h4>
                <p className="text-gray-600 text-sm">
                  Os camarotes devem ser reservados com antecedência. Sujeito à disponibilidade.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-amber-700 mb-2">Cancelamento</h4>
                <p className="text-gray-600 text-sm">
                  Política de cancelamento até 48h antes do evento com reembolso de 80%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
