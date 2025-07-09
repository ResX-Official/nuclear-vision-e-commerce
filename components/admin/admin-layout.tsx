"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  Home,
  LogOut,
  Bell,
  Search,
  Plus,
  FileText,
  Shield,
  TrendingUp,
  DollarSign,
  Eye,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminStore } from "@/lib/admin-store"
import { Input } from "@/components/ui/input"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
    badge: null,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
    badge: "156",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "12",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    badge: "1.2K",
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: null,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Content",
    href: "/admin/content",
    icon: FileText,
    badge: null,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
    gradient: "from-gray-500 to-slate-500",
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()

  const { currentUser, isAuthenticated, logout, analytics } = useAdminStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("flex h-full flex-col", mobile ? "w-full" : "w-72")}>
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b border-gray-200/50 px-6 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Nuclear Vision
            </h1>
            <p className="text-xs text-gray-500">Admin Center</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-gray-200/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-900">Revenue</span>
            </div>
            <p className="text-sm font-bold text-blue-900 mt-1">₦{(analytics.totalRevenue / 1000000).toFixed(1)}M</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-900">Orders</span>
            </div>
            <p className="text-sm font-bold text-green-900 mt-1">{analytics.totalOrders}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                isActive
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-${item.gradient.split("-")[1]}-500/25`
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              )}
              onClick={() => mobile && setSidebarOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600",
                  )}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className={cn("text-xs", isActive ? "bg-white/20 text-white border-white/30" : "")}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200/50 p-4">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
          <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
            <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
              {currentUser?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.role}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 mt-2"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-72 flex-col border-r border-gray-200/50 bg-white/80 backdrop-blur-sm">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-white/95 backdrop-blur-sm">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-20 items-center justify-between border-b border-gray-200/50 bg-white/80 backdrop-blur-sm px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-white/95 backdrop-blur-sm">
                <Sidebar mobile />
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-gray-900 lg:ml-0">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h2>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Live</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-white/50 border-gray-200 focus:bg-white"
              />
            </div>

            {/* Quick Actions */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                  <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                    <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold">
                      {currentUser?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Site
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
