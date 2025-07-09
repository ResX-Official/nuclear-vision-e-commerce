import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { SortFilter } from "@/components/sort-filter"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-20 sm:pb-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Electronics Store</h1>
          <p className="text-lg sm:text-xl text-gray-600">Discover the latest in technology and electronics</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-6">
              <CategoryFilter />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-gray-600">Showing all products</div>
              <SortFilter sortBy="featured" onSortChange={() => {}} />
            </div>
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
