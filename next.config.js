/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_CITREA_CHAIN_ID: '5115',
    NEXT_PUBLIC_CITREA_RPC_URL: 'https://rpc.testnet.citrea.xyz',
    NEXT_PUBLIC_CITREA_EXPLORER: 'https://explorer.testnet.citrea.xyz',
  },
}

module.exports = nextConfig 