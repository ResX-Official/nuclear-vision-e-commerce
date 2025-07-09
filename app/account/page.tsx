import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountDashboard } from "@/components/account/account-dashboard"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AccountDashboard />
      </main>
      <Footer />
    </div>
  )
}
