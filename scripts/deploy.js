const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying BitStack contracts to Citrea testnet...");

  // Deploy StackerScore first
  console.log("📊 Deploying StackerScore contract...");
  const StackerScore = await hre.ethers.getContractFactory("StackerScore");
  const stackerScore = await StackerScore.deploy();
  await stackerScore.waitForDeployment();
  const stackerScoreAddress = await stackerScore.getAddress();
  console.log("✅ StackerScore deployed to:", stackerScoreAddress);

  // Deploy PostFeed with StackerScore integration
  console.log("📝 Deploying PostFeed contract...");
  const PostFeed = await hre.ethers.getContractFactory("PostFeed");
  const postFeed = await PostFeed.deploy();
  await postFeed.waitForDeployment();
  const postFeedAddress = await postFeed.getAddress();
  console.log("✅ PostFeed deployed to:", postFeedAddress);

  // Verify contracts on Citrea testnet
  console.log("🔍 Verifying contracts...");
  
  try {
    await hre.run("verify:verify", {
      address: stackerScoreAddress,
      constructorArguments: [],
    });
    console.log("✅ StackerScore verified");
  } catch (error) {
    console.log("⚠️ StackerScore verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: postFeedAddress,
      constructorArguments: [],
    });
    console.log("✅ PostFeed verified");
  } catch (error) {
    console.log("⚠️ PostFeed verification failed:", error.message);
  }

  console.log("\n🎉 Deployment complete!");
  console.log("📊 StackerScore:", stackerScoreAddress);
  console.log("📝 PostFeed:", postFeedAddress);
  console.log("\n🔗 Citrea Testnet Explorer: https://explorer.testnet.citrea.xyz");
  console.log("💰 Faucet: https://citrea.xyz/faucet");
  
  // Save deployment addresses to a file for frontend use
  const deploymentInfo = {
    network: hre.network.name,
    stackerScore: stackerScoreAddress,
    postFeed: postFeedAddress,
    timestamp: new Date().toISOString()
  };
  
  const fs = require('fs');
  fs.writeFileSync(
    'deployment.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("📄 Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 