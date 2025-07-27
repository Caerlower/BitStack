'use client'

import React from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { Trophy, Zap, TrendingUp, Calendar } from 'lucide-react'
import { STACKER_SCORE_ABI } from '../utils/contractABIs'

export function UserProfile() {
  const { address } = useAccount()

  const contractAddress = process.env.NEXT_PUBLIC_STACKER_SCORE_ADDRESS as `0x${string}`

  // Read user score from contract
  const { data: userScoreData } = useContractRead({
    address: contractAddress,
    abi: STACKER_SCORE_ABI,
    functionName: 'getUserScore',
    args: address ? [address] : undefined,
    enabled: !!address && !!contractAddress,
    watch: true,
  })

  // Mock user data (fallback)
  const userStats = {
    stackerScore: userScoreData ? Number(userScoreData[2]) : 1250, // totalScore
    tipsSent: userScoreData ? Number(userScoreData[0]) / 1e18 : 0.08, // tipsSent
    tipsReceived: userScoreData ? Number(userScoreData[1]) / 1e18 : 0.05, // tipsReceived
    streakDays: userScoreData ? Number(userScoreData[4]) : 7, // streakDays
    totalPosts: 12 // This would need to be fetched from PostFeed contract
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatAmount = (amount: number) => {
    return `${amount.toFixed(3)} tBTC`
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-bitcoin-600 font-bold text-xl">
            {address ? address.slice(2, 4).toUpperCase() : '??'}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          {address ? formatAddress(address) : 'Anonymous'}
        </h3>
        <p className="text-sm text-gray-500">BitStack User</p>
      </div>

      {/* Stacker Score */}
      <div className="bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 rounded-lg p-4 mb-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">Stacker Score</span>
          </div>
          <span className="text-2xl font-bold">{userStats.stackerScore}</span>
        </div>
        <div className="flex items-center space-x-1 text-bitcoin-100">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+150 this week</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 text-bitcoin-500" />
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {formatAmount(userStats.tipsSent)}
          </div>
          <div className="text-xs text-gray-500">Tips Sent</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 text-bitcoin-500" />
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {formatAmount(userStats.tipsReceived)}
          </div>
          <div className="text-xs text-gray-500">Tips Received</div>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-700">Streak</span>
        </div>
        <span className="text-lg font-bold text-orange-600">
          {userStats.streakDays} days
        </span>
      </div>

      {/* Quick Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total Posts</span>
          <span className="font-semibold text-gray-800">{userStats.totalPosts}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Network</span>
          <span className="font-mono text-xs bg-bitcoin-100 text-bitcoin-700 px-2 py-1 rounded">
            Citrea Testnet
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full bg-bitcoin-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-bitcoin-600 transition-colors mb-2">
          View Profile
        </button>
        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Settings
        </button>
      </div>
    </div>
  )
} 