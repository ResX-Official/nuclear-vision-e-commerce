import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DealsPage } from "@/components/deals-page"

export default function DealsPageRoute() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <DealsPage />
      </main>
      <Footer />
    </div>
  )
}
