"use client"

import { useRef } from "react"

interface CategoryNavProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export default function CategoryNav({ categories, selectedCategory, onSelectCategory }: CategoryNavProps) {
  const scrollContainer = useRef<HTMLDivElement>(null)

  return (
    <div className="sticky top-16 z-30 bg-background border-b-2 border-secondary overflow-hidden">
      <div ref={scrollContainer} className="flex gap-3 px-4 py-3 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category === "All" ? null : category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all ${
              (!selectedCategory && category === "All") || selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
