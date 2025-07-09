import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCart } from "@/components/shopping-cart"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-20 sm:pb-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </div>
        <ShoppingCart />
      </main>
      <Footer />
    </div>
  )
}
