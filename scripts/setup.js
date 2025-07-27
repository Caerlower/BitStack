#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up BitStack...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# WalletConnect Project ID (optional - for mobile wallet support - get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Private key for contract deployment (optional - for testing)
PRIVATE_KEY=your_private_key_here

# Citrea Testnet Configuration
NEXT_PUBLIC_CITREA_CHAIN_ID=5115
NEXT_PUBLIC_CITREA_RPC_URL=https://rpc.testnet.citrea.xyz
NEXT_PUBLIC_CITREA_EXPLORER=https://explorer.testnet.citrea.xyz

# Contract Addresses (will be populated after deployment)
NEXT_PUBLIC_POST_FEED_ADDRESS=
NEXT_PUBLIC_STACKER_SCORE_ADDRESS=
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully');
} else {
  console.log('✅ .env.local already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Installing dependencies...');
  console.log('Run: npm install');
} else {
  console.log('\n✅ Dependencies already installed');
}

console.log('\n🎯 Next steps:');
console.log('1. Get a WalletConnect Project ID from https://cloud.walletconnect.com/ (optional - for mobile wallet support)');
console.log('2. Update .env.local with your Project ID');
console.log('3. Run: npm run compile');
console.log('4. Run: npm run dev');
console.log('5. Open http://localhost:3000');
console.log('\n🔗 Useful links:');
console.log('- Citrea Faucet: https://citrea.xyz/faucet');
console.log('- Citrea Explorer: https://explorer.testnet.citrea.xyz');
console.log('- Citrea Docs: https://docs.citrea.xyz');
console.log('\n�� Happy Stacking!'); 