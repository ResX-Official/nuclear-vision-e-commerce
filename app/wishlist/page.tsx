import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WishlistPage } from "@/components/wishlist-page"

export default function Wishlist() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-20 sm:pb-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-gray-600">Save your favorite items for later</p>
        </div>
        <WishlistPage />
      </main>
      <Footer />
    </div>
  )
}
