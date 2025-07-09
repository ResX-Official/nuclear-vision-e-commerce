"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Star, Filter, X } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface CategoryFilterProps {
  availableBrands?: string[]
  selectedBrands?: string[]
  onBrandsChange?: (brands: string[]) => void
  priceRange?: [number, number]
  onPriceRangeChange?: (range: [number, number]) => void
  selectedRating?: number
  onRatingChange?: (rating: number) => void
  maxPrice?: number
}

export function CategoryFilter({
  availableBrands = [],
  selectedBrands = [],
  onBrandsChange = () => {},
  priceRange = [0, 2000000],
  onPriceRangeChange = () => {},
  selectedRating = 0,
  onRatingChange = () => {},
  maxPrice = 2000000,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      onBrandsChange([...selectedBrands, brand])
    } else {
      onBrandsChange(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearAllFilters = () => {
    onBrandsChange([])
    onPriceRangeChange([0, maxPrice])
    onRatingChange(0)
  }

  const hasActiveFilters =
    selectedBrands.length > 0 || selectedRating > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {selectedBrands.length +
                  (selectedRating > 0 ? 1 : 0) +
                  (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)}
              </Badge>
            )}
          </div>
          {isOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Filters</span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
              Clear All
            </Button>
          </div>
        )}

        {/* Price Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              max={maxPrice}
              min={0}
              step={10000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </CardContent>
        </Card>

        {/* Brands */}
        {availableBrands.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Brands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <Label htmlFor={brand} className="text-sm font-medium cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Rating</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRating === rating}
                  onCheckedChange={(checked) => onRatingChange(checked ? rating : 0)}
                />
                <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">& Up</span>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="free-shipping" />
              <Label htmlFor="free-shipping" className="text-sm font-medium cursor-pointer">
                Free Shipping
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="on-sale" />
              <Label htmlFor="on-sale" className="text-sm font-medium cursor-pointer">
                On Sale
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" />
              <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer">
                In Stock
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
