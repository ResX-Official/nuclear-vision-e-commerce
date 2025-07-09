"use client"

import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

interface RelatedProductsProps {
  currentProductId: number
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const currentProduct = products.find((p) => p.id === currentProductId)

  if (!currentProduct) return null

  // Get related products from the same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId && p.category === currentProduct.category)
    .slice(0, 4)

  if (relatedProducts.length === 0) return null

  return (
    <section className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Products</h2>
        <p className="text-lg text-gray-600">You might also like these products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
