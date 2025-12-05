"use client"

import MenuCard from "./menu-card"
import type { MenuItem } from "@/app/page"

interface MenuGridProps {
  items: MenuItem[]
  onSelectItem: (item: MenuItem) => void
}

export default function MenuGrid({ items, onSelectItem }: MenuGridProps) {
  return (
    <div className="px-4 py-6 space-y-4">
      {items.length > 0 ? (
        items.map((item) => <MenuCard key={item.id} item={item} onSelect={onSelectItem} />)
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-lg">No items found in this category</p>
        </div>
      )}
    </div>
  )
}
