"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones, Shield, Truck, RotateCcw } from "lucide-react"

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    // Show success message
  }

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-orange-500" />
                  <span>Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-600">
                      123 Tech Street
                      <br />
                      Silicon Valley, CA 94000
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">support@elextra.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-semibold">Business Hours</div>
                    <div className="text-gray-600 text-sm space-y-1">
                      <div>Mon - Fri: 9:00 AM - 8:00 PM</div>
                      <div>Sat: 10:00 AM - 6:00 PM</div>
                      <div>Sun: 12:00 PM - 5:00 PM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="h-5 w-5 text-orange-500" />
                  <span>Support Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <MessageCircle className="h-4 w-4 text-orange-600" />
                  <div>
                    <div className="font-medium text-sm">Live Chat</div>
                    <div className="text-xs text-gray-600">Available 24/7</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Phone Support</div>
                    <div className="text-xs text-gray-600">Mon-Fri 9AM-8PM</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Mail className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="font-medium text-sm">Email Support</div>
                    <div className="text-xs text-gray-600">Response within 24h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">Secure & Safe</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium">30-Day Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="order">Order Status</SelectItem>
                        <SelectItem value="return">Returns & Exchanges</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please describe your inquiry in detail..." rows={6} required />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 lg:mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What are your shipping options?</h3>
                <p className="text-gray-600 text-sm">
                  We offer free standard shipping on orders over $50, with delivery in 3-5 business days. Express
                  shipping is available for $9.99 with 1-2 day delivery.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What is your return policy?</h3>
                <p className="text-gray-600 text-sm">
                  We offer a 30-day return policy for all items in original condition. Returns are free and easy with
                  our prepaid return labels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you offer warranty on products?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, all products come with manufacturer warranty. We also offer extended warranty options for
                  additional protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How can I track my order?</h3>
                <p className="text-gray-600 text-sm">
                  Once your order ships, you'll receive a tracking number via email. You can also track orders in your
                  account dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
