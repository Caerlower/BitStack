const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("🚀 Deploying BitStack contracts to Citrea testnet...");

  // Deploy StackerScore first
  console.log("📊 Deploying StackerScore contract...");
  const StackerScore = await hre.ethers.getContractFactory("StackerScore");
  const stackerScore = await StackerScore.deploy();
  await stackerScore.waitForDeployment();
  const stackerScoreAddress = await stackerScore.getAddress();
  console.log("✅ StackerScore deployed to:", stackerScoreAddress);

  // Deploy PostFeed
  console.log("📝 Deploying PostFeed contract...");
  const PostFeed = await hre.ethers.getContractFactory("PostFeed");
  const postFeed = await PostFeed.deploy();
  await postFeed.waitForDeployment();
  const postFeedAddress = await postFeed.getAddress();
  console.log("✅ PostFeed deployed to:", postFeedAddress);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    stackerScore: stackerScoreAddress,
    postFeed: postFeedAddress,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    'deployment.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("📄 Deployment info saved to deployment.json");

  // Update .env.local with contract addresses
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  } else {
    envContent = `# WalletConnect Project ID (optional - for mobile wallet support - get from https://cloud.walletconnect.com/)
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
  }

  // Update contract addresses
  envContent = envContent.replace(
    /NEXT_PUBLIC_POST_FEED_ADDRESS=.*/,
    `NEXT_PUBLIC_POST_FEED_ADDRESS=${postFeedAddress}`
  );
  envContent = envContent.replace(
    /NEXT_PUBLIC_STACKER_SCORE_ADDRESS=.*/,
    `NEXT_PUBLIC_STACKER_SCORE_ADDRESS=${stackerScoreAddress}`
  );

  fs.writeFileSync(envPath, envContent);
  console.log("📄 Updated .env.local with contract addresses");

  console.log("\n🎉 Deployment complete!");
  console.log("📊 StackerScore:", stackerScoreAddress);
  console.log("📝 PostFeed:", postFeedAddress);
  console.log("\n🔗 Citrea Testnet Explorer: https://explorer.testnet.citrea.xyz");
  console.log("💰 Faucet: https://citrea.xyz/faucet");
  console.log("\n🔄 Restart your development server to use the new contracts!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 