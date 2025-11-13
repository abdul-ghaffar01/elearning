"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Detect system theme (auto dark/light)
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b border-[rgba(255,255,255,0.1)] backdrop-blur-md"
      style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--foreground)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold"
          style={{ color: "var(--accent)" }}
        >
          eLearn
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="hover:text-[var(--accent)] transition">
            Home
          </Link>
          <Link
            href="/tutorials"
            className="hover:text-[var(--accent)] transition"
          >
            Tutorials
          </Link>
          <Link href="/about" className="hover:text-[var(--accent)] transition">
            About
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg font-medium text-white transition"
            style={{
              backgroundColor: "var(--accent)",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--accent-hover)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--accent)")
            }
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          style={{ color: "var(--foreground)" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pb-4 pt-2 space-y-4 shadow-lg rounded-b-lg"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--foreground)",
            }}
          >
            <Link
              href="/"
              className="block hover:text-[var(--accent)] transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tutorials"
              className="block hover:text-[var(--accent)] transition"
              onClick={() => setMenuOpen(false)}
            >
              Tutorials
            </Link>
            <Link
              href="/about"
              className="block hover:text-[var(--accent)] transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/login"
              className="block text-center py-2 rounded-lg text-white transition"
              style={{ backgroundColor: "var(--accent)" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "var(--accent)")
              }
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
