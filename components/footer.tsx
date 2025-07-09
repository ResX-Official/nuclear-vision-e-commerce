import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-nuclear-500 to-nuclear-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <div className="font-bold text-xl">Nuclear Vision</div>
                <div className="text-sm text-gray-400">Global Limited</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nigeria's leading electronics retailer offering premium smartphones, laptops, audio equipment, and more
              with nationwide delivery.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/shop" className="block text-gray-300 hover:text-white transition-colors">
                All Products
              </Link>
              <Link href="/deals" className="block text-gray-300 hover:text-white transition-colors">
                Deals & Offers
              </Link>
              <Link href="/category/smartphones" className="block text-gray-300 hover:text-white transition-colors">
                Smartphones
              </Link>
              <Link href="/category/laptops" className="block text-gray-300 hover:text-white transition-colors">
                Laptops
              </Link>
              <Link href="/category/audio" className="block text-gray-300 hover:text-white transition-colors">
                Audio Equipment
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/account" className="block text-gray-300 hover:text-white transition-colors">
                My Account
              </Link>
              <Link href="/account/orders" className="block text-gray-300 hover:text-white transition-colors">
                Order Tracking
              </Link>
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white transition-colors">
                Returns & Refunds
              </Link>
              <Link href="/warranty" className="block text-gray-300 hover:text-white transition-colors">
                Warranty
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-nuclear-400" />
                <span className="text-gray-300">+234 703 016 7577</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-nuclear-400" />
                <span className="text-gray-300">support@nuclearvisionglobal.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-nuclear-400 mt-0.5" />
                <span className="text-gray-300">
                  Lagos, Abuja, Port Harcourt
                  <br />
                  Nigeria
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <h4 className="font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="btn-premium text-white">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-nuclear-500/20 rounded-lg">
              <Truck className="h-6 w-6 text-nuclear-400" />
            </div>
            <div>
              <div className="font-medium">Free Shipping</div>
              <div className="text-sm text-gray-400">On orders over ₦50,000</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-nuclear-500/20 rounded-lg">
              <Shield className="h-6 w-6 text-nuclear-400" />
            </div>
            <div>
              <div className="font-medium">Secure Payment</div>
              <div className="text-sm text-gray-400">SSL encrypted checkout</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-nuclear-500/20 rounded-lg">
              <CreditCard className="h-6 w-6 text-nuclear-400" />
            </div>
            <div>
              <div className="font-medium">Easy Returns</div>
              <div className="text-sm text-gray-400">30-day return policy</div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">© 2024 Nuclear Vision Global Limited. All rights reserved.</div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
