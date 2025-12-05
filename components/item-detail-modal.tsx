"use client"

import { useState } from "react"
import type { MenuItem } from "@/app/page"

interface ItemDetailModalProps {
  item: MenuItem
  onAdd: (item: MenuItem, quantity: number, notes: string) => void
  onClose: () => void
}

export default function ItemDetailModal({ item, onAdd, onClose }: ItemDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")

  const handleAdd = () => {
    onAdd(item, quantity, notes)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
        <div className="sticky top-0 bg-card border-b-2 border-secondary p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg text-foreground">Item Details</h2>
          <button onClick={onClose} className="text-2xl text-muted hover:text-foreground">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image */}
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-64 object-cover rounded-lg" />

          {/* Name and Price */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{item.name}</h1>
            <p className="text-2xl font-bold text-primary mt-2">₹{item.price}</p>
          </div>

          {/* Description */}
          <p className="text-foreground leading-relaxed">{item.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="text-sm bg-secondary text-foreground px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Customization - Example */}
          <div className="space-y-3 border-t-2 border-secondary pt-4">
            <h3 className="font-bold text-foreground">Customization</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-foreground">Extra Cheese</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-foreground">No Onions</span>
            </label>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="block font-bold text-foreground">Special Instructions</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special requests..."
              className="w-full p-3 bg-background border-2 border-secondary rounded-lg text-foreground placeholder-muted focus:outline-none focus:border-primary"
              rows={3}
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between border-t-2 border-secondary pt-4">
            <span className="font-bold text-foreground">Quantity</span>
            <div className="flex items-center gap-3 bg-secondary rounded-full px-4 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-lg font-bold text-foreground hover:text-primary"
              >
                −
              </button>
              <span className="text-lg font-bold text-foreground w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-lg font-bold text-foreground hover:text-primary"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-accent transition-colors mt-4 mb-6"
          >
            Add to Cart — ₹{item.price * quantity}
          </button>
        </div>
      </div>
    </div>
  )
}
