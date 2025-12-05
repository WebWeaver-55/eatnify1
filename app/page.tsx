"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import MenuPage from "@/components/menu-page"
import ItemDetailModal from "@/components/item-detail-modal"
import CartPanel from "@/components/cart-panel"
import OrderConfirmation from "@/components/order-confirmation"

export interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
  tags: string[]
}

export interface CartItem extends MenuItem {
  quantity: number
  notes: string
}

const SAMPLE_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    price: 320,
    description: "Classic pizza with tomato, mozzarella, and fresh basil",
    image: "/margherita-pizza.png",
    category: "Pizza",
    tags: ["Veg", "Bestseller"],
  },
  {
    id: "2",
    name: "Garlic Bread",
    price: 120,
    description: "Crispy bread with garlic butter and herbs",
    image: "/garlic-bread.png",
    category: "Starters",
    tags: ["Veg", "Popular"],
  },
  {
    id: "3",
    name: "Pasta Alfredo",
    price: 280,
    description: "Creamy pasta with parmesan cheese and fresh cream",
    image: "/pasta-alfredo.png",
    category: "Pasta",
    tags: ["Veg"],
  },
  {
    id: "4",
    name: "Cold Coffee",
    price: 150,
    description: "Iced coffee with milk and a hint of vanilla",
    image: "/cold-coffee.png",
    category: "Drinks",
    tags: ["Cold", "Popular"],
  },
  {
    id: "5",
    name: "Grilled Chicken Pasta",
    price: 380,
    description: "Tender grilled chicken with garlic pasta in red sauce",
    image: "/grilled-chicken-pasta.jpg",
    category: "Pasta",
    tags: ["Non-Veg"],
  },
  {
    id: "6",
    name: "Chocolate Cake",
    price: 180,
    description: "Rich chocolate cake with premium chocolate coating",
    image: "/decadent-chocolate-cake.png",
    category: "Desserts",
    tags: ["Veg"],
  },
]

export default function Home() {
  const [screen, setScreen] = useState<"welcome" | "menu" | "detail" | "confirmation">("welcome")
  const [tableNumber, setTableNumber] = useState<number>(1)
  const [restaurantName] = useState("The Bistro")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [showCart, setShowCart] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleStartOrdering = (table: number) => {
    setTableNumber(table)
    setScreen("menu")
  }

  const handleAddToCart = (item: MenuItem, quantity: number, notes: string) => {
    const existingItem = cart.find((c) => c.id === item.id)

    if (existingItem) {
      setCart(cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + quantity, notes } : c)))
    } else {
      setCart([...cart, { ...item, quantity, notes }])
    }

    setSelectedItem(null)
    setScreen("menu")
  }

  const handleUpdateCart = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter((c) => c.id !== itemId))
    } else {
      setCart(cart.map((c) => (c.id === itemId ? { ...c, quantity } : c)))
    }
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setScreen("confirmation")
  }

  const handleNewOrder = () => {
    setCart([])
    setOrderPlaced(false)
    setScreen("menu")
    setShowCart(false)
  }

  if (screen === "welcome") {
    return <WelcomeScreen restaurantName={restaurantName} onStart={handleStartOrdering} />
  }

  if (screen === "confirmation") {
    return (
      <OrderConfirmation
        restaurantName={restaurantName}
        tableNumber={tableNumber}
        cart={cart}
        onNewOrder={handleNewOrder}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MenuPage
        restaurantName={restaurantName}
        tableNumber={tableNumber}
        items={SAMPLE_ITEMS}
        cart={cart}
        selectedItem={selectedItem}
        onSelectItem={(item) => {
          setSelectedItem(item)
          setScreen("detail")
        }}
        onAddToCart={handleAddToCart}
        onBackFromDetail={() => {
          setSelectedItem(null)
          setScreen("menu")
        }}
        onCartClick={() => setShowCart(true)}
      />

      {showCart && (
        <CartPanel
          restaurantName={restaurantName}
          tableNumber={tableNumber}
          cart={cart}
          onUpdateCart={handleUpdateCart}
          onPlaceOrder={handlePlaceOrder}
          onClose={() => setShowCart(false)}
        />
      )}

      {selectedItem && screen === "detail" && (
        <ItemDetailModal
          item={selectedItem}
          onAdd={handleAddToCart}
          onClose={() => {
            setSelectedItem(null)
            setScreen("menu")
          }}
        />
      )}
    </div>
  )
}
