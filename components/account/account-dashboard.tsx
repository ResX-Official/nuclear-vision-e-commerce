"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react"

const recentOrders = [
  {
    id: "ORD-2024-001234",
    date: "June 14, 2024",
    status: "Delivered",
    total: 2897.0,
    items: 2,
  },
  {
    id: "ORD-2024-001233",
    date: "June 10, 2024",
    status: "Shipped",
    total: 1299.0,
    items: 1,
  },
  {
    id: "ORD-2024-001232",
    date: "June 5, 2024",
    status: "Processing",
    total: 599.0,
    items: 3,
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "iPad Pro 12.9-inch M2",
    price: 1099,
    image: "/images/ipad.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Headphones",
    price: 399,
    image: "/images/headphones.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "Dell XPS 13 Plus Laptop",
    price: 1299,
    image: "/images/laptop-dell.jpg",
    inStock: false,
  },
]

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "Processing":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt="John Doe" />
            <AvatarFallback className="bg-orange-100 text-orange-600 text-xl font-semibold">JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Manage your account and track your orders</p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-600">In Transit</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{wishlistItems.length}</div>
                <div className="text-sm text-gray-600">Wishlist Items</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-sm text-gray-600">Delivered</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link href="/account/orders">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <div className="font-semibold">{order.id}</div>
                        <div className="text-sm text-gray-600">{order.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${order.total.toFixed(2)}</div>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Wishlist Preview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Wishlist</CardTitle>
                <Link href="/account/wishlist">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {wishlistItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white rounded-lg"></div>
                      <div>
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-sm text-gray-600">${item.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <Badge variant={item.inStock ? "default" : "secondary"}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <div className="font-semibold text-lg">{order.id}</div>
                      <div className="text-gray-600">
                        {order.date} • {order.items} items
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-semibold text-lg">${order.total.toFixed(2)}</div>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>My Wishlist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-lg"></div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="text-lg font-bold text-orange-600">${item.price.toLocaleString()}</div>
                      <Badge variant={item.inStock ? "default" : "secondary"} className="mt-2">
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={!item.inStock}>
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4 fill-current text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span>Default Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="font-semibold">John Doe</div>
                <div>123 Main Street</div>
                <div>New York, NY 10001</div>
                <div className="pt-2">
                  <Button variant="outline" size="sm">
                    Edit Address
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  <span>Default Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <span>•••• •••• •••• 1234</span>
                </div>
                <div className="text-sm text-gray-600">Expires 12/26</div>
                <div className="pt-2">
                  <Button variant="outline" size="sm">
                    Edit Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-orange-500" />
                <span>Account Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Name</div>
                    <div className="font-medium">John Doe</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">john.doe@example.com</div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email notifications</span>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Privacy settings</span>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Change password</span>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
