"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useUserStore } from "@/store/loginStore";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login, user } = useUserStore();

  const dummyUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    enrolledTutorials: [1, 3],
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, user, router]);

  const handleLogin = () => {
    login(dummyUser);
    router.push("/dashboard"); // redirect after login
  };

  if (isLoggedIn) return null; // avoids flashing login page while redirecting

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl glass shadow-xl flex flex-col items-center text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">Welcome Back!</h1>
        <p className="text-[var(--muted)] mb-8">
          Login with your Google account to continue learning
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px var(--accent)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium shadow-md transition"
        >
          <FcGoogle size={24} /> Login with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
