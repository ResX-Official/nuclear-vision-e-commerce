"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Menu, Heart, MapPin, Phone, Mail, ChevronDown } from "lucide-react"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const cartItems = useCart((state) => state.getTotalItems())
  const wishlistItems = useWishlist((state) => state.getTotalItems())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const categories = [
    { name: "Smartphones", href: "/category/smartphones" },
    { name: "Laptops", href: "/category/laptops" },
    { name: "Audio", href: "/category/audio" },
    { name: "Tablets", href: "/category/tablets" },
    { name: "Wearables", href: "/category/wearables" },
    { name: "Gaming", href: "/category/gaming" },
    { name: "Cameras", href: "/category/cameras" },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-nuclear-900 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Lagos, Abuja, Port Harcourt - Free Delivery</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+234 703 016 7577</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>support@nuclearvisionglobal.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/home" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-nuclear-500 to-nuclear-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-gray-900">Nuclear Vision</div>
                <div className="text-xs text-gray-600 -mt-1">Global Limited</div>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-nuclear-500 focus:ring-0"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-premium text-white"
                  >
                    Search
                  </Button>
                )}
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search - Mobile */}
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                      {wishlistItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-nuclear-500">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">Create Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="py-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              className="block py-2 text-gray-600 hover:text-nuclear-600"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <div className="space-y-2">
                          <Link href="/deals" className="block py-2 text-gray-600 hover:text-nuclear-600">
                            Deals & Offers
                          </Link>
                          <Link href="/about" className="block py-2 text-gray-600 hover:text-nuclear-600">
                            About Us
                          </Link>
                          <Link href="/contact" className="block py-2 text-gray-600 hover:text-nuclear-600">
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center justify-between py-4 border-t border-gray-100">
            <div className="flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <span>Categories</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link href={category.href}>{category.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/deals" className="text-gray-700 hover:text-nuclear-600 font-medium">
                Deals & Offers
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-nuclear-600 font-medium">
                All Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-nuclear-600 font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-nuclear-600 font-medium">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Free Shipping ₦50,000+
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                24/7 Support
              </Badge>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
