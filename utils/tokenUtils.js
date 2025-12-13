// utils/tokenUtils.js
import { useUserStore } from '@/store/loginStore';
import Cookies from 'js-cookie'; // Install: npm install js-cookie

export const TokenService = {
  // Validate access token (basic check - you should verify with your backend)
  isAccessTokenValid: async (accessToken) => {
    if (!accessToken) return false;
    
    // Option 1: Simple JWT expiration check (if it's a JWT)
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch (error) {
      // Not a JWT or invalid format, check with backend
      return await TokenService.verifyTokenWithBackend(accessToken);
    }
  },

  // Verify token with backend
  verifyTokenWithBackend: async (accessToken) => {
    try {
      const response = await fetch('/api/auth/verify-token', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Refresh access token using refresh token
  refreshAccessToken: async () => {
    try {
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      // Store the new access token
      localStorage.setItem('accessToken', data.accessToken);
      
      // Update Zustand store
      return data.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },

  // Clear all tokens
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    Cookies.remove('refreshToken');
  },

  // Get access token from various sources
  getAccessToken: () => {
    // Check localStorage first
    const token = useUserStore.getState().accessToken || localStorage.getItem('accessToken');
    
    return token;
  }
};