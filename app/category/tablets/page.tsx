import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { CategoryPage } from "@/components/category-page"

export default function TabletsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryPage category="Tablets" />
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
