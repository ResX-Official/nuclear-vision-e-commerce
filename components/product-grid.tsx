"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { SortFilter } from "@/components/sort-filter"
import { getAllProducts } from "@/lib/products"
import { Badge } from "@/components/ui/badge"

export function ProductGrid() {
  const [sortBy, setSortBy] = useState("featured")
  const products = getAllProducts()

  const sortedProducts = useMemo(() => {
    const sorted = [...products]

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "popular":
        sorted.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Featured - keep original order but prioritize trending and on sale
        sorted.sort((a, b) => {
          if (a.isTrending && !b.isTrending) return -1
          if (!a.isTrending && b.isTrending) return 1
          if (a.isOnSale && !b.isOnSale) return -1
          if (!a.isOnSale && b.isOnSale) return 1
          return 0
        })
    }

    return sorted
  }, [products, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Showing {sortedProducts.length} products</span>
          <Badge variant="secondary">{sortedProducts.length}</Badge>
        </div>
        <SortFilter sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
