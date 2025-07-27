import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BitStack - Bitcoin-Native Social Layer',
  description: 'A decentralized Twitter-style app where your Bitcoin stack fuels your voice. Built on Citrea zkEVM.',
  keywords: ['Bitcoin', 'Social', 'DeFi', 'Citrea', 'zkEVM', 'Blockchain'],
  authors: [{ name: 'BitStack Team' }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'BitStack - Bitcoin-Native Social Layer',
    description: 'A decentralized Twitter-style app where your Bitcoin stack fuels your voice.',
    type: 'website',
    url: 'https://bitstack.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BitStack - Bitcoin-Native Social Layer',
    description: 'A decentralized Twitter-style app where your Bitcoin stack fuels your voice.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 