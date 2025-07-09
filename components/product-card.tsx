"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Eye, Share2, Zap, Truck, Shield, Clock, TrendingUp } from "lucide-react"
import { useState } from "react"
import { formatPrice, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ProductCard({ product, className = "", size = "md" }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const isWishlisted = isInWishlist(product.id)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.inStock) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      addToCart(product)

      toast({
        title: "Added to Cart!",
        description: `${product.name} added to your cart.`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to Wishlist!",
        description: `${product.name} added to your wishlist.`,
      })
    }
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} on Nuclear Vision Global`,
      url: `${window.location.origin}/product/${product.id}`,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`)
        toast({
          title: "Link Copied!",
          description: "Product link copied to clipboard.",
        })
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`)
      toast({
        title: "Link Copied!",
        description: "Product link copied to clipboard.",
      })
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/product/${product.id}`)
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white hover:scale-[1.02] will-change-transform ${className}`}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/product/${product.id}`} className="block">
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onLoad={() => setImageLoaded(true)}
                priority={false}
              />

              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm border-0"
                  onClick={handleQuickView}
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm border-0"
                  onClick={handleShare}
                >
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>

              {/* Wishlist button */}
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-3 left-3 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 border-0 ${
                  isWishlisted
                    ? "text-red-500 bg-red-50/80 hover:bg-red-100/80"
                    : "text-gray-600 hover:text-red-500 hover:bg-white/90"
                }`}
                onClick={handleWishlist}
              >
                <Heart
                  className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${
                    isWishlisted ? "fill-current scale-110" : "hover:scale-110"
                  }`}
                />
              </Button>
            </div>
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-12 sm:left-14 flex flex-col gap-1">
            {product.isOnSale && discountPercentage > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-xs px-2 py-1 shadow-lg animate-pulse">
                -{discountPercentage}%
              </Badge>
            )}
            {product.badge && (
              <Badge className="bg-gradient-to-r from-nuclear-500 to-nuclear-600 text-white font-bold text-xs px-2 py-1 shadow-lg">
                {product.badge}
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xs px-2 py-1 shadow-lg">
                NEW
              </Badge>
            )}
            {product.isTrending && (
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-xs px-2 py-1 shadow-lg flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                HOT
              </Badge>
            )}
          </div>

          {/* Stock indicator */}
          {product.stockCount < 10 && product.stockCount > 0 && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="destructive" className="text-xs font-semibold animate-pulse shadow-lg">
                Only {product.stockCount} left!
              </Badge>
            </div>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Category and brand */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{product.category}</div>
            <div className="text-xs text-nuclear-600 font-semibold">{product.brand}</div>
          </div>

          {/* Product name */}
          <Link href={`/product/${product.id}`}>
            <h3
              className={`font-semibold text-gray-900 hover:text-nuclear-500 transition-colors line-clamp-2 leading-tight ${sizeClasses[size]}`}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating and reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price section */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span
                className={`font-bold text-gray-900 ${
                  size === "lg" ? "text-xl sm:text-2xl" : size === "md" ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                }`}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="flex items-center justify-between">
                <div className="text-xs text-green-600 font-semibold">
                  Save {formatPrice(product.originalPrice - product.price)}
                </div>
                <div className="text-xs text-gray-500">{discountPercentage}% off</div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {product.freeShipping && (
              <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <Truck className="h-3 w-3" />
                <span className="text-xs font-medium">Free Ship</span>
              </div>
            )}
            {product.fastDelivery && (
              <div className="flex items-center space-x-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                <Zap className="h-3 w-3" />
                <span className="text-xs font-medium">Fast</span>
              </div>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-green-500" />
              <span>Warranty</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 text-blue-500" />
              <span>24h Support</span>
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || !product.inStock}
            className="w-full btn-premium text-white font-semibold py-2 sm:py-3 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Adding...</span>
              </div>
            ) : !product.inStock ? (
              "Out of Stock"
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
