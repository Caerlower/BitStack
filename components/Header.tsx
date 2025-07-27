'use client'

import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export function Header() {
  const { isConnected } = useAccount()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🐦</span>
              <h1 className="text-xl font-bold text-bitcoin-600">BitStack</h1>
            </div>
            
            {isConnected && (
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                <a href="#" className="text-gray-600 hover:text-bitcoin-600 font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-600 hover:text-bitcoin-600 font-medium">
                  Explore
                </a>
                <a href="#" className="text-gray-600 hover:text-bitcoin-600 font-medium">
                  Leaderboard
                </a>
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Connected to Citrea Testnet</span>
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
} 