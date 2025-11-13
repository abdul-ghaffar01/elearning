"use client";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/loginStore";

const tutorials = [
  {
    id: 1,
    title: "Introduction to Databases",
    desc: "Learn the fundamentals of relational databases, SQL queries, and normalization.",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Advanced SQL Queries",
    desc: "Master complex SQL queries, joins, subqueries, and optimization techniques.",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "NoSQL Databases",
    desc: "Understand NoSQL databases like MongoDB and Redis for modern applications.",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Database Design Patterns",
    desc: "Learn best practices for designing scalable and maintainable database schemas.",
    level: "Intermediate",
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } },
});

export default function FeaturedTutorials() {
  const { isLoggedIn, login } = useUserStore();

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--foreground)]"
      >
        Featured Tutorials
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {tutorials.map((tut, i) => (
          <motion.div
            key={tut.id}
            variants={fadeUp(0.2 * i)}
            className="relative rounded-3xl p-8 bg-[var(--card-bg)] glass border-2 border-transparent hover:shadow-lg transition-transform hover:scale-105"
            style={{
              borderImageSlice: 1,
              borderWidth: "2px",
              borderImageSource: "linear-gradient(45deg, #6366f1, #f472b6, #4ade80, #facc15)",
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold mb-3 text-[var(--accent)]">{tut.title}</h3>
                <p className="text-[var(--color-muted)] mb-4">{tut.desc}</p>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[var(--accent)]/20 text-[var(--accent)]">
                  {tut.level}
                </span>
              </div>

              <div className="mt-6">
                {isLoggedIn ? (
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 12px var(--accent)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium shadow-md transition"
                  >
                    Enroll Now
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 12px var(--accent)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => login({ name: "Demo User" })}
                    className="w-full py-3 rounded-xl bg-[var(--accent)]/80 text-white font-medium shadow-md transition"
                  >
                    Login to Enroll
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
