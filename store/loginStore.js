import { create } from "zustand";

export const useUserStore = create((set) => ({
    isLoggedIn: true,
    user: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/default-avatar.png", // could be a URL to a profile picture
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
}));
