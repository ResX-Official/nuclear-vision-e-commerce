"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Home, ShoppingCart, User, Heart, Percent } from "lucide-react"
import { useCart } from "@/lib/cart"
import { useWishlist } from "@/lib/wishlist"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const cartItems = useCart((state) => state.getTotalItems())
  const wishlistItems = useWishlist((state) => state.getTotalItems())

  // Hide/show nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      isActive: pathname === "/",
    },
    {
      href: "/deals",
      icon: Percent,
      label: "Deals",
      isActive: pathname === "/deals",
      badge: "HOT",
      badgeColor: "bg-red-500",
    },
    {
      href: "/cart",
      icon: ShoppingCart,
      label: "Cart",
      isActive: pathname === "/cart",
      badge: cartItems > 0 ? cartItems : undefined,
      badgeColor: "bg-nuclear-500",
    },
    {
      href: "/wishlist",
      icon: Heart,
      label: "Wishlist",
      isActive: pathname === "/wishlist",
      badge: wishlistItems > 0 ? wishlistItems : undefined,
      badgeColor: "bg-pink-500",
    },
    {
      href: "/account",
      icon: User,
      label: "Account",
      isActive: pathname.startsWith("/account"),
    },
  ]

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 sm:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 relative transition-all duration-200 ${
                item.isActive
                  ? "text-nuclear-500 bg-nuclear-50 scale-105"
                  : "text-gray-600 hover:text-nuclear-500 hover:bg-nuclear-50/50 active:scale-95"
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 transition-transform ${item.isActive ? "scale-110" : ""}`} />
                {item.badge && (
                  <Badge
                    className={`absolute -top-2 -right-2 h-4 min-w-4 flex items-center justify-center p-0 ${item.badgeColor} hover:${item.badgeColor} text-white text-xs font-bold`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs font-medium transition-all ${item.isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {item.isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-nuclear-500 rounded-full"></div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
