"use client"

import { X, ShoppingCart, Plus, Minus } from "lucide-react"
import type { CartItem } from "@/app/page"

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onAddItem: (item: Omit<CartItem, "quantity">) => void
  onRemoveItem: (id: string) => void
  totalPrice: number
  onCheckout: () => void
}

export default function Cart({ isOpen, onClose, items, onAddItem, onRemoveItem, totalPrice, onCheckout }: CartProps) {
  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      {/* Cart Drawer */}
      <div
        className={`
        fixed right-0 top-0 h-full w-full max-w-md bg-gray-100 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white border-b">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-lg font-bold">Carrinho de Compras</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart className="h-12 w-12 mb-4" />
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.date && item.time && (
                          <p className="text-sm text-gray-600">
                            {new Date(item.date).toLocaleDateString("pt-BR")} - {item.time}
                          </p>
                        )}
                        <p className="text-purple-600 font-bold">{formatPrice(item.price)}</p>
                        {item.tax > 0 && <p className="text-xs text-gray-500">Taxa: {formatPrice(item.tax)}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            onAddItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              tax: item.tax,
                              date: item.date,
                              time: item.time,
                              type: item.type,
                            })
                          }
                          className="p-1 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Subtotal: {formatPrice((item.price + item.tax) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="bg-white border-t p-4 space-y-4">
              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-xl font-bold text-purple-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-600 text-center">
                Ao finalizar a compra, você declara ter lido e aceito o{" "}
                <span className="text-purple-600 underline cursor-pointer">Termo de Compra</span> e a{" "}
                <span className="text-purple-600 underline cursor-pointer">Política de Privacidade</span> da
                ElevenTickets.
              </p>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continuar Comprando
                </button>
                <button
                  onClick={onCheckout}
                  className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
