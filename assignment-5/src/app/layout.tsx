'use client'

import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import Header from '../components/common/header'
import './globals.css'
import './toggle.css'
import BookProvider from '../contexts/BookContext'
import AuthProvider from '../contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[var(--color-background)] text-[var(--color-text)]`}
      >
        <Toaster position="top-right" />
        <AuthProvider>
          <Header />
          <BookProvider>{children}</BookProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
