"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart"
import { formatPrice } from "@/lib/products"
import { useState } from "react"

export function ShoppingCart() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)

  const subtotal = getTotalPrice()
  const promoDiscount = isPromoApplied ? subtotal * 0.1 : 0 // 10% discount
  const shipping = subtotal > 500000 ? 0 : 15000 // Free shipping over ₦500,000
  const tax = (subtotal - promoDiscount) * 0.075 // 7.5% VAT
  const total = subtotal - promoDiscount + shipping + tax

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "nuclear10") {
      setIsPromoApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 sm:h-24 w-16 sm:w-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
        <Link href="/shop">
          <Button className="btn-premium text-white px-6 sm:px-8 py-3">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Cart Items ({items.length})</h2>
          <Link href="/shop">
            <Button variant="ghost" className="text-nuclear-600 hover:text-nuclear-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {items.map((item) => (
          <Card key={item.product.id} className="overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-10 w-10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 text-center min-w-[3rem] font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-10 w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-green-600 font-medium">
                    Subtotal: {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card className="sticky top-24">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Order Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              {isPromoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Promo Discount (NUCLEAR10)</span>
                  <span>-{formatPrice(promoDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">VAT (7.5%)</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={isPromoApplied}
                />
                <Button variant="outline" onClick={applyPromoCode} disabled={isPromoApplied || !promoCode}>
                  Apply
                </Button>
              </div>

              {!isPromoApplied && (
                <p className="text-xs text-gray-500">
                  Try code: <span className="font-mono font-semibold">NUCLEAR10</span> for 10% off
                </p>
              )}

              <Link href="/checkout">
                <Button className="w-full btn-premium text-white py-3 text-lg font-semibold">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {shipping > 0 && (
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                💡 Add {formatPrice(500000 - subtotal)} more to get FREE shipping!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trust Badges */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h4 className="font-semibold mb-4">Why shop with us?</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free shipping on orders over ₦500,000</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>24/7 customer support</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
