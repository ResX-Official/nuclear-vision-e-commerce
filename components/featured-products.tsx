"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"
import { ChevronLeft, ChevronRight, Star, TrendingUp, Zap } from "lucide-react"

const categories = [
  { id: "all", name: "All Products", icon: Star },
  { id: "trending", name: "Trending", icon: TrendingUp },
  { id: "new", name: "New Arrivals", icon: Zap },
  { id: "smartphones", name: "Smartphones", icon: null },
  { id: "laptops", name: "Laptops", icon: null },
  { id: "audio", name: "Audio", icon: null },
]

export function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "all") return true
    if (activeCategory === "trending") return product.isTrending
    if (activeCategory === "new") return product.isNew
    return product.category.toLowerCase() === activeCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const currentProducts = filteredProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(0)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge className="bg-nuclear-100 text-nuclear-800 hover:bg-nuclear-100 mb-4">Featured Products</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-4">
            Discover Amazing Products
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked selection of premium electronics with cutting-edge technology and unbeatable prices
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-nuclear-500 hover:bg-nuclear-600 text-white shadow-lg"
                    : "border-gray-300 text-gray-700 hover:border-nuclear-500 hover:text-nuclear-500"
                }`}
              >
                {Icon && <Icon className="h-4 w-4 mr-2" />}
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {currentProducts.map((product, index) => (
              <div key={product.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-8 bg-white shadow-lg hover:shadow-xl border-gray-200 hover:border-nuclear-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-8 bg-white shadow-lg hover:shadow-xl border-gray-200 hover:border-nuclear-500"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage ? "bg-nuclear-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="btn-premium text-white font-semibold px-8 py-4 text-lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
