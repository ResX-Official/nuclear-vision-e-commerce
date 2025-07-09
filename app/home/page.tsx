import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryGrid } from "@/components/category-grid"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoryGrid />
        <NewsletterSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
