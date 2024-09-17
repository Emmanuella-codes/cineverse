'use client'

import './globals.css'
import type { Metadata } from 'next'
import { inter } from './fonts'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import NavbarCmp from '@/components/NavbarCmp'
import { LoginNav } from '@/components/NavbarCmp'
import { usePathname } from 'next/navigation'
import { register } from 'swiper/element/bundle'
import StoreProvider from './StoreProvider'

export const metadata: Metadata = {
  title: 'Cineverse Movie App',
  description: 'Get latest movies'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  register()

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>Cineverse</title>
      </head>
      <body style={{ background: '#212121' }} className={inter.className}>
        <SessionProvider>
          <ChakraProvider>
            <NavbarCmp />
            <StoreProvider>{children}</StoreProvider>
          </ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
