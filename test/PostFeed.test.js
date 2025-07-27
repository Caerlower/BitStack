const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PostFeed", function () {
  let PostFeed;
  let postFeed;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    PostFeed = await ethers.getContractFactory("PostFeed");
    postFeed = await PostFeed.deploy();
  });

  describe("Post Creation", function () {
    it("Should create a post successfully", async function () {
      const message = "Hello Bitcoin world!";
      await postFeed.connect(addr1).createPost(message);
      
      const post = await postFeed.getPost(0);
      expect(post.author).to.equal(addr1.address);
      expect(post.message).to.equal(message);
      expect(post.tipAmount).to.equal(0);
      expect(post.tipCount).to.equal(0);
    });

    it("Should reject empty messages", async function () {
      await expect(
        postFeed.connect(addr1).createPost("")
      ).to.be.revertedWith("Message cannot be empty");
    });

    it("Should reject messages longer than 280 characters", async function () {
      const longMessage = "a".repeat(281);
      await expect(
        postFeed.connect(addr1).createPost(longMessage)
      ).to.be.revertedWith("Message too long (max 280 chars)");
    });
  });

  describe("Tipping", function () {
    beforeEach(async function () {
      await postFeed.connect(addr1).createPost("Test post");
    });

    it("Should allow tipping a post", async function () {
      const tipAmount = ethers.parseEther("0.01");
      const initialBalance = await ethers.provider.getBalance(addr1.address);
      
      await postFeed.connect(addr2).tipPost(0, { value: tipAmount });
      
      const post = await postFeed.getPost(0);
      expect(post.tipAmount).to.equal(tipAmount);
      expect(post.tipCount).to.equal(1);
      
      const finalBalance = await ethers.provider.getBalance(addr1.address);
      expect(finalBalance).to.equal(initialBalance + tipAmount);
    });

    it("Should reject tipping your own post", async function () {
      const tipAmount = ethers.parseEther("0.01");
      await expect(
        postFeed.connect(addr1).tipPost(0, { value: tipAmount })
      ).to.be.revertedWith("Cannot tip your own post");
    });

    it("Should reject zero amount tips", async function () {
      await expect(
        postFeed.connect(addr2).tipPost(0, { value: 0 })
      ).to.be.revertedWith("Tip amount must be greater than 0");
    });
  });

  describe("Post Retrieval", function () {
    it("Should get recent posts", async function () {
      await postFeed.connect(addr1).createPost("Post 1");
      await postFeed.connect(addr2).createPost("Post 2");
      
      const recentPosts = await postFeed.getRecentPosts();
      expect(recentPosts.length).to.equal(2);
      expect(recentPosts[0]).to.equal(1); // Most recent first
      expect(recentPosts[1]).to.equal(0);
    });

    it("Should get user posts", async function () {
      await postFeed.connect(addr1).createPost("Post 1");
      await postFeed.connect(addr1).createPost("Post 2");
      await postFeed.connect(addr2).createPost("Post 3");
      
      const userPosts = await postFeed.getUserPosts(addr1.address);
      expect(userPosts.length).to.equal(2);
      expect(userPosts[0]).to.equal(0);
      expect(userPosts[1]).to.equal(1);
    });
  });
}); 