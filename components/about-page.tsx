import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Shield, Truck, Heart, Target, Lightbulb, CheckCircle } from "lucide-react"

const stats = [
  { label: "Happy Customers", value: "50K+", icon: Users },
  { label: "Products Sold", value: "100K+", icon: Award },
  { label: "Countries Served", value: "25+", icon: Globe },
  { label: "Years of Experience", value: "10+", icon: CheckCircle },
]

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "We source only the highest quality electronics from trusted manufacturers and brands.",
  },
  {
    icon: Heart,
    title: "Customer Focused",
    description: "Your satisfaction is our priority. We're here to help every step of the way.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of technology trends to bring you the latest and greatest products.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Shop with confidence knowing your data and purchases are secure with us.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg",
    description: "Tech entrepreneur with 15+ years in electronics retail",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg",
    description: "Former Apple engineer passionate about cutting-edge technology",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Customer Experience",
    image: "/placeholder.svg",
    description: "Customer service expert dedicated to exceptional experiences",
  },
  {
    name: "David Kim",
    role: "Head of Operations",
    image: "/placeholder.svg",
    description: "Supply chain specialist ensuring fast, reliable delivery",
  },
]

export function AboutPage() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">About Elextra</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Powering Your Digital Life</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Since 2014, Elextra has been your trusted partner in technology. We're passionate about bringing you the
            latest electronics, exceptional service, and unbeatable value.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Elextra was born from a simple idea: technology should enhance your life, not complicate it. Founded in
                2014 by a team of tech enthusiasts, we started as a small online retailer with a big vision.
              </p>
              <p>
                Today, we've grown into one of the most trusted electronics retailers, serving customers across 25
                countries. But our mission remains the same: to make cutting-edge technology accessible to everyone.
              </p>
              <p>
                From smartphones to smart homes, we carefully curate every product in our catalog to ensure you're
                getting the best technology at the best prices, backed by exceptional service.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
              <Image src="/images/hero-laptop.jpg" alt="Elextra team working" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
              10+ Years
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                      <Icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Elextra who make it all possible
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-orange-600 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Elextra?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're more than just an electronics store - we're your technology partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Shopping</h3>
              <p className="text-gray-600">
                Your data and payments are protected with bank-level security and SSL encryption.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Free shipping on orders over $50 with fast, reliable delivery to your door.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Our knowledgeable team is here to help you find the perfect tech solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
