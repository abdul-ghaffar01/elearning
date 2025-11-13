import { create } from "zustand";

export const useUserStore = create((set) => ({
    isLoggedIn: false,
    user: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://i.pravatar.cc/150?img=3", // optional profile picture
        enrolledTutorials: [1, 3], // IDs of tutorials the user is enrolled in
    },

    login: (user) => set({ isLoggedIn: true, user }),
    logout: () => set({ isLoggedIn: false, user: null }),
}));
