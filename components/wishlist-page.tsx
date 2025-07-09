"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Trash2, ArrowLeft } from "lucide-react"
import { useWishlist } from "@/lib/wishlist"
import { useCart } from "@/lib/cart"
import { formatPrice } from "@/lib/products"

export function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem(product)
    // Optional: remove from wishlist after adding to cart
    // removeItem(product.id)
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-16 sm:h-24 w-16 sm:w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-8">Save items you love to buy them later</p>
        <Link href="/shop">
          <Button className="btn-premium text-white px-6 sm:px-8 py-3">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg sm:text-xl font-semibold">Saved Items ({items.length})</h2>
        </div>
        <Link href="/shop">
          <Button variant="ghost" className="text-nuclear-600 hover:text-nuclear-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                  onClick={() => removeItem(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {product.isOnSale && <Badge className="absolute top-2 left-2 bg-red-500 text-white">Sale</Badge>}
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-nuclear-600 transition-colors line-clamp-2 mt-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full btn-premium text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
