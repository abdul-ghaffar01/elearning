// components/ProtectedRoute.js
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/loginStore';
import { TokenService } from '@/utils/tokenUtils';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn, login, logout, setAccessToken } = useUserStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setIsCheckingAuth(true);
            
            // Get token from storage or URL
            let accessToken = TokenService.getAccessToken();
            
            if (!accessToken) {
                // No token at all, redirect to login
                logout();
                router.replace('/login');
                setIsCheckingAuth(false);
                return;
            }

            // Check if access token is valid
            const isValid = await TokenService.isAccessTokenValid(accessToken);
            
            if (isValid) {
                // Token is valid, ensure user is logged in
                if (!isLoggedIn) {
                    // Fetch user data here if needed
                    // const userData = await fetchUserData(accessToken);
                    // login(userData, accessToken);
                    setAccessToken(accessToken);
                }
                setIsCheckingAuth(false);
                return;
            }

            // Access token is invalid, try to refresh
            try {
                const newAccessToken = await TokenService.refreshAccessToken();
                setAccessToken(newAccessToken);
                setIsCheckingAuth(false);
            } catch (error) {
                // Refresh failed, clear tokens and redirect
                TokenService.clearTokens();
                logout();
                router.replace('/login');
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, [router, isLoggedIn, login, logout, setAccessToken]);

    // Show loading while checking authentication
    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <div>Checking authentication...</div>
                </div>
            </div>
        );
    }

    // If not logged in, show nothing (will redirect)
    if (!isLoggedIn) {
        return null;
    }

    // If logged in, render children
    return children;
}

export default ProtectedRoute;