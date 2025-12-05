"use client"

import { useState } from "react"

interface WelcomeScreenProps {
  restaurantName: string
  onStart: (table: number) => void
}

export default function WelcomeScreen({ restaurantName, onStart }: WelcomeScreenProps) {
  const [tableNumber, setTableNumber] = useState("1")
  const [showInput, setShowInput] = useState(false)

  const handleStart = () => {
    const table = Number.parseInt(tableNumber) || 1
    onStart(table)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Restaurant Logo/Name */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-foreground tracking-tight">{restaurantName}</h1>
          <p className="text-muted text-lg">Welcome to Our Table</p>
        </div>

        {/* Illustration Placeholder */}
        <div className="w-32 h-32 mx-auto bg-secondary rounded-full flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <p className="text-xl text-foreground font-medium">You are ordering for</p>

          {!showInput ? (
            <div className="space-y-4">
              <p className="text-4xl font-bold text-primary">Table {tableNumber}</p>
              <button onClick={() => setShowInput(true)} className="text-primary hover:text-accent underline text-sm">
                Change Table
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="flex-1 px-4 py-2 bg-card border-2 border-primary rounded text-center font-bold text-foreground"
                min="1"
                max="50"
                autoFocus
              />
              <button
                onClick={() => setShowInput(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium"
              >
                OK
              </button>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-accent transition-colors shadow-md"
        >
          Start Ordering
        </button>

        {/* Subtext */}
        <p className="text-muted text-sm">Browse our menu and place your order with ease</p>
      </div>
    </div>
  )
}
