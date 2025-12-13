import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      isLoggedIn: false, // Changed to false initially
      user: null,
      accessToken: undefined,

      login: (user, token) => set({ 
        isLoggedIn: true, 
        user,
        accessToken: token 
      }),
      
      logout: () => set({ 
        isLoggedIn: false, 
        user: null,
        accessToken: undefined 
      }),

      updateUser: (updatedUserData) => set((state) => ({
        user: state.user ? {
          ...state.user,
          ...updatedUserData
        } : null
      })),

      switchRole: (newRole) => set((state) => ({
        user: state.user ? {
          ...state.user,
          role: newRole
        } : null
      })),

      setUser: (userData) => set({ user: userData }),
      
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'user-storage',
      // Optional: exclude sensitive data from persistence
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        // Don't persist token if you want more security
        // accessToken: state.accessToken
      })
    }
  )
)