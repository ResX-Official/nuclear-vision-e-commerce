import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Smartphones",
    count: 245,
    image: "/images/iphone-15.jpg",
    href: "/category/smartphones",
  },
  {
    id: 2,
    name: "Laptops",
    count: 189,
    image: "/images/macbook-pro.jpg",
    href: "/category/laptops",
  },
  {
    id: 3,
    name: "Audio",
    count: 156,
    image: "/images/headphones.jpg",
    href: "/category/audio",
  },
  {
    id: 4,
    name: "Tablets",
    count: 98,
    image: "/images/ipad.jpg",
    href: "/category/tablets",
  },
  {
    id: 5,
    name: "Wearables",
    count: 87,
    image: "/images/apple-watch.jpg",
    href: "/category/wearables",
  },
  {
    id: 6,
    name: "Gaming",
    count: 134,
    image: "/images/gaming-setup.jpg",
    href: "/category/gaming",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully curated categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                        <p className="text-lg opacity-90">{category.count} Products</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
