"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Mail className="h-8 w-8 text-orange-500" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Stay in the Loop</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Get the latest updates on new products, exclusive deals, and tech news delivered straight to your
                  inbox.
                </p>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                      required
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-lg font-semibold">Thank you for subscribing!</span>
                </div>
              )}

              <p className="text-sm text-gray-500">Join over 50,000 subscribers. No spam, unsubscribe anytime.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
