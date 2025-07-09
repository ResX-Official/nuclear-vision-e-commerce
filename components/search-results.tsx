"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { SortFilter } from "@/components/sort-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

const searchResults = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 1199,
    originalPrice: 1299,
    image: "/images/iphone-15.jpg",
    rating: 4.8,
    reviews: 5234,
    category: "Smartphones",
    isOnSale: true,
    badge: "New",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch M3 Pro",
    price: 2399,
    originalPrice: 2599,
    image: "/images/macbook-pro.jpg",
    rating: 4.9,
    reviews: 2847,
    category: "Laptops",
    isOnSale: true,
    badge: "Best Seller",
  },
  // Add more search results...
]

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredResults, setFilteredResults] = useState(searchResults)

  useEffect(() => {
    if (searchQuery) {
      const filtered = searchResults.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredResults(filtered)
    } else {
      setFilteredResults(searchResults)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const clearSearch = () => {
    setSearchQuery("")
    window.history.pushState({}, "", "/search")
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 py-3 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
            Search
          </Button>
        </form>

        {query && (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search Results for "{query}"</h1>
              <p className="text-gray-600 mt-2">Found {filteredResults.length} products</p>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-80">
          <div className="sticky top-24">
            <CategoryFilter />
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6">
            <SortFilter />
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
              <p className="text-gray-600 mb-8">Try adjusting your search terms or browse our categories</p>
              <Button onClick={clearSearch} className="bg-orange-500 hover:bg-orange-600 text-white">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
