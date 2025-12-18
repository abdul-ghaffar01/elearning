// store/loginStore.js
import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { TokenService } from '@/utils/tokenUtils';

export const useUserStore = create(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            user: null,
            accessToken: null,

            login: (user, token) => {
                if (token) {
                    localStorage.setItem('accessToken', token);
                }
                set({ isLoggedIn: true, user, accessToken: token });
            },
            
            logout: () => {
                TokenService.clearTokens();
                set({ isLoggedIn: false, user: null, accessToken: null });
            },

            // Check and validate token
            validateToken: async () => {
                const { accessToken } = get();
                if (!accessToken) return false;
                
                const isValid = await TokenService.isAccessTokenValid(accessToken);
                
                if (!isValid) {
                    try {
                        const newToken = await TokenService.refreshAccessToken();
                        set({ accessToken: newToken });
                        return true;
                    } catch (error) {
                        get().logout();
                        return false;
                    }
                }
                
                return true;
            },

            setAccessToken: (token) => {
                if (token) {
                    localStorage.setItem('accessToken', token);
                }
                set({ accessToken: token, isLoggedIn: true });
            },

            updateUser: (updatedUserData) => set((state) => ({
                user: state.user ? {
                    ...state.user,
                    ...updatedUserData
                } : null
            })),

            setUser: (userData) => set({ user: userData }),
        }),
        {
            name: 'user-storage',
            // Don't store access token in persisted state for security
            partialize: (state) => ({
                user: state.user,
                // accessToken is NOT persisted, will be loaded from localStorage
            })
        }
    )
);