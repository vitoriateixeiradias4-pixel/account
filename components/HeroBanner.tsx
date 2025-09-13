"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/oktoberfest-hero-1.jpg",
      title: "DE 8 a 26",
      subtitle: "DE OUTUBRO",
      cta: "GARANTA SEU INGRESSO",
      description: "A maior festa alemã das Américas",
    },
    {
      image: "/oktoberfest-hero-2.jpg",
      title: "FESTA ALEMÃ",
      subtitle: "DO CONTINENTE AMERICANO",
      cta: "COMPRAR INGRESSOS",
      description: "19 dias de festa que celebram a cultura e tradição germânica",
    },
  ]

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt="Oktoberfest Blumenau"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors z-10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 text-white transition-colors z-10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-4xl px-4">
          {/* Título principal com estilo alemão */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-amber-400 mb-4 font-serif tracking-wider">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif tracking-wider">
              {slides[currentSlide].subtitle}
            </h2>
          </div>

          {/* Descrição */}
          <p className="text-xl md:text-2xl mb-8 text-balance">{slides[currentSlide].description}</p>

          {/* CTA Button */}
          <button className="bg-amber-600 hover:bg-amber-700 text-white text-lg md:text-xl font-bold px-12 py-4 rounded-full transition-colors shadow-2xl border-2 border-amber-500">
            {slides[currentSlide].cta}
          </button>

          {/* Cards de ingressos flutuantes */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden xl:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Image
                src="/oktoberfest-cards.jpg"
                alt="Ingressos Oktoberfest"
                width={200}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-amber-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
