# 🐦 BitStack – A Bitcoin-Native Social Layer Powered by Citrea zkEVM

> **"A decentralized Twitter-style app where your Bitcoin stack fuels your voice."**

---

## 🌍 Overview

**BitStack** is an early-stage idea for a decentralized social platform built on [Citrea](https://citrea.xyz), the first zkEVM rollup for Bitcoin.  
It reimagines Twitter with a Bitcoin-native twist — where users post updates, tip peers in BTC, and build onchain reputation through a **Stacker Score**.

---

## 🧠 Why This Matters

Despite Bitcoin’s dominance as a digital asset, it lacks a true **social-native platform**. BitStack aims to fix that by enabling:

- 📝 **Decentralized microblogging** for Bitcoin users  
- 💸 **Native BTC tipping & social recognition**  
- 🧮 **Reputation via Stacker Score**, based on meaningful interactions  
- 🧱 **zkEVM-powered privacy + smart contracts**, without altering Bitcoin L1  

---

## ✨ Key Features (Conceptual)

### ✅ MVP Scope (Hackathon-ready)
- Post messages (like tweets) stored onchain
- Tip others in testnet BTC using Citrea
- Stacker Score = total tips sent/received
- Wallet-based identity & interaction

### 🧩 Future Possibilities
- ZK-badges for stacking achievements
- Follower/following graph with privacy controls
- Leaderboards, social streaks, and shared goals
- Content + tipping analytics for influencers

---

## 🧱 Technical Direction

**BitStack** would be built on the **Citrea zkEVM testnet**, which allows full Solidity support with Bitcoin-based security.

| Layer | Stack |
|-------|-------|
| Smart Contracts | Solidity (zkEVM) |
| Frontend | React + Ethers.js |
| Wallet | Metamask / EVM Wallet (connected to Citrea) |
| Storage | Contract events (or later, IPFS) |
| Optional Backend | Node.js indexer (event-based) |

---

## 🧠 Smart Contract Concepts

1. **PostFeed.sol**  
   - Users can create short public posts  
   - Emits `PostCreated(address, message, timestamp)`  

2. **Tipping.sol**  
   - Allows wallet-to-wallet tips using mock BTC on Citrea  
   - Emits `Tipped(address from, address to, uint256 amount)`

3. **StackerScore.sol**  
   - Tracks stack-based actions and calculates a social score  
   - Score = (tips sent + tips received)

---

## 📌 Why Citrea?

Citrea brings **Ethereum-like programmability to Bitcoin**, with zero-knowledge privacy and scalability.  
BitStack is made possible only because:

- We can write smart contracts (thanks to zkEVM)
- We get Bitcoin security without changing Bitcoin’s base layer
- We can optionally protect user data/tips with ZK tools

---

## 📥 Submission (Planned for Hackathon)

As part of a future WaveHack or builder sprint, we plan to submit with:

- Project title & description (BitStack)
- GitHub repo (smart contracts + frontend scaffold)
- Demo video or wireframe walkthrough
- Description of how BitStack leverages Citrea infrastructure

---

## 🤝 Contributors

This project idea is being developed by Manav as part of the Citrea WaveHack initiative.  
Looking for collaborators, designers, and curious stackers to build the future of Bitcoin’s social layer.

---

## 📌 License (Upcoming)

This project will be open-sourced under the **MIT License** upon first working release.
