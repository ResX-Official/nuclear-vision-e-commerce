import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactPage } from "@/components/contact-page"

export default function ContactPageRoute() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </div>
  )
}
