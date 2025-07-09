import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/home")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-orange-500">{"Let's confirm you are human"}</h1>

            <p className="text-sm text-gray-600 leading-relaxed">
              Complete the security check before continuing. This step verifies that you are not a bot, which helps to
              protect your account and prevent spam.
            </p>
          </div>

          <Link href="/home">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg">
              Begin {">"}
            </Button>
          </Link>

          <div className="pt-4">
            <Select defaultValue="english">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="german">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
