import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { getProductById } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)

  if (!product) {
    return {
      title: "Product Not Found | Nuclear Vision Global Limited",
    }
  }

  return {
    title: `${product.name} - ${formatPrice(product.price)} | Nuclear Vision Global Limited`,
    description: `Buy ${product.name} by ${product.brand} for ${formatPrice(product.price)} in Nigeria. ${product.description} Free delivery available. Best prices guaranteed.`,
    keywords: [
      product.name,
      product.brand,
      product.category,
      `${product.name} Nigeria`,
      `${product.brand} ${product.category}`,
      `buy ${product.name} online`,
      `${product.name} price Nigeria`,
      `${product.name} Lagos`,
      `${product.name} Abuja`,
    ],
    openGraph: {
      title: `${product.name} - ${formatPrice(product.price)}`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${formatPrice(product.price)}`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://nuclearvisionglobal.com/product/${product.id}`,
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        <RelatedProducts currentProductId={productId} />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
