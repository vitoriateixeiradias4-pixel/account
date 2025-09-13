"use client"

import { useState } from "react"
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  cartItemsCount: number
  onCartClick: () => void
}

export default function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const menuItems = [
    {
      title: "A Festa & Compras",
      items: [
        { name: "Ingressos Oktoberfest", href: "/ingressos" },
        { name: "História da Oktoberfest", href: "/historia" },
        { name: "Gastronomia", href: "/gastronomia" },
        { name: "Realeza Oktoberfest", href: "/realeza" },
        { name: "Desfiles da Oktoberfest", href: "/desfiles" },
        { name: "Camarotes", href: "/camarotes" },
      ],
    },
    {
      title: "Programação",
      items: [
        { name: "Shows e Apresentações", href: "/shows" },
        { name: "Danças Germânicas", href: "/dancas" },
        { name: "Programação Especial", href: "/programacao" },
      ],
    },
    {
      title: "Notícias & Fotos",
      items: [
        { name: "Últimas Notícias", href: "/noticias" },
        { name: "Galeria de Fotos", href: "/fotos" },
        { name: "Imprensa", href: "/imprensa" },
      ],
    },
    {
      title: "Dicas & Serviços",
      items: [
        { name: "Como Chegar", href: "/como-chegar" },
        { name: "Hospedagem", href: "/hospedagem" },
        { name: "Estacionamento", href: "/estacionamento" },
      ],
    },
    {
      title: "Ações ESG",
      items: [
        { name: "Sustentabilidade", href: "/sustentabilidade" },
        { name: "Responsabilidade Social", href: "/responsabilidade" },
      ],
    },
  ]

  return (
    <header className="bg-black/90 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Image
              src="/oktoberfest-logo.jpg"
              alt="Oktoberfest Blumenau"
              width={200}
              height={60}
              className="h-14 w-auto"
            />
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((menu) => (
              <div
                key={menu.title}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(menu.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium hover:text-amber-400 transition-colors">
                  <span>{menu.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl">
                    <div className="py-2">
                      {menu.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-amber-600/20 hover:text-amber-400 transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-colors">
              INGRESSOS
            </button>

            {/* Cart */}
            <button onClick={onCartClick} className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <User className="h-6 w-6" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4">
            <nav className="space-y-4">
              {menuItems.map((menu) => (
                <div key={menu.title} className="space-y-2">
                  <h3 className="font-semibold text-amber-400 px-4">{menu.title}</h3>
                  <div className="space-y-1">
                    {menu.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-6 py-2 text-sm hover:bg-white/10 transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
