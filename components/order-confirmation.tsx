"use client"

import type { CartItem } from "@/app/page"

interface OrderConfirmationProps {
  restaurantName: string
  tableNumber: number
  cart: CartItem[]
  onNewOrder: () => void
}

export default function OrderConfirmation({ restaurantName, tableNumber, cart, onNewOrder }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Celebration Icon */}
        <div className="text-6xl">🎉</div>

        {/* Success Message */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Order Placed!</h1>
          <p className="text-xl text-muted">Successfully</p>
        </div>

        {/* Order Details */}
        <div className="bg-card rounded-lg p-6 space-y-4 border-2 border-secondary">
          <div className="space-y-2">
            <p className="text-lg font-bold text-foreground">{restaurantName}</p>
            <p className="text-muted">Table {tableNumber}</p>
          </div>

          <div className="border-t-2 border-secondary pt-4 space-y-2">
            <h3 className="font-bold text-foreground text-left mb-3">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-left">
                <span className="text-foreground">
                  {item.name} <span className="text-muted">x{item.quantity}</span>
                </span>
                <span className="text-foreground font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-secondary pt-4">
            <p className="text-muted text-sm">Your order has been sent to the restaurant kitchen.</p>
          </div>
        </div>

        {/* Additional Message */}
        <p className="text-foreground text-lg">Our team is preparing your order with care.</p>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={onNewOrder}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent transition-colors"
          >
            Place Another Order
          </button>
          <button className="w-full py-3 bg-secondary text-foreground rounded-lg font-bold hover:bg-accent transition-colors">
            Track Order Status
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-muted">Thank you for ordering from {restaurantName}</p>
      </div>
    </div>
  )
}
