import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Timer, Zap, Percent } from "lucide-react"

const flashDeals = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 999,
    originalPrice: 1299,
    image: "/images/iphone-15.jpg",
    rating: 4.8,
    reviews: 5234,
    category: "Smartphones",
    isOnSale: true,
    badge: "Flash Deal",
    timeLeft: "2h 15m",
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch M3",
    price: 1999,
    originalPrice: 2599,
    image: "/images/macbook-pro.jpg",
    rating: 4.9,
    reviews: 2847,
    category: "Laptops",
    isOnSale: true,
    badge: "Flash Deal",
    timeLeft: "4h 32m",
  },
]

const weeklyDeals = [
  {
    id: 3,
    name: "AirPods Pro 2nd Generation",
    price: 199,
    originalPrice: 279,
    image: "/images/airpods.jpg",
    rating: 4.7,
    reviews: 3421,
    category: "Audio",
    isOnSale: true,
    badge: "Weekly Deal",
  },
  {
    id: 4,
    name: "iPad Pro 12.9-inch M2",
    price: 899,
    originalPrice: 1099,
    image: "/images/ipad.jpg",
    rating: 4.8,
    reviews: 1876,
    category: "Tablets",
    isOnSale: true,
    badge: "Weekly Deal",
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    price: 999,
    originalPrice: 1299,
    image: "/images/samsung-phone.jpg",
    rating: 4.6,
    reviews: 2134,
    category: "Smartphones",
    isOnSale: true,
    badge: "Weekly Deal",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5 Headphones",
    price: 299,
    originalPrice: 399,
    image: "/images/headphones.jpg",
    rating: 4.9,
    reviews: 4567,
    category: "Audio",
    isOnSale: true,
    badge: "Weekly Deal",
  },
]

export function DealsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">🔥 Hot Deals & Offers</h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Save big on your favorite electronics - Limited time only!
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold">Up to 80%</div>
              <div className="text-lg opacity-90">Off</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Free</div>
              <div className="text-lg opacity-90">Shipping</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-lg opacity-90">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Zap className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">⚡ Flash Deals</h2>
              <p className="text-gray-600">Limited time offers - Hurry up!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
            <Timer className="h-4 w-4" />
            <span className="font-semibold">Ends in 6h 45m</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flashDeals.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {product.timeLeft} left
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deal Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Deal Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-orange-200">
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Percent className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Clearance Sale</h3>
              <p className="text-gray-600 mb-4">Up to 70% off on selected items</p>
              <Badge className="bg-orange-500 hover:bg-orange-600">Shop Now</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Timer className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Daily Deals</h3>
              <p className="text-gray-600 mb-4">New deals every day at midnight</p>
              <Badge className="bg-blue-500 hover:bg-blue-600">Explore</Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-green-200">
            <CardContent className="p-8 text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bundle Offers</h3>
              <p className="text-gray-600 mb-4">Save more when you buy together</p>
              <Badge className="bg-green-500 hover:bg-green-600">View Bundles</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Weekly Deals */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">🗓️ This Week's Best Deals</h2>
          <p className="text-xl text-gray-600">Handpicked deals that last all week long</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {weeklyDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-xl mb-8 opacity-90">Subscribe to get exclusive deals and early access to sales</p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
