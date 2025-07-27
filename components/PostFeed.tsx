'use client'

import React, { useState, useEffect } from 'react'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { Heart, MessageCircle, Zap, ExternalLink } from 'lucide-react'
import { POST_FEED_ABI } from '../utils/contractABIs'

interface Post {
  id: number
  author: string
  message: string
  timestamp: number
  tipAmount: number
  tipCount: number
}

export function PostFeed() {
  const { address } = useAccount()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [tipping, setTipping] = useState<number | null>(null)

  const contractAddress = process.env.NEXT_PUBLIC_POST_FEED_ADDRESS as `0x${string}`

  // Read total posts count
  const { data: totalPosts } = useContractRead({
    address: contractAddress,
    abi: POST_FEED_ABI,
    functionName: 'totalPosts',
    watch: true,
    enabled: !!contractAddress,
  })

  // Read recent posts
  const { data: recentPostIds } = useContractRead({
    address: contractAddress,
    abi: POST_FEED_ABI,
    functionName: 'getRecentPosts',
    watch: true,
    enabled: !!contractAddress,
  })

  // Fetch individual posts
  useEffect(() => {
    if (recentPostIds && recentPostIds.length > 0) {
      const fetchPosts = async () => {
        const fetchedPosts: Post[] = []
        
        for (const postId of recentPostIds) {
          try {
            // This would need to be implemented with proper contract calls
            // For now, we'll use mock data but structure it for real integration
            const mockPost: Post = {
              id: Number(postId),
              author: `0x${postId.toString().padStart(40, '0')}`,
              message: `Post #${postId} on Citrea testnet! 🐦`,
              timestamp: Date.now() - (Number(postId) * 3600000),
              tipAmount: Number(postId) * 0.01,
              tipCount: Number(postId) % 5 + 1
            }
            fetchedPosts.push(mockPost)
          } catch (error) {
            console.error(`Error fetching post ${postId}:`, error)
          }
        }
        
        setPosts(fetchedPosts)
        setLoading(false)
      }
      
      fetchPosts()
    } else {
      setLoading(false)
    }
  }, [recentPostIds])

  const handleTip = async (postId: number) => {
    if (!address) return
    
    setTipping(postId)
    
    try {
      // TODO: Implement contract interaction
      console.log('Tipping post:', postId)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, tipAmount: post.tipAmount + 0.01, tipCount: post.tipCount + 1 }
          : post
      ))
    } catch (error) {
      console.error('Error tipping post:', error)
    } finally {
      setTipping(null)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    
    if (diff < 60000) return 'just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return `${Math.floor(diff / 86400000)}d ago`
  }

  const formatAmount = (amount: number) => {
    return `${amount.toFixed(3)} tBTC`
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-bitcoin-100 rounded-full flex items-center justify-center">
                <span className="text-bitcoin-600 font-semibold">
                  {post.author.slice(2, 4).toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold text-gray-900">
                  {formatAddress(post.author)}
                </span>
                <span className="text-gray-500 text-sm">
                  {formatTime(post.timestamp)}
                </span>
                {post.author === address && (
                  <span className="text-xs bg-bitcoin-100 text-bitcoin-700 px-2 py-1 rounded-full">
                    You
                  </span>
                )}
              </div>
              
              <p className="text-gray-800 mb-4 leading-relaxed">
                {post.message}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-bitcoin-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Reply</span>
                  </button>
                  
                  <button 
                    onClick={() => handleTip(post.id)}
                    disabled={tipping === post.id || post.author === address}
                    className={`flex items-center space-x-2 transition-colors ${
                      tipping === post.id
                        ? 'text-gray-400 cursor-not-allowed'
                        : post.author === address
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-500 hover:text-bitcoin-600'
                    }`}
                  >
                    {tipping === post.id ? (
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Zap className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {tipping === post.id ? 'Tipping...' : `Tip (${post.tipCount})`}
                    </span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-mono">{formatAmount(post.tipAmount)}</span>
                  <span>•</span>
                  <span>{post.tipCount} tips</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
          <p className="text-gray-600">Be the first to share something about Bitcoin!</p>
        </div>
      )}
    </div>
  )
} 