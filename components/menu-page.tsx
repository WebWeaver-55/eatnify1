"use client"

import { useState } from "react"
import MenuHeader from "./menu-header"
import CategoryNav from "./category-nav"
import MenuGrid from "./menu-grid"
import type { MenuItem, CartItem } from "@/app/page"

interface MenuPageProps {
  restaurantName: string
  tableNumber: number
  items: MenuItem[]
  cart: CartItem[]
  selectedItem: MenuItem | null
  onSelectItem: (item: MenuItem) => void
  onAddToCart: (item: MenuItem, quantity: number, notes: string) => void
  onBackFromDetail: () => void
  onCartClick: () => void
}

export default function MenuPage({
  restaurantName,
  tableNumber,
  items,
  cart,
  selectedItem,
  onSelectItem,
  onAddToCart,
  onBackFromDetail,
  onCartClick,
}: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categories = ["All", ...new Set(items.map((item) => item.category))]
  const filteredItems =
    selectedCategory && selectedCategory !== "All" ? items.filter((item) => item.category === selectedCategory) : items

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <MenuHeader restaurantName={restaurantName} cartCount={cartCount} onCartClick={onCartClick} />

      {/* Category Navigation */}
      <CategoryNav categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Menu Items Grid */}
      <MenuGrid items={filteredItems} onSelectItem={onSelectItem} />
    </div>
  )
}
