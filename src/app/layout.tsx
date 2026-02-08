import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "BudgetTDB — Tableau de Bord du Budget Public Français",
  description:
    "Analyse interactive du budget de la France : recettes, dépenses, dette, comparaisons OCDE et simulateur de réallocation budgétaire.",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
