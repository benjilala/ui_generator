import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cloudbet UI Lab",
  description: "Design exploration lab for Cloudbet UI patterns — casino, sportsbook, VIP, and experiments.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("dark", inter.variable)} suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground min-h-screen">
        {children}
        <Toaster theme="dark" position="bottom-right" richColors={false} />
      </body>
    </html>
  )
}
