"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Truck, Mail, Calendar, MapPin } from "lucide-react"

const orderDetails = {
  orderNumber: "ORD-2024-001234",
  orderDate: "June 14, 2024",
  estimatedDelivery: "June 18-20, 2024",
  total: 2897.0,
  items: [
    {
      id: 1,
      name: "MacBook Pro 16-inch M3",
      price: 2399,
      image: "/images/macbook-pro.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "AirPods Pro 2nd Generation",
      price: 249,
      image: "/images/airpods.jpg",
      quantity: 2,
    },
  ],
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
  paymentMethod: "•••• •••• •••• 1234",
}

export function OrderConfirmation() {
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Simulate email confirmation
    const timer = setTimeout(() => setEmailSent(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="text-xl text-gray-600">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {emailSent && (
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
            <Mail className="h-4 w-4" />
            <span className="text-sm">Confirmation email sent</span>
          </div>
        )}
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Order Number</div>
                  <div className="font-semibold">{orderDetails.orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Order Date</div>
                  <div className="font-semibold">{orderDetails.orderDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="font-semibold">${orderDetails.total.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items Ordered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                    <div className="font-semibold text-orange-600">${item.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Shipping & Billing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span>Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="font-semibold">{orderDetails.shippingAddress.name}</div>
                  <div>{orderDetails.shippingAddress.address}</div>
                  <div>
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zip}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <span>{orderDetails.paymentMethod}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-orange-500" />
                <span>Delivery</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Estimated Delivery</div>
                <div className="font-semibold text-lg">{orderDetails.estimatedDelivery}</div>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Free Standard Shipping</Badge>
              <div className="text-sm text-gray-600">
                You'll receive tracking information via email once your order ships.
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="h-4 w-4 mr-2" />
                Track Order
              </Button>
              <Link href="/account/orders">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Continue Shopping</h3>
              <p className="text-sm text-gray-600 mb-4">Discover more amazing products</p>
              <Link href="/shop">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Shop More</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
