"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Building2, MessageCircle, Shield, CheckCircle, Copy, Phone, Mail, MapPin } from "lucide-react"
import { useCart } from "@/lib/cart"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export function CheckoutForm() {
  const { items, getTotalPrice, clearCart } = useCart()
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("bank-transfer")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const subtotal = getTotalPrice()
  const shipping = subtotal > 500000 ? 0 : 15000
  const tax = subtotal * 0.075
  const total = subtotal + shipping + tax

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText("0123456789")
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
    })
  }

  const handleWhatsAppConfirmation = () => {
    const orderDetails = items
      .map((item) => `${item.quantity}x ${item.product.name} - ${formatPrice(item.product.price * item.quantity)}`)
      .join("\n")

    const message = `Hello! I've made a payment for my order:

*Order Details:*
${orderDetails}

*Total Amount:* ${formatPrice(total)}
*Payment Method:* Bank Transfer
*Account:* Access Bank - 0123456789

*Customer Details:*
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}, ${formData.city}, ${formData.state}

I've attached the payment screenshot. Please confirm my order.

Thank you!`

    const whatsappUrl = `https://wa.me/2347030167577?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newOrderNumber = `NVG${Date.now().toString().slice(-6)}`
      setOrderNumber(newOrderNumber)
      setOrderPlaced(true)

      // Clear cart after successful order
      setTimeout(() => {
        clearCart()
      }, 3000)

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${newOrderNumber} has been received.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Your order #{orderNumber} has been received and is being processed.</p>
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg">Total: {formatPrice(total)}</Badge>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Next Steps:</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-nuclear-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Complete Your Payment</p>
                  <p className="text-sm text-gray-600">Transfer {formatPrice(total)} to our Access Bank account</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-nuclear-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Send Payment Confirmation</p>
                  <p className="text-sm text-gray-600">
                    Click the WhatsApp button below to send your payment screenshot
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-nuclear-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-sm text-gray-600">
                    We'll confirm your payment and process your order within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleWhatsAppConfirmation} className="btn-premium text-white px-8 py-3 text-lg mb-4">
          <MessageCircle className="h-5 w-5 mr-2" />
          Confirm Payment on WhatsApp
        </Button>

        <div className="text-sm text-gray-600">
          <p>Need help? Contact us at:</p>
          <p className="font-medium">+234 703 016 7577</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Billing Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Billing Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+234 xxx xxx xxxx"
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions for your order..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Method</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-4 border rounded-lg bg-nuclear-50 border-nuclear-200">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-nuclear-600" />
                      <div>
                        <div className="font-medium">Bank Transfer (Recommended)</div>
                        <div className="text-sm text-gray-600">Direct bank transfer to our Access Bank account</div>
                      </div>
                    </div>
                  </Label>
                </div>

                {paymentMethod === "bank-transfer" && (
                  <Card className="ml-6 border-nuclear-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900">Nuclear Vision Global Limited</div>
                            <div className="text-sm text-gray-600">Access Bank</div>
                            <div className="font-mono text-lg font-bold text-nuclear-600">0123456789</div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={copyAccountNumber}
                            className="flex items-center space-x-1 bg-transparent"
                          >
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </Button>
                        </div>

                        <div className="text-sm text-gray-600 space-y-2">
                          <p className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>Secure and verified business account</span>
                          </p>
                          <p>
                            • Transfer the exact amount: <strong>{formatPrice(total)}</strong>
                          </p>
                          <p>• Use your order number as reference</p>
                          <p>• Send payment screenshot via WhatsApp for quick confirmation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                  <RadioGroupItem value="card" id="card" disabled />
                  <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-400">Credit/Debit Card</div>
                        <div className="text-sm text-gray-400">Coming soon - Paystack integration</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3 py-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium">
                    {item.quantity}x
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm line-clamp-2">{item.product.name}</div>
                    <div className="text-sm text-gray-600">{formatPrice(item.product.price)}</div>
                  </div>
                  <div className="font-medium">{formatPrice(item.product.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Order Totals */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VAT (7.5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-premium text-white py-3 text-lg font-semibold"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                "Place Order"
              )}
            </Button>

            {paymentMethod === "bank-transfer" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">Quick Payment Confirmation</p>
                    <p className="text-blue-700">
                      After placing your order, you'll be redirected to WhatsApp to send your payment screenshot for
                      instant confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="flex flex-col items-center space-y-1">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-4 border-t text-center text-sm text-gray-600">
              <p className="mb-2">Need help with your order?</p>
              <div className="space-y-1">
                <p className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+234 703 016 7577</span>
                </p>
                <p className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@nuclearvisionglobal.com</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
