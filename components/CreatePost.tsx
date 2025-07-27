'use client'

import React, { useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { Send } from 'lucide-react'
import { POST_FEED_ABI } from '../utils/contractABIs'

export function CreatePost() {
  const { address } = useAccount()
  const [message, setMessage] = useState('')
  const [charCount, setCharCount] = useState(0)
  const maxChars = 280

  // Contract configuration
  const contractAddress = process.env.NEXT_PUBLIC_POST_FEED_ADDRESS as `0x${string}`
  
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: POST_FEED_ABI,
    functionName: 'createPost',
    args: [message],
    enabled: message.trim().length > 0 && message.trim().length <= maxChars && !!contractAddress,
  })

  const { data, write, isLoading, error } = useContractWrite(config)

  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setMessage(value)
      setCharCount(value.length)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading || isConfirming) return

    if (!contractAddress) {
      alert('Contracts not deployed yet. Please deploy contracts first.')
      return
    }

    if (write) {
      write()
    }
  }

  // Reset form on success
  React.useEffect(() => {
    if (isSuccess) {
      setMessage('')
      setCharCount(0)
    }
  }, [isSuccess])

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-bitcoin-100 rounded-full flex items-center justify-center">
              <span className="text-bitcoin-600 font-semibold">
                {address ? address.slice(2, 4).toUpperCase() : '??'}
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="What's happening in the Bitcoin world? (max 280 characters)"
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-bitcoin-500 focus:border-transparent text-gray-900 bg-white"
              rows={3}
              disabled={isLoading || isConfirming}
            />
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${
                  charCount > maxChars * 0.8 ? 'text-orange-500' : 'text-gray-500'
                }`}>
                  {charCount}/{maxChars}
                </span>
              </div>
              
              <button
                type="submit"
                disabled={!message.trim() || isLoading || isConfirming || charCount > maxChars}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  message.trim() && !isLoading && !isConfirming && charCount <= maxChars
                    ? 'bg-bitcoin-500 text-white hover:bg-bitcoin-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading || isConfirming ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLoading ? 'Preparing...' : 'Posting...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
} 