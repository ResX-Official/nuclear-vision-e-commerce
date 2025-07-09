"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { SortFilter } from "@/components/sort-filter"
import { getProductsByCategory } from "@/lib/products"
import { Badge } from "@/components/ui/badge"

interface CategoryPageProps {
  category: string
}

export function CategoryPage({ category }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number>(0)

  const products = getProductsByCategory(category)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const withinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesRating = product.rating >= selectedRating

      return withinPriceRange && matchesBrand && matchesRating
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Featured - keep original order but prioritize trending and on sale
        filtered.sort((a, b) => {
          if (a.isTrending && !b.isTrending) return -1
          if (!a.isTrending && b.isTrending) return 1
          if (a.isOnSale && !b.isOnSale) return -1
          if (!a.isOnSale && b.isOnSale) return 1
          return 0
        })
    }

    return filtered
  }, [products, sortBy, priceRange, selectedBrands, selectedRating])

  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort()
  }, [products])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">{category}</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {products.length} products
          </Badge>
        </div>
        <p className="text-xl text-gray-600">
          Discover the latest {category.toLowerCase()} from top brands with competitive prices
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-80">
          <div className="sticky top-24 space-y-6">
            <CategoryFilter
              availableBrands={availableBrands}
              selectedBrands={selectedBrands}
              onBrandsChange={setSelectedBrands}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              maxPrice={Math.max(...products.map((p) => p.price))}
            />
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-gray-600">
              Showing {filteredAndSortedProducts.length} of {products.length} products
            </div>
            <SortFilter sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
              <button
                onClick={() => {
                  setSelectedBrands([])
                  setPriceRange([0, 2000000])
                  setSelectedRating(0)
                }}
                className="btn-premium text-white px-6 py-3 rounded-lg font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
