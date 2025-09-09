"use client"

import { useState } from "react"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  cartItemsCount: number
  onCartClick: () => void
}

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-transparent text-black absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Image
              src="https://eleventickets.s3.amazonaws.com/ambiente_operacoes/front_socios_experience/Eleven_Tickets_Positivo_Horizontal.png"
              alt="ElevenTickets"
              width={180}
              height={45}
              className="h-12 w-auto"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-black/10 rounded-full transition-colors text-black"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button className="p-2 hover:bg-black/10 rounded-full transition-colors text-black">
              <User className="h-6 w-6" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-black/10 rounded-full transition-colors text-black"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
