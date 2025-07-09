import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "Nuclear Vision Global Limited - Premium Electronics Store in Nigeria",
    template: "%s | Nuclear Vision Global Limited",
  },
  description:
    "Nigeria's leading electronics retailer offering smartphones, laptops, audio equipment, tablets, gaming consoles and more with nationwide delivery. Best prices guaranteed in Lagos, Abuja, Port Harcourt.",
  keywords: [
    "electronics Nigeria",
    "smartphones Lagos",
    "laptops Abuja",
    "audio equipment Nigeria",
    "tablets Nigeria",
    "gaming consoles",
    "Nuclear Vision Global",
    "electronics store Nigeria",
    "buy electronics online Nigeria",
    "iPhone Nigeria",
    "Samsung Nigeria",
    "MacBook Nigeria",
    "Dell laptops Nigeria",
    "Sony headphones Nigeria",
  ],
  authors: [{ name: "Nuclear Vision Global Limited", url: "https://nuclearvisionglobal.com" }],
  creator: "Nuclear Vision Global Limited",
  publisher: "Nuclear Vision Global Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://nuclearvisionglobal.com",
    title: "Nuclear Vision Global Limited - Premium Electronics Store in Nigeria",
    description:
      "Nigeria's leading electronics retailer offering smartphones, laptops, audio equipment, tablets, gaming consoles and more with nationwide delivery. Best prices guaranteed.",
    siteName: "Nuclear Vision Global Limited",
    images: [
      {
        url: "https://nuclearvisionglobal.com/images/hero-laptop.jpg",
        width: 1200,
        height: 630,
        alt: "Nuclear Vision Global Limited - Electronics Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuclear Vision Global Limited - Premium Electronics Store in Nigeria",
    description:
      "Nigeria's leading electronics retailer offering smartphones, laptops, audio equipment, tablets, gaming consoles and more with nationwide delivery.",
    images: ["https://nuclearvisionglobal.com/images/hero-laptop.jpg"],
    creator: "@nuclearvision",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://nuclearvisionglobal.com",
  },
  category: "Electronics Store",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://nuclearvisionglobal.com" />
        <meta name="google-site-verification" content="your-google-verification-code" />
      </head>
      <body className="font-inter antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
