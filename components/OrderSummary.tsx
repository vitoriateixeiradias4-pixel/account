"use client"

import { ShoppingCart, CreditCard } from "lucide-react"
import type { CartItem } from "@/app/page"

interface OrderSummaryProps {
  items: CartItem[]
  totalPrice: number
  onCheckout: () => void
}

export default function OrderSummary({ items, totalPrice, onCheckout }: OrderSummaryProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-900">
                {totalItems} {totalItems === 1 ? "item" : "itens"}
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-600">R$ {totalPrice.toFixed(2).replace(".", ",")}</div>
          </div>

          <button
            onClick={onCheckout}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 shadow-lg"
          >
            <CreditCard className="h-5 w-5" />
            <span>Finalizar Pedido</span>
          </button>
        </div>
      </div>
    </div>
  )
}
