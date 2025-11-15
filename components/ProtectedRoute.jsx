"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/loginStore';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn } = useUserStore();

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace('/login');
        }
    }, [isLoggedIn, router]);

    // If not logged in, show nothing (will redirect)
    if (!isLoggedIn) {
        return null;
    }

    // If logged in, render children
    return children;
}

export default ProtectedRoute;