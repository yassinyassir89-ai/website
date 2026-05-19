import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grow Beauty',
  description: 'Grow Beauty — Luxury cosmetics',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
