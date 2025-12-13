"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MdArrowBack, MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Link from "next/link";

export default function EmailLoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful login, check profileSetup status
      // const user = await authService.emailLogin(formData);
      
      // For demo - redirect to setup or dashboard
      router.push("/u/profile-setup/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-md"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition"
        >
          <MdArrowBack size={20} />
          Back
        </button>

        <div className="p-8 rounded-3xl glass shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-[var(--muted)]">
              {isLogin ? "Sign in to your account" : "Start your learning journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full p-3 pl-12 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <span className="text-[var(--muted)]">👤</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-12 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  placeholder="you@example.com"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <MdEmail className="text-[var(--muted)]" size={20} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-12 pr-12 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  placeholder="Enter your password"
                  minLength={6}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <MdLock className="text-[var(--muted)]" size={20} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <MdVisibilityOff className="text-[var(--muted)]" size={20} />
                  ) : (
                    <MdVisibility className="text-[var(--muted)]" size={20} />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[var(--accent)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              {isLogin ? (
                <>Don't have an account? <span className="text-[var(--accent)] font-medium">Sign up</span></>
              ) : (
                <>Already have an account? <span className="text-[var(--accent)] font-medium">Sign in</span></>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}