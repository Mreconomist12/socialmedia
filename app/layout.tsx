import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
// 1. Importamos el componente de autenticación
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TTFANS - Discover & Support Creators",
  description: "La plataforma que combina el descubrimiento de TikTok con la monetización de OnlyFans",
  generator: "TTFANS",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`font-sans antialiased overflow-hidden`}>
        {/* 2. Envolvemos la app para que la autenticación funcione en todas partes */}
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
