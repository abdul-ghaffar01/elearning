import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set, get) => ({
            isLoggedIn: true,
            user: {
                name: "John Doe",
                email: "john.doe@example.com",
                avatar: "/default-avatar.png",
                role: "instructor", // or "student"
                enrolledTutorials: [
                    {
                        id: 1,
                        title: "Introduction to Databases",
                        totalLessons: 4,
                        completedLessons: 4,
                    },
                    {
                        id: 2,
                        title: "Advanced SQL Queries",
                        totalLessons: 6,
                        completedLessons: 3,
                    },
                    {
                        id: 3,
                        title: "NoSQL Databases",
                        totalLessons: 5,
                        completedLessons: 2,
                    },
                ],
                completedTutorials: [
                    {
                        id: 1,
                        title: "Introduction to Databases",
                    },
                ],
                totalEnrolled: 6,
            },

            login: (user) => set({ isLoggedIn: true, user }),
            logout: () => set({ isLoggedIn: false, user: null }),

            // Update user with new data (for role switching)
            updateUser: (updatedUserData) => set((state) => ({
                user: {
                    ...state.user,
                    ...updatedUserData
                }
            })),

            // Switch role function that updates the user
            switchRole: (newRole) => set((state) => ({
                user: {
                    ...state.user,
                    role: newRole
                }
            })),

            // Optional: Complete user replacement (for backend responses)
            setUser: (userData) => set({ user: userData }),
        }),
        {
            name: 'user-storage', // name for the persisted data
        }
    )
);