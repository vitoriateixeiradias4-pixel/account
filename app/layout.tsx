import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Fruktur as Fraktur, Germania_One } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const germaniaOne = Germania_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-germania",
  display: "swap",
})

const fraktur = Fraktur({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fraktur",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Oktoberfest Blumenau 2025 | A maior festa alemã das Américas",
  description:
    "A 40ª Oktoberfest Blumenau ocorre de 8 a 26 de outubro. São 19 dias de festa que celebram a cultura e tradição germânica. Garante seus ingressos!",
  generator: "v0.app",
  keywords: "oktoberfest, blumenau, festa alemã, cerveja, chopp, ingressos, 2025",
  openGraph: {
    title: "Oktoberfest Blumenau 2025",
    description: "A maior festa alemã das Américas - 8 a 26 de outubro",
    images: ["/oktoberfest-hero-1.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${germaniaOne.variable} ${fraktur.variable}`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
