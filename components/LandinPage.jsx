"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUserStore } from "@/store/loginStore";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: "easeOut" } },
});

const floatAnimation = {
  animate: { y: [0, -15, 0], x: [0, 10, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

export default function LandingPage() {
  const { isLoggedIn, user, login, logout } = useUserStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Floating Background Blobs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[var(--accent)]/20 blur-3xl top-[-10%] left-[-10%] z-0"
        {...floatAnimation}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-[var(--accent-hover)]/30 blur-2xl bottom-[-5%] right-[-5%] z-0"
        {...floatAnimation}
      />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp()}
        className="relative z-10 max-w-4xl glass p-12 md:p-16 rounded-3xl shadow-2xl backdrop-saturate-150 backdrop-blur-xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Learn Smarter, <span className="text-[var(--accent)]">Not Harder</span>
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-10">
          Next-gen eLearning platform blending speed, clarity, and modern design.
          Explore interactive tutorials built for the future.
        </p>

        {!isLoggedIn ? (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--accent)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => login({ name: "Demo User" })}
            className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Sign in with Google
          </motion.button>
        ) : (
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-[var(--color-foreground)] text-lg">
              Welcome back,{" "}
              <span className="text-[var(--accent)] font-semibold">
                {user?.name || "Learner"}
              </span>
              !
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/tutorials"
                className="px-6 py-3 rounded-xl glass hover-glow font-medium"
              >
                Explore Tutorials
              </Link>
              <button
                onClick={logout}
                className="px-6 py-3 rounded-xl font-medium text-white shadow-lg"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.4)}
        className="mt-24 grid md:grid-cols-3 gap-10 max-w-6xl w-full relative z-10"
      >
        {[
          {
            title: "Dynamic Learning",
            desc: "Interactive courses with real-world projects and live examples.",
          },
          {
            title: "Seamless Experience",
            desc: "Glass-smooth animations and responsive layouts for any device.",
          },
          {
            title: "Modern Tech",
            desc: "Powered by Next.js, Tailwind CSS, Framer Motion, and Zustand.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.2 * i)}
            className="glass p-8 rounded-3xl hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-3 text-[var(--accent)]">
              {f.title}
            </h3>
            <p className="text-[var(--color-muted)] leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
