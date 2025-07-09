import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchResults } from "@/components/search-results"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchResults query={searchParams.q || ""} />
      </main>
      <Footer />
    </div>
  )
}
