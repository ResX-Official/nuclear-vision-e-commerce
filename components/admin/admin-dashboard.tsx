"use client"

import { useEffect } from "react"
import { AdminLayout } from "./admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useAdminStore } from "@/lib/admin-store"

export function AdminDashboard() {
  const { analytics, orders, products, users, updateAnalytics } = useAdminStore()

  useEffect(() => {
    updateAnalytics()
  }, [updateAnalytics])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatCompactPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`
    }
    if (price >= 1000) {
      return `₦${(price / 1000).toFixed(0)}K`
    }
    return `₦${price}`
  }

  const recentOrders = orders.slice(0, 5)
  const lowStockProducts = products.filter((p) => p.stockCount < 10)
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const processingOrders = orders.filter((o) => o.status === "processing").length

  const stats = [
    {
      title: "Total Revenue",
      value: formatPrice(analytics.totalRevenue),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
      description: "vs last month",
    },
    {
      title: "Total Orders",
      value: analytics.totalOrders.toString(),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      gradient: "from-blue-500 to-cyan-500",
      description: "vs last month",
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      change: "+2.1%",
      trend: "up",
      icon: Package,
      gradient: "from-purple-500 to-pink-500",
      description: "active products",
    },
    {
      title: "Total Users",
      value: analytics.totalUsers.toString(),
      change: "+15.3%",
      trend: "up",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
      description: "registered users",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your store today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              System Online
            </Badge>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
              <Zap className="mr-2 h-4 w-4" />
              Quick Actions
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-5`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="flex items-center text-sm">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4 text-red-600" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">+12.5%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis tickFormatter={formatCompactPrice} stroke="#6b7280" />
                  <Tooltip
                    formatter={(value) => [formatPrice(Number(value)), "Revenue"]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Orders Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Order Volume</CardTitle>
                  <CardDescription>Monthly order trends</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">+8.2%</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="orders" fill="url(#orderGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 bg-transparent">
                  <Eye className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <ShoppingCart className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatPrice(order.total)}</p>
                      <Badge
                        variant={
                          order.status === "delivered"
                            ? "default"
                            : order.status === "processing"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats & Alerts */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-medium text-gray-900">{analytics.conversionRate}%</span>
                  </div>
                  <Progress value={analytics.conversionRate * 10} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <span className="font-medium text-gray-900">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order Fulfillment</span>
                    <span className="font-medium text-gray-900">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800">Low Stock Alert</p>
                    <p className="text-xs text-yellow-600">{lowStockProducts.length} products need restocking</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">Pending Orders</p>
                    <p className="text-xs text-blue-600">{pendingOrders} orders awaiting processing</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">System Status</p>
                    <p className="text-xs text-green-600">All systems operational</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-gray-50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                <Package className="h-6 w-6" />
                <span>Add Product</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 bg-transparent"
              >
                <ShoppingCart className="h-6 w-6 text-purple-600" />
                <span className="text-purple-600">View Orders</span>

                <span className="text-purple-600">View Orders</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 border-2 border-green-200 hover:bg-green-50 hover:border-green-300 bg-transparent"
              >
                <Users className="h-6 w-6 text-green-600" />
                <span className="text-green-600">Manage Users</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
              >
                <TrendingUp className="h-6 w-6 text-orange-600" />
                <span className="text-orange-600">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
