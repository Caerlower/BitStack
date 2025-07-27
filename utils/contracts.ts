import { ethers } from 'ethers'

// Contract ABIs (simplified for demo)
export const POST_FEED_ABI = [
  'function createPost(string message) public',
  'function tipPost(uint256 postId) public payable',
  'function getPost(uint256 postId) public view returns (address author, string message, uint256 timestamp, uint256 tipAmount, uint256 tipCount)',
  'function getRecentPosts() public view returns (uint256[])',
  'function getUserPosts(address user) public view returns (uint256[])',
  'function totalPosts() public view returns (uint256)',
  'event PostCreated(address indexed author, uint256 indexed postId, string message, uint256 timestamp)',
  'event PostTipped(uint256 indexed postId, address indexed tipper, address indexed author, uint256 amount)'
]

export const STACKER_SCORE_ABI = [
  'function getUserScore(address user) public view returns (uint256 tipsSent, uint256 tipsReceived, uint256 totalScore, uint256 lastActivity, uint256 streakDays)',
  'function getScore(address user) public view returns (uint256)',
  'function getStreak(address user) public view returns (uint256)',
  'event ScoreUpdated(address indexed user, uint256 newScore, uint256 tipsSent, uint256 tipsReceived)',
  'event StreakUpdated(address indexed user, uint256 newStreak)'
]

// Contract addresses (will be populated after deployment)
export const CONTRACT_ADDRESSES = {
  POST_FEED: process.env.NEXT_PUBLIC_POST_FEED_ADDRESS || '',
  STACKER_SCORE: process.env.NEXT_PUBLIC_STACKER_SCORE_ADDRESS || ''
}

// Contract interaction utilities
export class ContractService {
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.JsonRpcSigner | null = null

  async connect() {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      this.provider = new ethers.BrowserProvider((window as any).ethereum)
      this.signer = await this.provider.getSigner()
    }
  }

  async createPost(message: string) {
    if (!this.signer || !CONTRACT_ADDRESSES.POST_FEED) {
      throw new Error('Wallet not connected or contract not deployed')
    }

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.POST_FEED,
      POST_FEED_ABI,
      this.signer
    )

    const tx = await contract.createPost(message)
    return await tx.wait()
  }

  async tipPost(postId: number, amount: string) {
    if (!this.signer || !CONTRACT_ADDRESSES.POST_FEED) {
      throw new Error('Wallet not connected or contract not deployed')
    }

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.POST_FEED,
      POST_FEED_ABI,
      this.signer
    )

    const tx = await contract.tipPost(postId, {
      value: ethers.parseEther(amount)
    })
    return await tx.wait()
  }

  async getPost(postId: number) {
    if (!this.provider || !CONTRACT_ADDRESSES.POST_FEED) {
      throw new Error('Provider not connected or contract not deployed')
    }

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.POST_FEED,
      POST_FEED_ABI,
      this.provider
    )

    return await contract.getPost(postId)
  }

  async getRecentPosts() {
    if (!this.provider || !CONTRACT_ADDRESSES.POST_FEED) {
      throw new Error('Provider not connected or contract not deployed')
    }

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.POST_FEED,
      POST_FEED_ABI,
      this.provider
    )

    return await contract.getRecentPosts()
  }

  async getUserScore(address: string) {
    if (!this.provider || !CONTRACT_ADDRESSES.STACKER_SCORE) {
      throw new Error('Provider not connected or contract not deployed')
    }

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.STACKER_SCORE,
      STACKER_SCORE_ABI,
      this.provider
    )

    return await contract.getUserScore(address)
  }
}

// Singleton instance
export const contractService = new ContractService() 