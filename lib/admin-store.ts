import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./products"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "super_admin" | "admin" | "editor"
  avatar?: string
  lastLogin: string
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    id: number
    name: string
    quantity: number
    price: number
    image: string
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  createdAt: string
  updatedAt: string
  trackingNumber?: string
  notes?: string
}

interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: "active" | "inactive" | "blocked"
  createdAt: string
  totalOrders: number
  totalSpent: number
  lastOrderDate?: string
}

interface PageContent {
  id: string
  page: string
  section: string
  content: any
  type: "hero" | "text" | "image" | "product_grid" | "testimonials" | "cta" | "custom"
  order: number
  isActive: boolean
}

interface SiteSettings {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  currency: string
  timezone: string
  contactEmail: string
  contactPhone: string
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  analytics: {
    googleAnalytics?: string
    facebookPixel?: string
  }
}

interface AdminStore {
  // Authentication
  currentUser: AdminUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void

  // Products
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  deleteProduct: (id: number) => void

  // Orders
  orders: Order[]
  updateOrderStatus: (id: string, status: Order["status"]) => void
  updatePaymentStatus: (id: string, status: Order["paymentStatus"]) => void
  addOrderNote: (id: string, note: string) => void

  // Users
  users: User[]
  updateUserStatus: (id: string, status: User["status"]) => void

  // Content Management
  pageContents: PageContent[]
  updatePageContent: (id: string, content: any) => void
  addPageSection: (page: string, section: Omit<PageContent, "id">) => void
  deletePageSection: (id: string) => void
  reorderSections: (page: string, sections: PageContent[]) => void

  // Site Settings
  siteSettings: SiteSettings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void

