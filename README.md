# 🐦 BitStack – A Bitcoin-Native Social Layer Powered by Citrea zkEVM

> **"A decentralized Twitter-style app where your Bitcoin stack fuels your voice."**

---

## 🌍 Overview

**BitStack** is a decentralized social platform built on [Citrea](https://citrea.xyz), the first zkEVM rollup for Bitcoin.  
It reimagines Twitter with a Bitcoin-native twist — where users post updates, tip peers in BTC, and build onchain reputation through a **Stacker Score**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or any EVM-compatible wallet
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bitstack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
       Edit `.env.local` and add your WalletConnect Project ID (optional):
    - Get one from [WalletConnect Cloud](https://cloud.walletconnect.com/) for mobile wallet support
    - The app works without it for browser wallets (MetaMask, Coinbase Wallet)
    - Add your private key for contract deployment (optional)

4. **Compile smart contracts**
   ```bash
   npm run compile
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧠 Features

### ✅ MVP Features
- **📝 Decentralized Posts**: Create and view posts stored on Citrea blockchain
- **💸 Native BTC Tipping**: Tip other users with testnet BTC
- **🧮 Stacker Score**: Reputation system based on tips sent/received
- **👛 Wallet Integration**: Connect with MetaMask or any EVM wallet
- **📊 User Profiles**: View your stats and activity

### 🧩 Future Features
- ZK-badges for stacking achievements
- Follower/following graph with privacy controls
- Leaderboards and social streaks
- Content analytics for influencers

---

## 🧱 Technical Stack

| Layer | Technology |
|-------|------------|
| **Smart Contracts** | Solidity (zkEVM) |
| **Frontend** | Next.js 14 + React 18 |
| **Styling** | Tailwind CSS |
| **Wallet** | RainbowKit (built on wagmi) |
| **Blockchain** | Citrea zkEVM Testnet |
| **Development** | Hardhat + TypeScript |

### 🌈 RainbowKit Features
- **Multi-wallet support**: MetaMask, WalletConnect, Coinbase Wallet, and more
- **Automatic network switching**: Seamlessly switch to Citrea testnet
- **Transaction history**: View recent transactions in the wallet modal
- **Custom theming**: Bitcoin-themed UI with orange accent colors
- **Mobile-friendly**: Optimized for mobile wallet connections

---

## 📁 Project Structure

```
bitstack/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Web3 providers
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── CreatePost.tsx     # Post creation form
│   ├── PostFeed.tsx       # Posts display
│   └── UserProfile.tsx    # User profile sidebar
├── contracts/             # Smart contracts
│   ├── PostFeed.sol       # Main posting contract
│   └── StackerScore.sol   # Reputation system
├── scripts/               # Deployment scripts
│   └── deploy.js          # Contract deployment
├── hardhat.config.js      # Hardhat configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS config
└── package.json           # Dependencies
```

---

## 🔧 Smart Contracts

### PostFeed.sol
- **Purpose**: Main contract for creating and managing posts
- **Key Functions**:
  - `createPost(string message)`: Create a new post (max 280 chars)
  - `tipPost(uint256 postId)`: Tip a post with BTC
  - `getPost(uint256 postId)`: Retrieve post data
  - `getRecentPosts()`: Get latest 50 posts

### StackerScore.sol
- **Purpose**: Track user reputation and activity
- **Key Functions**:
  - `updateScoreOnTip()`: Update scores when tips are sent
  - `calculateScore()`: Compute reputation score
  - `getUserScore()`: Get complete user stats
  - `updateStreak()`: Track daily activity streaks

---

## 🚀 Deployment

### Deploy to Citrea Testnet

1. **Get testnet BTC**
   - Visit [Citrea Faucet](https://citrea.xyz/faucet)
   - Request testnet BTC for your wallet

2. **Deploy contracts**
   ```bash
   npm run deploy
   ```

3. **Update environment variables**
   - Copy contract addresses from deployment output
   - Update `.env.local` with the new addresses

4. **Verify contracts** (optional)
   ```bash
   npx hardhat verify --network citrea-testnet <CONTRACT_ADDRESS>
   ```

---

## 🔗 Citrea Resources

- **📚 Documentation**: [docs.citrea.xyz](https://docs.citrea.xyz)
- **🚰 Testnet Faucet**: [citrea.xyz/faucet](https://citrea.xyz/faucet)
- **🔍 Block Explorer**: [explorer.testnet.citrea.xyz](https://explorer.testnet.citrea.xyz)
- **🌐 RPC Endpoint**: [rpc.testnet.citrea.xyz](https://rpc.testnet.citrea.xyz)
- **📖 Hackathon Guide**: [Citrea 101](https://www.notion.so/citrea/EthGlobal-Taipei-Citrea-Hacker-Survival-Guide-1c7c176f7c8080aa83abe35baca0c3f6)

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Local Development
```bash
# Start local Hardhat node
npx hardhat node

# Deploy to local network
npm run deploy:local

# Start frontend (in another terminal)
npm run dev
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Development Notes

### Wallet Setup
1. Install MetaMask or any EVM wallet
2. RainbowKit will automatically prompt you to add the Citrea testnet network
3. Alternatively, manually add Citrea testnet network:
   - **Network Name**: Citrea Testnet
   - **RPC URL**: https://rpc.testnet.citrea.xyz
   - **Chain ID**: 5115
   - **Currency Symbol**: tBTC

### Contract Integration
The frontend currently uses mock data. To integrate with real contracts:
1. Deploy contracts to Citrea testnet
2. Update contract addresses in environment variables
3. Implement contract calls in components using wagmi hooks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built for the Citrea WaveHack initiative
- Powered by Citrea zkEVM technology
- Inspired by the Bitcoin community's need for social infrastructure

---

## 📞 Support

- **Discord**: Join the Citrea community
- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: [docs.citrea.xyz](https://docs.citrea.xyz)

---

**Happy Stacking! 🐦⚡**
