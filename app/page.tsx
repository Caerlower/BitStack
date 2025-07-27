'use client'

import React, { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { PostFeed } from '../components/PostFeed'
import { CreatePost } from '../components/CreatePost'
import { UserProfile } from '../components/UserProfile'
import { Header } from '../components/Header'

export default function Home() {
  const { isConnected, address } = useAccount()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-bitcoin-50 to-stack-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-bitcoin-600 mb-4">
                🐦 BitStack
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                A decentralized Twitter-style app where your Bitcoin stack fuels your voice.
                <br />
                Built on <span className="text-bitcoin-500 font-semibold">Citrea zkEVM</span>.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-bitcoin-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-6">
                Get started by connecting your wallet using RainbowKit
              </p>
              <ConnectButton />
              
              <div className="mt-6 p-4 bg-bitcoin-50 rounded-lg">
                <h3 className="font-semibold text-bitcoin-700 mb-2">🚀 Getting Started</h3>
                <ul className="text-sm text-bitcoin-600 space-y-1">
                  <li>• Click "Connect Wallet" to open RainbowKit</li>
                  <li>• Choose your preferred wallet (MetaMask, WalletConnect, etc.)</li>
                  <li>• RainbowKit will automatically switch to Citrea testnet</li>
                  <li>• Get testnet BTC from the <a href="https://citrea.xyz/faucet" target="_blank" rel="noopener noreferrer" className="underline">faucet</a></li>
                  <li>• Start posting and tipping!</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - User Profile */}
            <div className="lg:col-span-1">
              <UserProfile />
            </div>
            
            {/* Main Feed */}
            <div className="lg:col-span-2">
              <CreatePost />
              <PostFeed />
            </div>
            
            {/* Right Sidebar - Stats */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                {!process.env.NEXT_PUBLIC_POST_FEED_ADDRESS && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Contracts Not Deployed</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Deploy contracts to enable real on-chain functionality.
                    </p>
                    <button 
                      onClick={() => window.open('https://citrea.xyz/faucet', '_blank')}
                      className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                    >
                      Get Testnet BTC First
                    </button>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📊 Network Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Network</span>
                    <span className="font-mono text-sm bg-bitcoin-100 text-bitcoin-700 px-2 py-1 rounded">
                      Citrea Testnet
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Chain ID</span>
                    <span className="font-mono text-sm text-gray-900">5115</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Currency</span>
                    <span className="font-mono text-sm text-gray-900">tBTC</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">🔗 Useful Links</h4>
                  <div className="space-y-2">
                    <a 
                      href="https://citrea.xyz/faucet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-bitcoin-600 hover:text-bitcoin-700 underline"
                    >
                      🚰 Testnet Faucet
                    </a>
                    <a 
                      href="https://explorer.testnet.citrea.xyz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-bitcoin-600 hover:text-bitcoin-700 underline"
                    >
                      🔍 Block Explorer
                    </a>
                    <a 
                      href="https://docs.citrea.xyz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-sm text-bitcoin-600 hover:text-bitcoin-700 underline"
                    >
                      📚 Documentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 