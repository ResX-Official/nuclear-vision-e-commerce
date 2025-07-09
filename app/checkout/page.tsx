import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>
        <CheckoutForm />
      </main>
      <Footer />
    </div>
  )
}
