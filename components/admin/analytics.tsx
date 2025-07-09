"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

const salesData = [
  { month: "Jan", revenue: 2400000, orders: 45 },
  { month: "Feb", revenue: 1800000, orders: 32 },
  { month: "Mar", revenue: 3200000, orders: 58 },
  { month: "Apr", revenue: 2800000, orders: 49 },
  { month: "May", revenue: 3600000, orders: 67 },
  { month: "Jun", revenue: 4200000, orders: 78 },
]

const categoryData = [
  { name: "Smartphones", value: 35, color: "#0ea5e9" },
  { name: "Laptops", value: 25, color: "#8b5cf6" },
  { name: "Audio", value: 20, color: "#10b981" },
  { name: "Tablets", value: 12, color: "#f59e0b" },
  { name: "Others", value: 8, color: "#ef4444" },
]

const topProducts = [
  { name: "iPhone 15 Pro Max", sales: 45, revenue: 38250000 },
  { name: "Samsung S24 Ultra", sales: 32, revenue: 22400000 },
  { name: "MacBook Pro M3", sales: 28, revenue: 33600000 },
  { name: "Sony WH-1000XM5", sales: 67, revenue: 12060000 },
  { name: 'iPad Pro 12.9"', sales: 23, revenue: 14950000 },
]

export function Analytics() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <Select defaultValue="6months">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦18.8M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">329</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+8.2% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+15.3% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦57,142</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-2.1% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatCompactPrice} />
                <Tooltip formatter={(value) => [formatPrice(Number(value)), "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: "#0ea5e9" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Volume</CardTitle>
            <CardDescription>Number of orders per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Visitors to customers conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2%</div>
            <div className="flex items-center text-xs text-green-600 mt-2">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+0.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <CardDescription>Repeat customer rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <div className="flex items-center text-xs text-green-600 mt-2">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+3.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cart Abandonment</CardTitle>
            <CardDescription>Abandoned cart rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24%</div>
            <div className="flex items-center text-xs text-red-600 mt-2">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-1.8% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
