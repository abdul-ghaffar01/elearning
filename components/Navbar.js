"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useUserStore } from "@/store/loginStore";
import dynamic from "next/dynamic";
const FiMoon = dynamic(() => import("react-icons/fi").then((mod) => mod.FiMoon), {
  ssr: false,
});
const FiSun = dynamic(() => import("react-icons/fi").then((mod) => mod.FiSun), {
  ssr: false,
});

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, login, logout } = useUserStore();

  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.style.setProperty("--background", "#f4f2f8");
      document.documentElement.style.setProperty("--foreground", "#1b1a1e");
      document.documentElement.style.setProperty(
        "--card-bg",
        "rgba(255, 255, 255, 0.6)"
      );
      setIsDark(false);
    } else {
      document.documentElement.style.setProperty("--background", "#141217");
      document.documentElement.style.setProperty("--foreground", "#e5e1f3");
      document.documentElement.style.setProperty(
        "--card-bg",
        "rgba(30, 28, 38, 0.6)"
      );
      setIsDark(true);
    }
  };

  return (
    <nav
      className="fixed top-0 h-[70px] left-0 w-full z-50 backdrop-blur-xl border-b border-[var(--border-color)] transition-colors duration-500"
      style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
          style={{ color: "var(--accent)" }}
        >
          <FiUser size={28} /> eLearn
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {["Home", "Tutorials", "About"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="hover-glow transition font-medium"
            >
              {link}
            </Link>
          ))}

          {/* Login / User */}
          {!isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => login({ name: "Demo User" })}
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-white shadow-md transition"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <FiLogIn /> Login
            </motion.button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent)] font-semibold">
                <FiUser /> {user?.name || "Learner"}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-white shadow-md transition"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <FiLogOut /> Logout
              </motion.button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          style={{ color: "var(--foreground)" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pb-4 pt-2 space-y-4 shadow-lg rounded-b-2xl"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)" }}
          >
            {["Home", "Tutorials", "About"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="block hover-glow transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </Link>
            ))}

            {!isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  login({ name: "Demo User" });
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-white shadow-md transition justify-center"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <FiLogIn /> Login
              </motion.button>
            ) : (
              <motion.div className="flex flex-col gap-2">
                <span className="text-[var(--accent)] font-semibold flex items-center gap-2">
                  <FiUser /> {user?.name || "Learner"}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-white shadow-md transition justify-center"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <FiLogOut /> Logout
                </motion.button>
              </motion.div>
            )}

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setMenuOpen(false);
              }}
              className="w-full py-2 rounded-lg border border-[var(--accent)] flex justify-center gap-2 hover:bg-[var(--accent)] hover:text-white transition-all"
            >
              {isDark ? <FiSun /> : <FiMoon />} {isDark ? "Light" : "Dark"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
