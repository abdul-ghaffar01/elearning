"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX, FiLogIn, FiLogOut, FiUser, FiSettings, FiRefreshCw } from "react-icons/fi";
import { useUserStore } from "@/store/loginStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const FiMoon = dynamic(() => import("react-icons/fi").then((mod) => mod.FiMoon), {
  ssr: false,
});
const FiSun = dynamic(() => import("react-icons/fi").then((mod) => mod.FiSun), {
  ssr: false,
});

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSwitchingRole, setIsSwitchingRole] = useState(false);
  const { isLoggedIn, user, login, logout, switchRole } = useUserStore();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference and set initial theme
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);
    applyTheme(isDarkMode);
  }, []);

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.style.setProperty("--background", "#141217");
      document.documentElement.style.setProperty("--foreground", "#e5e1f3");
      document.documentElement.style.setProperty("--card-bg", "rgba(30, 28, 38, 0.98)");
    } else {
      document.documentElement.style.setProperty("--background", "#f4f2f8");
      document.documentElement.style.setProperty("--foreground", "#1b1a1e");
      document.documentElement.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.98)");
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    applyTheme(newDarkMode);
  };

  const handleLogin = () => {
    router.push("/login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
  };

  const handleRoleSwitch = async () => {
    if (!user || isSwitchingRole) return;

    setIsSwitchingRole(true);

    try {
      // Call backend API to switch role
      // const response = await fetch('/api/user/switch-role', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     currentRole: user.role,
      //     targetRole: user.role === 'student' ? 'instructor' : 'student'
      //   })
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to switch role');
      // }



      // const updatedUser = await response.json();

      // Update user in Zustand store with the new user data from backend
      // login(updatedUser);
      switchRole(user.role === 'student' ? 'instructor' : 'student');

      // Close the user menu
      setUserMenuOpen(false);

      // Redirect to dashboard to reflect the new role
      router.push('/u/dashboard');

    } catch (error) {
      console.error('Error switching role:', error);
      // You can add a toast notification here
      alert('Failed to switch role. Please try again.');
    } finally {
      setIsSwitchingRole(false);
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
              className="hover-glow transition font-medium px-3 py-2 rounded-lg hover:bg-[var(--accent)]/30"
            >
              {link}
            </Link>
          ))}

          {/* Authentication Section */}
          <div className="flex items-center gap-2 ml-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </button>

            {/* Login / User Menu */}
            {!isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-white shadow-md transition"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <FiLogIn /> Login
              </motion.button>
            ) : (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 border border-[var(--accent)] hover:bg-[var(--accent)]/30 transition"
                >
                  <FiUser className="text-[var(--accent)]" />
                  <span>{user?.name || "Learner"}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${user?.role === 'instructor'
                      ? 'bg-purple-500/20 text-purple-500'
                      : 'bg-blue-500/20 text-blue-500'
                    }`}>
                    {user?.role}
                  </span>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl backdrop-blur-xl py-2 z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-2 border-b border-[var(--border-color)]">
                        <p className="font-semibold text-[var(--foreground)]">{user?.name}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{user?.email}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-[var(--accent)] capitalize">{user?.role}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${user?.role === 'instructor'
                              ? 'bg-purple-500/20 text-purple-500'
                              : 'bg-blue-500/20 text-blue-500'
                            }`}>
                            {user?.role === 'instructor' ? 'Educator' : 'Learner'}
                          </span>
                        </div>
                      </div>

                      {/* Role Switch Section */}
                      <div className="px-4 py-2 border-b border-[var(--border-color)]">
                        <div className="flex items-center justify-between">
                          {/* <span className="text-sm font-medium text-[var(--foreground)]">Switch Role</span> */}
                          <button
                            onClick={handleRoleSwitch}
                            disabled={isSwitchingRole}
                            className={`flex w-full items-center gap-2 px-3 py-2 rounded text-xs font-medium transition ${isSwitchingRole
                                ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                                : 'bg-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)]/30'
                              }`}
                          >
                            {isSwitchingRole ? (
                              <>
                                <FiRefreshCw className="animate-spin" />
                                Switching...
                              </>
                            ) : (
                              <>
                                <FiRefreshCw />
                                Switch to {user?.role === 'student' ? 'Instructor' : 'Student'}
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <Link
                        href="/u/dashboard?tab=profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--accent)]/30 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiUser className="text-[var(--accent)]" />
                        <span>Profile</span>
                      </Link>

                      {/* Sign Out */}
                      <div className="border-t border-[var(--border-color)] pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/30 transition"
                        >
                          <FiLogOut />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl p-2 rounded-lg hover:bg-[var(--accent)]/30 transition"
          style={{ color: "var(--foreground)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
            className="md:hidden px-6 pb-4 pt-2 space-y-3 shadow-lg rounded-b-2xl border-b border-[var(--border-color)]"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            {/* Navigation Links */}
            {["Home", "Tutorials", "About"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="block px-4 py-3 rounded-lg hover:bg-[var(--accent)]/30 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </Link>
            ))}

            {/* Mobile Authentication Section */}
            <div className="border-t border-[var(--border-color)] pt-3 space-y-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[var(--accent)] hover:bg-[var(--accent)]/30 transition"
              >
                {isDark ? <FiSun /> : <FiMoon />}
                <span>Switch to {isDark ? "Light" : "Dark"} Mode</span>
              </button>

              {/* Login/Logout */}
              {!isLoggedIn ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="w-full px-4 py-3 rounded-lg font-medium flex items-center gap-2 text-white shadow-md transition justify-center"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  <FiLogIn /> Login
                </motion.button>
              ) : (
                <div className="space-y-2">
                  <div className="px-4 py-2 rounded-lg bg-[var(--accent)]/30">
                    <p className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                      <FiUser /> {user?.name || "Learner"}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">{user?.email}</p>
                    <p className="text-xs text-[var(--accent)] capitalize">{user?.role}</p>
                  </div>

                  {/* Mobile Role Switch */}
                  <button
                    onClick={handleRoleSwitch}
                    disabled={isSwitchingRole}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition ${isSwitchingRole
                        ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                        : 'border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/30'
                      }`}
                  >
                    {isSwitchingRole ? (
                      <>
                        <FiRefreshCw className="animate-spin" />
                        Switching Role...
                      </>
                    ) : (
                      <>
                        <FiRefreshCw />
                        Switch to {user?.role === 'student' ? 'Instructor' : 'Student'}
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/u/dashboard?tab=profile"
                      className="px-3 py-2 rounded-lg border border-[var(--accent)] hover:bg-[var(--accent)]/30 transition text-center"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/30 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;