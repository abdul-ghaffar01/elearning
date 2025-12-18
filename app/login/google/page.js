'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/loginStore'

const Page = () => {
  const router = useRouter()
  const { setUser, updateUser } = useUserStore()
  const { setAccessToken } = useUserStore()

  useEffect(() => {
    // Function to extract access token from URL
    const handleGoogleLoginCallback = () => {
      // Get the URL search parameters
      const params = new URLSearchParams(window.location.search)
      const accessToken = params.get('accessToken')
      
      if (accessToken) {
        console.log('Access token received:', accessToken)
        
        setAccessToken(accessToken)
        // Clear the token from URL for security
        const newUrl = window.location.pathname
        window.history.replaceState({}, '', newUrl)
        
        fetchUserData(accessToken) // Optionally fetch user data
        // Redirect to dashboard
        router.push('/u/dashboard')
      } else {
        console.log('No access token found in URL')
        router.push('/login') // Redirect to login on failure
      }
    }

    handleGoogleLoginCallback()
  }, [router, updateUser])

  // If you want to handle the API call to get user data with the token:
  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/verify-google-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      
      if (response.ok) {
        const userData = await response.json()
        // Update Zustand store with actual user data from backend
        setUser({
          ...userData,
          accessToken: token, // Store token if needed
        })
      } else {
        console.error('Failed to verify token')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <div>Processing Google login...</div>
        <div className="text-sm text-gray-500 mt-2">
          Please wait while we authenticate your account
        </div>
      </div>
    </div>
  )
}

export default Page