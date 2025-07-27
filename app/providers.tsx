'use client'

import React from 'react'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet, polygon } from 'wagmi/chains'
import { RainbowKitProvider, getDefaultWallets, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

// Define Citrea testnet chain
const citreaTestnet = {
  id: 5115,
  name: 'Citrea Testnet',
  network: 'citrea-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Testnet BTC',
    symbol: 'tBTC',
  },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.citrea.xyz'] },
    default: { http: ['https://rpc.testnet.citrea.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Citrea Explorer', url: 'https://explorer.testnet.citrea.xyz' },
  },
  testnet: true,
}

// Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    citreaTestnet,
    mainnet,
    polygon,
  ],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'BitStack',
  projectId: 'c4f79cc821944d9680842e34466bfbd9', // Demo project ID
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains}
        initialChain={citreaTestnet}
        showRecentTransactions={true}
        theme={lightTheme({
          accentColor: '#f7931a', // Bitcoin orange
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
} 