import type { Metadata } from "next"
import "./globals.css"

// What for: page metadata for SEO / browser tab (Server Component feature).
export const metadata: Metadata = {
  title: "Next.js Data Page",
  description: "Minimal App Router fetch demo for interview practice",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
