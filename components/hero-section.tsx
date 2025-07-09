"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Shield, Truck } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Latest iPhone 15 Pro Max",
    subtitle: "Experience the future of mobile technology",
    description: "Titanium design, A17 Pro chip, and revolutionary camera system",
    price: "From ₦1,899,000",
    originalPrice: "₦2,199,000",
    image: "/images/iphone-15-pro-max.jpg",
    badge: "New Arrival",
    cta: "Shop Now",
    link: "/product/2",
  },
  {
    id: 2,
    title: "MacBook Pro M3",
    subtitle: "Supercharged for pros",
    description: "Up to 22 hours of battery life and blazing-fast performance",
    price: "From ₦2,399,000",
    originalPrice: "₦2,599,000",
    image: "/images/macbook-pro.jpg",
    badge: "Best Seller",
    cta: "Explore",
    link: "/product/3",
  },
  {
    id: 3,
    title: "Samsung Galaxy S24 Ultra",
    subtitle: "AI-powered smartphone",
    description: "Revolutionary Galaxy AI features and S Pen precision",
    price: "From ₦1,699,000",
    originalPrice: "₦1,899,000",
    image: "/images/samsung-s24-ultra.jpg",
    badge: "Hot Deal",
    cta: "Buy Now",
    link: "/product/1",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-nuclear-50 to-nuclear-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentHero.image || "/placeholder.svg"}
          alt={currentHero.title}
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nuclear-900/80 via-nuclear-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <div className="space-y-6 text-white lg:text-left text-center">
            <div className="space-y-4">
              <Badge className="bg-nuclear-500 hover:bg-nuclear-600 text-white font-semibold px-4 py-2 text-sm">
                {currentHero.badge}
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">{currentHero.title}</h1>

              <h2 className="text-xl lg:text-2xl text-nuclear-100 font-medium">{currentHero.subtitle}</h2>

              <p className="text-lg text-nuclear-200 max-w-lg">{currentHero.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 justify-center lg:justify-start">
                <span className="text-3xl lg:text-4xl font-bold text-white">{currentHero.price}</span>
                {currentHero.originalPrice && (
                  <span className="text-xl text-nuclear-300 line-through">{currentHero.originalPrice}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={currentHero.link}>
                  <Button size="lg" className="btn-premium text-white px-8 py-4 text-lg font-semibold">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {currentHero.cta}
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-nuclear-900 px-8 py-4 text-lg font-semibold bg-transparent"
                  >
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-nuclear-700">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-nuclear-300" />
                <span className="text-sm text-nuclear-200">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-nuclear-300" />
                <span className="text-sm text-nuclear-200">2 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-nuclear-300" />
                <span className="text-sm text-nuclear-200">Fast Support</span>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src={currentHero.image || "/placeholder.svg"}
                alt={currentHero.title}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
