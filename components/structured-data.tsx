"use client"

import { useEffect } from "react"

interface StructuredDataProps {
  type: "Product" | "Organization" | "WebSite" | "BreadcrumbList"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    let structuredData: any = {}

    switch (type) {
      case "Product":
        structuredData = {
          "@context": "https://schema.org/",
          "@type": "Product",
          name: data.name,
          description: data.description,
          image: data.image,
          brand: {
            "@type": "Brand",
            name: data.brand,
          },
          category: data.category,
          offers: {
            "@type": "Offer",
            url: `https://nuclearvisionglobal.com/product/${data.id}`,
            priceCurrency: "NGN",
            price: data.price,
            availability: data.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            seller: {
              "@type": "Organization",
              name: "Nuclear Vision Global Limited",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: data.rating,
            reviewCount: data.reviews,
          },
          sku: data.sku,
          gtin: data.gtin,
        }
        break

      case "Organization":
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Nuclear Vision Global Limited",
          url: "https://nuclearvisionglobal.com",
          logo: "https://nuclearvisionglobal.com/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+234-703-016-7577",
            contactType: "customer service",
            areaServed: "NG",
            availableLanguage: "English",
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "NG",
            addressRegion: "Lagos",
          },
          sameAs: [
            "https://facebook.com/nuclearvisionglobal",
            "https://twitter.com/nuclearvision",
            "https://instagram.com/nuclearvisionglobal",
          ],
        }
        break

      case "WebSite":
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Nuclear Vision Global Limited",
          url: "https://nuclearvisionglobal.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://nuclearvisionglobal.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }
        break
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [type, data])

  return null
}