  // Analytics
  analytics: {
    totalRevenue: number
    totalOrders: number
    totalUsers: number
    conversionRate: number
    averageOrderValue: number
    topProducts: Array<{ id: number; name: string; sales: number; revenue: number }>
    revenueData: Array<{ month: string; revenue: number; orders: number }>
    categoryData: Array<{ name: string; value: number; color: string }>
  }
  updateAnalytics: () => void
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Authentication
      currentUser: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (email === "admin@nuclearvision.com" && password === "admin123") {
          const user: AdminUser = {
            id: "1",
            name: "Admin User",
            email: "admin@nuclearvision.com",
            role: "super_admin",
            avatar: "/placeholder.svg?height=40&width=40",
            lastLogin: new Date().toISOString(),
          }
          set({ currentUser: user, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => {
        set({ currentUser: null, isAuthenticated: false })
      },

      // Products
      products: [
        {
          id: 1,
          name: "Samsung Galaxy S24 Ultra 256GB",
          price: 1850000,
          originalPrice: 2100000,
          image: "/images/samsung-s24-ultra.jpg",
          images: [
            "/images/samsung-s24-ultra.jpg",
            "/images/samsung-s24-ultra-2.jpg",
            "/images/samsung-s24-ultra-3.jpg",
            "/images/samsung-s24-ultra-4.jpg",
          ],
          rating: 4.8,
          reviews: 2847,
          category: "Smartphones",
          brand: "Samsung",
          description:
            "The most powerful Galaxy smartphone yet, featuring the revolutionary S Pen, advanced AI photography, and all-day battery life.",
          features: [
            "6.8-inch Dynamic AMOLED 2X display with 120Hz",
            "200MP main camera with 100x Space Zoom",
            "Built-in S Pen with Air Actions",
            "Snapdragon 8 Gen 3 processor",
          ],
          specifications: {
            Display: "6.8-inch Dynamic AMOLED 2X",
            Processor: "Snapdragon 8 Gen 3",
            RAM: "12GB",
            Storage: "256GB",
          },
          isOnSale: true,
          badge: "Flagship",
          inStock: true,
          stockCount: 15,
          isNew: true,
          isTrending: true,
          freeShipping: true,
          fastDelivery: true,
          warranty: "2 Year Warranty",
          returnPolicy: "30-Day Returns",
        },
        {
          id: 2,
          name: "iPhone 15 Pro Max 256GB",
          price: 2200000,
          originalPrice: 2450000,
          image: "/images/iphone-15-pro-max.jpg",
          images: [
            "/images/iphone-15-pro-max.jpg",
            "/images/iphone-15-pro-max-2.jpg",
            "/images/iphone-15-pro-max-3.jpg",
            "/images/iphone-15-pro-max-4.jpg",
          ],
          rating: 4.9,
          reviews: 3521,
          category: "Smartphones",
          brand: "Apple",
          description:
            "The ultimate iPhone experience with titanium design, A17 Pro chip, and the most advanced camera system ever in an iPhone.",
          features: [
            "6.7-inch Super Retina XDR display with ProMotion",
            "A17 Pro chip with 6-core GPU",
            "Pro camera system with 5x Telephoto",
            "Action Button for quick shortcuts",
          ],
          specifications: {
            Display: "6.7-inch Super Retina XDR OLED",
            Processor: "A17 Pro chip",
            RAM: "8GB",
            Storage: "256GB",
          },
          isOnSale: true,
          badge: "Premium",
          inStock: true,
          stockCount: 8,
          isNew: true,
          isTrending: true,
          freeShipping: true,
          fastDelivery: true,
          warranty: "1 Year Warranty",
          returnPolicy: "14-Day Returns",
        },
      ],
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Math.max(...get().products.map((p) => p.id)) + 1,
        }
        set((state) => ({ products: [...state.products, newProduct] }))
      },
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }))
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },

      // Orders
      orders: [
        {
          id: "ORD-2024-001",
          customer: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+234 801 234 5678",
            address: "Lagos, Nigeria",
          },
          items: [
            {
              id: 1,
              name: "Samsung Galaxy S24 Ultra",
              quantity: 1,
              price: 1850000,
              image: "/images/samsung-s24-ultra.jpg",
            },
          ],
          total: 1850000,
          status: "processing",
          paymentStatus: "paid",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
          trackingNumber: "TRK123456789",
        },
        {
          id: "ORD-2024-002",
          customer: {
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+234 802 345 6789",
            address: "Abuja, Nigeria",
          },
          items: [
            {
              id: 2,
              name: "iPhone 15 Pro Max",
              quantity: 1,
              price: 2200000,
              image: "/images/iphone-15-pro-max.jpg",
            },
          ],
          total: 2200000,
          status: "shipped",
          paymentStatus: "paid",
          createdAt: "2024-01-14T15:45:00Z",
          updatedAt: "2024-01-15T09:20:00Z",
          trackingNumber: "TRK987654321",
        },
      ],
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status, updatedAt: new Date().toISOString() } : order,
          ),
        }))
      },
      updatePaymentStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, paymentStatus: status, updatedAt: new Date().toISOString() } : order,
          ),
        }))
      },
      addOrderNote: (id, note) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, notes: note, updatedAt: new Date().toISOString() } : order,
          ),
        }))
      },

      // Users
      users: [
        {
          id: "USR-001",
          name: "John Doe",
          email: "john@example.com",
          phone: "+234 801 234 5678",
          address: "Lagos, Nigeria",
          status: "active",
          createdAt: "2023-12-15T00:00:00Z",
          totalOrders: 5,
          totalSpent: 4500000,
          lastOrderDate: "2024-01-15T00:00:00Z",
        },
        {
          id: "USR-002",
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+234 802 345 6789",
          address: "Abuja, Nigeria",
          status: "active",
          createdAt: "2023-11-20T00:00:00Z",
          totalOrders: 3,
          totalSpent: 3200000,
          lastOrderDate: "2024-01-14T00:00:00Z",
        },
      ],
      updateUserStatus: (id, status) => {
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, status } : user)),
        }))
      },

      // Content Management
      pageContents: [
        {
          id: "hero-1",
          page: "home",
          section: "hero",
          content: {
            title: "Premium Electronics Store",
            subtitle: "Discover the latest technology at unbeatable prices",
            buttonText: "Shop Now",
            buttonLink: "/shop",
            backgroundImage: "/images/hero-laptop.jpg",
          },
          type: "hero",
          order: 1,
          isActive: true,
        },
      ],
      updatePageContent: (id, content) => {
        set((state) => ({
          pageContents: state.pageContents.map((pc) => (pc.id === id ? { ...pc, content } : pc)),
        }))
      },
      addPageSection: (page, section) => {
        const newSection = {
          ...section,
          id: `${page}-${Date.now()}`,
          page,
        }
        set((state) => ({
          pageContents: [...state.pageContents, newSection],
        }))
      },
      deletePageSection: (id) => {
        set((state) => ({
          pageContents: state.pageContents.filter((pc) => pc.id !== id),
        }))
      },
      reorderSections: (page, sections) => {
        set((state) => ({
          pageContents: [...state.pageContents.filter((pc) => pc.page !== page), ...sections],
        }))
      },

      // Site Settings
      siteSettings: {
        siteName: "Nuclear Vision Global Limited",
        siteDescription: "Premium electronics store in Nigeria",
        logo: "/logo.png",
        favicon: "/favicon.ico",
        primaryColor: "#0ea5e9",
        secondaryColor: "#8b5cf6",
        currency: "NGN",
        timezone: "Africa/Lagos",
        contactEmail: "info@nuclearvision.com",
        contactPhone: "+234 800 123 4567",
        socialMedia: {
          facebook: "https://facebook.com/nuclearvision",
          twitter: "https://twitter.com/nuclearvision",
          instagram: "https://instagram.com/nuclearvision",
        },
        seo: {
          metaTitle: "Nuclear Vision Global - Premium Electronics Store",
          metaDescription: "Shop the latest smartphones, laptops, and electronics in Nigeria",
          keywords: ["electronics", "smartphones", "laptops", "Nigeria"],
        },
        analytics: {
          googleAnalytics: "GA-XXXXXXXXX",
          facebookPixel: "FB-XXXXXXXXX",
        },
      },
      updateSiteSettings: (settings) => {
        set((state) => ({
          siteSettings: { ...state.siteSettings, ...settings },
        }))
      },

      // Analytics
      analytics: {
        totalRevenue: 25600000,
        totalOrders: 156,
        totalUsers: 1247,
        conversionRate: 3.2,
        averageOrderValue: 164103,
        topProducts: [
          { id: 1, name: "Samsung Galaxy S24 Ultra", sales: 45, revenue: 83250000 },
          { id: 2, name: "iPhone 15 Pro Max", sales: 32, revenue: 70400000 },
        ],
        revenueData: [
          { month: "Jan", revenue: 2400000, orders: 45 },
          { month: "Feb", revenue: 1800000, orders: 32 },
          { month: "Mar", revenue: 3200000, orders: 58 },
          { month: "Apr", revenue: 2800000, orders: 49 },
          { month: "May", revenue: 3600000, orders: 67 },
          { month: "Jun", revenue: 4200000, orders: 78 },
        ],
        categoryData: [
          { name: "Smartphones", value: 45, color: "#0ea5e9" },
          { name: "Laptops", value: 25, color: "#8b5cf6" },
          { name: "Audio", value: 20, color: "#10b981" },
          { name: "Others", value: 10, color: "#f59e0b" },
        ],
      },
      updateAnalytics: () => {
        const { orders, users } = get()
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
        const totalOrders = orders.length
        const totalUsers = users.length

        set((state) => ({
          analytics: {
            ...state.analytics,
            totalRevenue,
            totalOrders,
            totalUsers,
            averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
          },
        }))
      },
    }),
    {
      name: "admin-store",
      partialize: (state) => ({
        products: state.products,
        orders: state.orders,
        users: state.users,
        pageContents: state.pageContents,
        siteSettings: state.siteSettings,
      }),
    },
  ),
)
