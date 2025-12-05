"use client"

interface MenuHeaderProps {
  restaurantName: string
  cartCount: number
  onCartClick: () => void
}

export default function MenuHeader({ restaurantName, cartCount, onCartClick }: MenuHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-background border-b-2 border-secondary">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left Icon */}
        <button className="p-2 hover:bg-secondary rounded-full transition-colors">
          <span className="text-2xl">☰</span>
        </button>

        {/* Center - Restaurant Name */}
        <h1 className="text-2xl font-bold text-foreground text-center flex-1">{restaurantName}</h1>

        {/* Right - Cart Icon */}
        <button onClick={onCartClick} className="relative p-2 hover:bg-secondary rounded-full transition-colors">
          <span className="text-2xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
