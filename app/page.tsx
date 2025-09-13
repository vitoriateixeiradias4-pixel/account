"use client"

import { useState } from "react"
import Header from "@/components/Header"
import HeroBanner from "@/components/HeroBanner"
import EventInfo from "@/components/EventInfo"
import TicketSection from "@/components/TicketSection"
import CamaroteSection from "@/components/CamaroteSection"
import HalfPriceRules from "@/components/HalfPriceRules"
import TypicalCostume from "@/components/TypicalCostume"
import Footer from "@/components/Footer"
import Cart from "@/components/Cart"
import OrderSummary from "@/components/OrderSummary"
import Checkout from "@/components/Checkout"

export interface CartItem {
  id: string
  name: string
  price: number
  tax: number
  quantity: number
  date?: string
  time?: string
  type: "ticket" | "recharge" | "donation"
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prev.filter((item) => item.id !== id)
    })
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price + item.tax) * item.quantity, 0)
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getTotalItems()} onCartClick={() => setIsCartOpen(true)} />

      <main className="relative">
        <HeroBanner />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 py-8">
            <EventInfo />
            <TicketSection onAddToCart={addToCart} />
            <CamaroteSection onAddToCart={addToCart} />
            <HalfPriceRules />
            <TypicalCostume />
          </div>
        </div>
      </main>

      <Footer />

      {cartItems.length > 0 && (
        <OrderSummary items={cartItems} totalPrice={getTotalPrice()} onCheckout={handleCheckout} />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onAddItem={addToCart}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={getTotalPrice()}
      />
    </div>
  )
}
