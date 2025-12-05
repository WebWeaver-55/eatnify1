"use client"

import type { CartItem } from "@/app/page"

interface CartPanelProps {
  restaurantName: string
  tableNumber: number
  cart: CartItem[]
  onUpdateCart: (itemId: string, quantity: number) => void
  onPlaceOrder: () => void
  onClose: () => void
}

export default function CartPanel({
  restaurantName,
  tableNumber,
  cart,
  onUpdateCart,
  onPlaceOrder,
  onClose,
}: CartPanelProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b-2 border-secondary p-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-foreground">Your Order</h2>
            <p className="text-sm text-muted">Table {tableNumber}</p>
          </div>
          <button onClick={onClose} className="text-2xl text-muted hover:text-foreground">
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-3">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="border-b border-secondary pb-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted">₹{item.price} each</p>
                    {item.notes && <p className="text-xs text-muted italic mt-1">Note: {item.notes}</p>}
                  </div>
                  <p className="font-bold text-primary">₹{item.price * item.quantity}</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1">
                    <button
                      onClick={() => onUpdateCart(item.id, item.quantity - 1)}
                      className="text-lg font-bold text-foreground hover:text-primary"
                    >
                      −
                    </button>
                    <span className="text-foreground font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                      className="text-lg font-bold text-foreground hover:text-primary"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onUpdateCart(item.id, 0)}
                    className="text-sm text-destructive hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted py-6">Your cart is empty</p>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="border-t-2 border-secondary p-4 space-y-4 sticky bottom-0 bg-card">
            <div className="space-y-2">
              <div className="flex justify-between text-foreground">
                <span>Subtotal</span>
                <span className="font-bold">₹{subtotal}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={onPlaceOrder}
              className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-accent transition-colors"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
