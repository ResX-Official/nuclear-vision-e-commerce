import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <OrderConfirmation />
      </main>
      <Footer />
    </div>
  )
}
