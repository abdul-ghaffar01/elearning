"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useUserStore } from "@/store/loginStore";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/u/dashboard");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl glass shadow-xl flex flex-col items-center text-center"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">
            Welcome!
          </h1>
          <p className="text-[var(--muted)]">
            Sign in to continue to your learning journey
          </p>
        </div>

        <div className="w-full space-y-4">
          {/* Google Login Button */}
          <GoogleLoginButton />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--background)] text-[var(--muted)]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email Login Button */}
          <EmailLoginButton />
        </div>

        <div className="mt-8 text-sm text-[var(--muted)]">
          <p>
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-[var(--accent)] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[var(--accent)] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function GoogleLoginButton() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth flow
      router.push(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/google-login`);
      console.log("Google login successful:", data);
      
      // For demo - redirect to role selection
      router.push("/u/profile-setup");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--accent)] transition-all"
    >
      <FcGoogle size={22} />
      <span>Continue with Google</span>
    </motion.button>
  );
}

function EmailLoginButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push("/login/email")}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--accent)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <MdEmail size={22} />
      <span>Continue with Email</span>
    </motion.button>
  );
}