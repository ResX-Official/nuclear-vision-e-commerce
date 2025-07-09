"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Share2, Eye } from "lucide-react"
import { formatPrice, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"
import { useToast } from "@/hooks/use-toast"
import { StructuredData } from "@/components/structured-data"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const isWishlisted = isInWishlist(product.id)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(product.stockCount, quantity + change)))
  }

  const handleAddToCart = async () => {
    if (!product.inStock) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Add to cart
      addToCart(product, quantity)

      // Show success toast
      toast({
        title: "Added to Cart!",
        description: `${quantity} x ${product.name} added to your cart.`,
        duration: 3000,
      })

      // Reset quantity
      setQuantity(1)
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

  const handleBuyNow = async () => {
    if (!product.inStock) return

    setIsBuyNowLoading(true)

    try {
      // Add to cart first
      addToCart(product, quantity)

      // Simulate brief loading
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect to checkout
      router.push("/checkout")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBuyNowLoading(false)
    }
  }

  const handleWishlist = () => {
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

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} on Nuclear Vision Global`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link Copied!",
          description: "Product link copied to clipboard.",
        })
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied!",
        description: "Product link copied to clipboard.",
      })
    }
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-nuclear-500">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-nuclear-500">
          Shop
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-nuclear-500">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            <Image
              src={product.images[selectedImage] || product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isOnSale && discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-medium">
                Save {discountPercentage}%
              </Badge>
            )}
            {product.badge && (
              <Badge className="absolute top-4 right-4 bg-nuclear-500 hover:bg-nuclear-600 text-white font-medium">
                {product.badge}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 border-2 transition-all ${
                  selectedImage === index ? "border-nuclear-500 shadow-md" : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-nuclear-500 border-nuclear-500">
                {product.category}
              </Badge>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                  <Eye className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">by {product.brand}</p>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-700">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.isOnSale && discountPercentage > 0 && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white font-medium">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
            <div className="grid grid-cols-1 gap-2">
              {product.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-nuclear-500 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-12 w-12"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-6 py-3 text-center min-w-[4rem] text-lg font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className="h-12 w-12"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !product.inStock}
                size="lg"
                className="flex-1 btn-premium text-white h-14 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </div>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlist}
                className={`h-14 w-14 ${isWishlisted ? "text-red-500 border-red-500 bg-red-50" : ""}`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            <Button
              onClick={handleBuyNow}
              disabled={isBuyNowLoading || !product.inStock}
              variant="outline"
              size="lg"
              className="w-full h-14 text-lg font-medium border-2 bg-transparent hover:bg-nuclear-50 hover:border-nuclear-500"
            >
              {isBuyNowLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-nuclear-500"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Buy Now"
              )}
            </Button>
          </div>

          {/* Trust Badges */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-nuclear-100 rounded-full">
                    <Truck className="h-6 w-6 text-nuclear-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-500">On orders over ₦50,000</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-nuclear-100 rounded-full">
                    <Shield className="h-6 w-6 text-nuclear-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{product.warranty}</div>
                    <div className="text-sm text-gray-500">Full coverage</div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-nuclear-100 rounded-full">
                    <RotateCcw className="h-6 w-6 text-nuclear-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{product.returnPolicy}</div>
                    <div className="text-sm text-gray-500">No questions asked</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="features" className="text-lg">
            Features
          </TabsTrigger>
          <TabsTrigger value="specifications" className="text-lg">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-lg">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6 mt-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-nuclear-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-6 mt-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <span className="font-semibold text-gray-900">{key}:</span>
                    <span className="text-gray-600 text-right max-w-md">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6 mt-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                <Button className="btn-premium text-white">Write a Review</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{product.reviews.toLocaleString()} reviews</div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-8">{stars}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {stars === 5 ? "70%" : stars === 4 ? "20%" : stars === 3 ? "5%" : stars === 2 ? "3%" : "2%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <StructuredData
        type="Product"
        data={{
          name: product.name,
          description: product.description,
          image: product.images,
          brand: product.brand,
          category: product.category,
          price: product.price,
          inStock: product.inStock,
          rating: product.rating,
          reviews: product.reviews,
          sku: `NVG-${product.id}`,
          gtin: `${product.id}${product.brand.slice(0, 3).toUpperCase()}`,
        }}
      />
    </div>
  )
}
