"use client"

import { Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import type { CartItem } from "@/app/page"

interface ProductsSectionProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
}

export default function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const donations = [
    {
      id: "donation-5",
      name: "Doação",
      price: 5.0,
      tax: 0,
      image:
        "https://cloudfront.eleventickets.com/omni/prod/164/produtos/oktoberfest-de-blumenau-2025_oktoberfest-blumenau-2025_9fae094915_2025_09_03_14_30_372025_09_03_14_30_35_0355",
    },
    {
      id: "donation-15",
      name: "Doação",
      price: 15.0,
      tax: 0,
      image:
        "https://cloudfront.eleventickets.com/omni/prod/164/produtos/oktoberfest-de-blumenau-2025_oktoberfest-blumenau-2025_2aac7f7906_2025_09_02_08_36_232025_09_02_08_36_21_0477",
    },
    {
      id: "donation-30",
      name: "Doação",
      price: 30.0,
      tax: 0,
      image:
        "https://cloudfront.eleventickets.com/omni/prod/164/produtos/oktoberfest-de-blumenau-2025_oktoberfest-blumenau-2025_4005879d5d_2025_09_03_14_30_422025_09_03_14_30_40_0795",
    },
    {
      id: "donation-70",
      name: "Doação",
      price: 70.0,
      tax: 0,
      image:
        "https://cloudfront.eleventickets.com/omni/prod/164/produtos/oktoberfest-de-blumenau-2025_oktoberfest-blumenau-2025_eb92a07e79_2025_09_02_08_37_222025_09_02_08_37_20_0540",
    },
  ]

  const handleAddDonation = (donation: (typeof donations)[0]) => {
    onAddToCart({
      id: donation.id,
      name: donation.name,
      price: donation.price,
      tax: donation.tax,
      type: "donation",
    })
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Official Products */}
            <div className="order-1">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl font-bold mb-4 text-balance">
                  Adicione <span className="font-black text-purple-600">Produtos Oficiais</span>
                </h2>
                <p className="text-gray-600 text-pretty">
                  Confira os produtos oficiais da Oktoberfest Blumenau 2025 e leve uma lembrança especial do evento.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Image
                  src="https://i.imgur.com/0CLhfqI.jpeg"
                  alt="Produtos Oficiais Oktoberfest"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Donations Cards */}
            <div className="order-2">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl font-bold mb-4 text-balance">
                  Ajude com <span className="font-black text-purple-600">Doações</span>
                </h2>
                <p className="text-gray-600 mb-6 text-pretty">
                  A Oktoberfest Blumenau uniu forças com o Hospital Santo Antônio em uma parceria solidária. Na compra
                  do seu ingresso on-line, você pode escolher doar R$5, R$15, R$30 ou R$70. Cada contribuição ajuda
                  diretamente o setor de oncologia pediátrica, levando mais esperança e cuidado às crianças em
                  tratamento.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-32 bg-gray-100">
                      <Image
                        src={donation.image || "/placeholder.svg"}
                        alt={donation.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-sm">{donation.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-purple-600">
                          R$ {donation.price.toFixed(2).replace(".", ",")}
                        </span>
                        <button
                          onClick={() => handleAddDonation(donation)}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors shadow-sm hover:shadow-md"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
