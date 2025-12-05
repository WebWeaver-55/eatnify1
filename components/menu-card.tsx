"use client"
import type { MenuItem } from "@/app/page"

interface MenuCardProps {
  item: MenuItem
  onSelect: (item: MenuItem) => void
}

export default function MenuCard({ item, onSelect }: MenuCardProps) {
  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer border border-secondary"
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover rounded" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
            <p className="text-muted text-sm line-clamp-2">{item.description}</p>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-foreground px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-primary text-lg">₹{item.price}</span>
            <button className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium hover:bg-accent transition-colors">
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
