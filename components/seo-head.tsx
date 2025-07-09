import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  price?: number
  currency?: string
  availability?: string
  brand?: string
  category?: string
}

export function SEOHead({
  title = "Nuclear Vision Global Limited - Premium Electronics Store in Nigeria",
  description = "Nigeria's leading electronics retailer offering smartphones, laptops, audio equipment, tablets, gaming consoles and more with nationwide delivery. Best prices guaranteed.",
  keywords = "electronics Nigeria, smartphones Lagos, laptops Abuja, audio equipment, tablets, gaming consoles, Nuclear Vision Global, electronics store Nigeria, buy electronics online Nigeria",
  image = "/images/hero-laptop.jpg",
  url = "https://nuclearvisionglobal.com",
  type = "website",
  price,
  currency = "NGN",
  availability = "in stock",
  brand,
  category,
}: SEOHeadProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "product" ? "Product" : "Organization",
    name: title,
    description,
    image,
    url,
    ...(type === "product" &&
      price && {
        offers: {
          "@type": "Offer",
          price: price.toString(),
          priceCurrency: currency,
          availability: `https://schema.org/${availability === "in stock" ? "InStock" : "OutOfStock"}`,
          seller: {
            "@type": "Organization",
            name: "Nuclear Vision Global Limited",
          },
        },
        brand: {
          "@type": "Brand",
          name: brand,
        },
        category,
      }),
    ...(type === "website" && {
      "@type": "Organization",
      name: "Nuclear Vision Global Limited",
      alternateName: "Nuclear Vision",
      url: "https://nuclearvisionglobal.com",
      logo: "https://nuclearvisionglobal.com/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234-703-016-7577",
        contactType: "customer service",
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
    }),
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nuclear Vision Global Limited" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Geo Tags */}
      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Nigeria" />
      <meta name="geo.position" content="6.5244;3.3792" />
      <meta name="ICBM" content="6.5244, 3.3792" />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Nuclear Vision Global Limited" />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@nuclearvision" />

      {/* Product Specific Tags */}
      {type === "product" && price && (
        <>
          <meta property="product:price:amount" content={price.toString()} />
          <meta property="product:price:currency" content={currency} />
          <meta property="product:availability" content={availability} />
          {brand && <meta property="product:brand" content={brand} />}
          {category && <meta property="product:category" content={category} />}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </Head>
  )
}
