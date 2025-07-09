"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortFilterProps {
  sortBy: string
  onSortChange: (value: string) => void
}

export function SortFilter({ sortBy, onSortChange }: SortFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
