"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import Image from "next/image"

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      desktopImage:
        "https://cloudfront.eleventickets.com/omni/prod/164/produtos/oktoberfest-de-blumenau-2025_oktoberfest-blumenau-2025_destaque?t=1753273987151",
      mobileImage:
        "https://cloudfront.eleventickets.com/omni/prod/164/produtos/oktoberfest-de-blumenau-2025_oktoberfest-blumenau-2025_card2",
      title: "Oktoberfest Blumenau 2025",
      subtitle: "Parque Vila Germânica - Blumenau - SC",
      producer: "Oktoberfest de Blumenau 2025",
      date: "10 de outubro a 25 de outubro",
    },
  ]

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Oktoberfest Blumenau 2025",
        text: "Confira a Oktoberfest Blumenau 2025!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  return (
    <section className="relative h-[75vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop Image */}
        <Image
          src={slides[currentSlide].desktopImage || "/placeholder.svg"}
          alt={slides[currentSlide].title}
          fill
          className="object-contain hidden md:block"
          priority
        />
        {/* Mobile Image */}
        <Image
          src={slides[currentSlide].mobileImage || "/placeholder.svg"}
          alt={slides[currentSlide].title}
          fill
          className="object-contain block md:hidden"
          priority
        />
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="text-white bg-black/50 p-4 rounded-lg backdrop-blur-sm">
          <h1 className="text-lg md:text-xl font-bold mb-1 text-balance">{slides[currentSlide].title}</h1>
          <h2 className="text-sm md:text-base mb-2 opacity-90 text-balance">{slides[currentSlide].subtitle}</h2>
          <p className="text-xs md:text-sm mb-1">
            <span className="font-semibold">Vendido por:</span>{" "}
            <span className="text-yellow-300">{slides[currentSlide].producer}</span>
          </p>
          <p className="text-xs md:text-sm">
            <span className="font-semibold">Data do evento:</span> <span>{slides[currentSlide].date}</span>
          </p>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 bg-black/70 border-2 border-white text-white hover:bg-white hover:text-black rounded-full transition-colors shadow-lg text-sm backdrop-blur-sm"
        >
          <Share2 className="h-4 w-4" />
          <span>Compartilhar</span>
        </button>
      </div>
    </section>
  )
}
