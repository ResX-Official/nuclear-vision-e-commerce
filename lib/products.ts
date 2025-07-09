export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  rating: number
  reviews: number
  category: string
  brand: string
  description: string
  features: string[]
  specifications: Record<string, string>
  isOnSale?: boolean
  badge?: string
  inStock: boolean
  stockCount: number
  isNew?: boolean
  isTrending?: boolean
  freeShipping?: boolean
  fastDelivery?: boolean
  warranty: string
  returnPolicy: string
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const products: Product[] = [
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
      "The most powerful Galaxy smartphone yet, featuring the revolutionary S Pen, advanced AI photography, and all-day battery life. Perfect for professionals and content creators.",
    features: [
      "6.8-inch Dynamic AMOLED 2X display with 120Hz",
      "200MP main camera with 100x Space Zoom",
      "Built-in S Pen with Air Actions",
      "Snapdragon 8 Gen 3 processor",
      "5000mAh battery with 45W fast charging",
      "IP68 water and dust resistance",
      "Samsung DeX desktop experience",
      "One UI 6.1 with 7 years of updates",
    ],
    specifications: {
      Display: "6.8-inch Dynamic AMOLED 2X, 3120 x 1440",
      Processor: "Snapdragon 8 Gen 3",
      RAM: "12GB",
      Storage: "256GB",
      Camera: "200MP + 50MP + 12MP + 10MP",
      Battery: "5000mAh",
      OS: "Android 14 with One UI 6.1",
      Connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
      Dimensions: "162.3 x 79.0 x 8.6 mm",
      Weight: "232g",
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
      "USB-C with USB 3 support",
      "Titanium design with Ceramic Shield",
      "Up to 29 hours video playback",
      "iOS 17 with regular updates",
    ],
    specifications: {
      Display: "6.7-inch Super Retina XDR OLED",
      Processor: "A17 Pro chip",
      RAM: "8GB",
      Storage: "256GB",
      Camera: "48MP + 12MP + 12MP",
      Battery: "4441mAh",
      OS: "iOS 17",
      Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
      Dimensions: "159.9 x 76.7 x 8.25 mm",
      Weight: "221g",
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
  {
    id: 3,
    name: "Dell XPS 13 Plus Intel Core i7",
    price: 1650000,
    originalPrice: 1850000,
    image: "/images/dell-xps-13-plus.jpg",
    images: [
      "/images/dell-xps-13-plus.jpg",
      "/images/dell-xps-13-plus-2.jpg",
      "/images/dell-xps-13-plus-3.jpg",
      "/images/dell-xps-13-plus-4.jpg",
    ],
    rating: 4.6,
    reviews: 1892,
    category: "Laptops",
    brand: "Dell",
    description:
      "Ultra-premium laptop with stunning 13.4-inch OLED display, latest Intel processors, and sleek minimalist design perfect for professionals.",
    features: [
      "13.4-inch 3.5K OLED InfinityEdge display",
      "12th Gen Intel Core i7-1280P processor",
      "16GB LPDDR5 RAM",
      "512GB PCIe NVMe SSD",
      "Intel Iris Xe graphics",
      "Capacitive function row",
      "Premium aluminum construction",
      "Windows 11 Pro",
    ],
    specifications: {
      Display: "13.4-inch 3.5K OLED (3456 x 2160)",
      Processor: "Intel Core i7-1280P",
      RAM: "16GB LPDDR5",
      Storage: "512GB SSD",
      Graphics: "Intel Iris Xe",
      Battery: "55Wh, up to 12 hours",
      OS: "Windows 11 Pro",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.2",
      Ports: "2x Thunderbolt 4",
      Weight: "1.26kg",
    },
    isOnSale: true,
    inStock: true,
    stockCount: 12,
    freeShipping: true,
    fastDelivery: true,
    warranty: "2 Year Warranty",
    returnPolicy: "30-Day Returns",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 485000,
    originalPrice: 550000,
    image: "/images/sony-wh1000xm5.jpg",
    images: [
      "/images/sony-wh1000xm5.jpg",
      "/images/sony-wh1000xm5-2.jpg",
      "/images/sony-wh1000xm5-3.jpg",
      "/images/sony-wh1000xm5-4.jpg",
    ],
    rating: 4.7,
    reviews: 4156,
    category: "Audio",
    brand: "Sony",
    description:
      "Industry-leading noise canceling headphones with exceptional sound quality, all-day comfort, and crystal-clear call quality.",
    features: [
      "Industry-leading noise canceling technology",
      "30-hour battery life with quick charge",
      "Speak-to-Chat technology",
      "Multipoint Bluetooth connection",
      "Touch sensor controls",
      "360 Reality Audio support",
      "Adaptive Sound Control",
      "Premium comfort design",
    ],
    specifications: {
      Driver: "30mm dynamic drivers",
      "Frequency Response": "4Hz - 40kHz",
      "Battery Life": "30 hours (ANC on)",
      Charging: "USB-C, 3 min = 3 hours playback",
      Connectivity: "Bluetooth 5.2, NFC",
      Weight: "250g",
      Microphone: "Beamforming + dual noise sensor",
      "Codec Support": "LDAC, AAC, SBC",
    },
    isOnSale: true,
    badge: "Best Seller",
    inStock: true,
    stockCount: 25,
    isTrending: true,
    freeShipping: true,
    warranty: "2 Year Warranty",
    returnPolicy: "30-Day Returns",
  },
  {
    id: 5,
    name: "iPad Pro 12.9-inch M2 256GB",
    price: 1450000,
    originalPrice: 1650000,
    image: "/images/ipad-pro-129.jpg",
    images: [
      "/images/ipad-pro-129.jpg",
      "/images/ipad-pro-129-2.jpg",
      "/images/ipad-pro-129-3.jpg",
      "/images/ipad-pro-129-4.jpg",
    ],
    rating: 4.8,
    reviews: 2341,
    category: "Tablets",
    brand: "Apple",
    description:
      "The ultimate iPad experience with M2 chip performance, stunning Liquid Retina XDR display, and all-day battery life.",
    features: [
      "12.9-inch Liquid Retina XDR display",
      "M2 chip with 8-core CPU and 10-core GPU",
      "12MP Wide and 10MP Ultra Wide cameras",
      "12MP TrueDepth front camera",
      "Apple Pencil (2nd generation) support",
      "Magic Keyboard compatibility",
      "5G cellular connectivity available",
      "All-day battery life",
    ],
    specifications: {
      Display: "12.9-inch Liquid Retina XDR",
      Processor: "Apple M2 chip",
      RAM: "8GB",
      Storage: "256GB",
      Camera: "12MP + 10MP + LiDAR",
      Battery: "Up to 10 hours",
      OS: "iPadOS 17",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3",
      Dimensions: "280.6 x 214.9 x 6.4 mm",
      Weight: "682g",
    },
    isOnSale: true,
    inStock: true,
    stockCount: 18,
    isNew: true,
    freeShipping: true,
    fastDelivery: true,
    warranty: "1 Year Warranty",
    returnPolicy: "14-Day Returns",
  },
  {
    id: 6,
    name: "Apple Watch Series 9 GPS 45mm",
    price: 650000,
    originalPrice: 720000,
    image: "/images/apple-watch-s9.jpg",
    images: [
      "/images/apple-watch-s9.jpg",
      "/images/apple-watch-s9-2.jpg",
      "/images/apple-watch-s9-3.jpg",
      "/images/apple-watch-s9-4.jpg",
    ],
    rating: 4.6,
    reviews: 1876,
    category: "Wearables",
    brand: "Apple",
    description:
      "The most advanced Apple Watch yet with S9 chip, Double Tap gesture, and comprehensive health monitoring capabilities.",
    features: [
      "S9 SiP with 4-core Neural Engine",
      "Double Tap gesture control",
      "Always-On Retina display",
      "Blood Oxygen and ECG monitoring",
      "Sleep tracking and stages",
      "Crash Detection and Fall Detection",
      "Water resistant to 50 meters",
      "Up to 18 hours battery life",
    ],
    specifications: {
      Display: "45mm Always-On Retina LTPO OLED",
      Processor: "S9 SiP with Neural Engine",
      Storage: "64GB",
      Sensors: "Blood Oxygen, ECG, Accelerometer",
      Battery: "Up to 18 hours",
      OS: "watchOS 10",
      Connectivity: "Wi-Fi, Bluetooth 5.3",
      "Water Resistance": "50 meters",
      "Case Material": "Aluminum",
      Band: "Sport Band included",
    },
    isOnSale: true,
    badge: "Health Focus",
    inStock: true,
    stockCount: 22,
    isNew: true,
    freeShipping: true,
    warranty: "1 Year Warranty",
    returnPolicy: "14-Day Returns",
  },
  {
    id: 7,
    name: "PlayStation 5 Spider-Man 2 Bundle",
    price: 950000,
    originalPrice: 1100000,
    image: "/images/ps5-spiderman2.jpg",
    images: [
      "/images/ps5-spiderman2.jpg",
      "/images/ps5-spiderman2-2.jpg",
      "/images/ps5-spiderman2-3.jpg",
      "/images/ps5-spiderman2-4.jpg",
    ],
    rating: 4.9,
    reviews: 3247,
    category: "Gaming",
    brand: "Sony",
    description:
      "Next-generation gaming console with lightning-fast SSD, ray tracing, and 3D audio. Includes Marvel's Spider-Man 2 game.",
    features: [
      "Custom AMD Zen 2 CPU and RDNA 2 GPU",
      "Ultra-high speed SSD with 825GB storage",
      "Ray tracing and 4K gaming support",
      "3D audio with Tempest 3D AudioTech",
      "DualSense wireless controller included",
      "Marvel's Spider-Man 2 game included",
      "Backward compatibility with PS4 games",
      "8K output support",
    ],
    specifications: {
      CPU: "AMD Zen 2, 8 cores at 3.5GHz",
      GPU: "AMD RDNA 2, 10.28 TFLOPs",
      RAM: "16GB GDDR6",
      Storage: "825GB Custom SSD",
      "Optical Drive": "4K UHD Blu-ray",
      Audio: "Tempest 3D AudioTech",
      Connectivity: "Wi-Fi 6, Bluetooth 5.1, Ethernet",
      Ports: "USB-A, USB-C, HDMI 2.1",
      Dimensions: "390 x 104 x 260 mm",
      Weight: "4.5kg",
    },
    isOnSale: true,
    badge: "Bundle Deal",
    inStock: true,
    stockCount: 6,
    isTrending: true,
    freeShipping: true,
    fastDelivery: true,
    warranty: "1 Year Warranty",
    returnPolicy: "30-Day Returns",
  },
  {
    id: 8,
    name: "Canon EOS R6 Mark II Mirrorless Camera",
    price: 3200000,
    originalPrice: 3650000,
    image: "/images/canon-r6-mark2.jpg",
    images: [
      "/images/canon-r6-mark2.jpg",
      "/images/canon-r6-mark2-2.jpg",
      "/images/canon-r6-mark2-3.jpg",
      "/images/canon-r6-mark2-4.jpg",
    ],
    rating: 4.7,
    reviews: 892,
    category: "Cameras",
    brand: "Canon",
    description:
      "Professional full-frame mirrorless camera with 24.2MP sensor, advanced autofocus, and exceptional low-light performance.",
    features: [
      "24.2MP full-frame CMOS sensor",
      "DIGIC X image processor",
      "Dual Pixel CMOS AF II with 1,053 AF points",
      "In-body 5-axis image stabilization",
      "4K 60p video recording",
      "High-speed continuous shooting up to 12 fps",
      "Weather-sealed magnesium alloy body",
      "3.0-inch vari-angle touchscreen LCD",
    ],
    specifications: {
      Sensor: "24.2MP Full-Frame CMOS",
      Processor: "DIGIC X",
      "ISO Range": "100-102,400 (expandable)",
      Autofocus: "1,053-point Dual Pixel CMOS AF II",
      Video: "4K 60p, Full HD 180p",
      Stabilization: "In-body 5-axis IS",
      Display: "3.0-inch vari-angle touchscreen",
      Storage: "Dual SD card slots",
      Battery: "LP-E6NH, ~760 shots",
      Weight: "588g (body only)",
    },
    isOnSale: true,
    badge: "Professional",
    inStock: true,
    stockCount: 4,
    freeShipping: true,
    warranty: "2 Year Warranty",
    returnPolicy: "30-Day Returns",
  },
]

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm),
  )
}
