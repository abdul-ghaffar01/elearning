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
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

export default function FeaturedTutorials() {
  const { isLoggedIn, login } = useUserStore();

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--foreground)]"
      >
        Featured Tutorials
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tutorials.map((tut, i) => (
          <motion.div
            key={tut.id}
            variants={fadeUp(0.2 * i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass p-6 rounded-3xl shadow-lg hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--accent)]">{tut.title}</h3>
              <p className="text-[var(--color-muted)] mb-4">{tut.desc}</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[var(--accent)]/20 text-[var(--accent)]">
                {tut.level}
              </span>
            </div>

            <div className="mt-6">
              {isLoggedIn ? (
                <button
                  className="w-full py-2 rounded-xl bg-[var(--accent)] text-white font-medium shadow-md hover:shadow-lg transition"
                >
                  Enroll Now
                </button>
              ) : (
                <button
                  className="w-full py-2 rounded-xl bg-[var(--accent)]/80 text-white font-medium shadow-md hover:shadow-lg transition"
                  onClick={() => login({ name: "Demo User" })}
                >
                  Login to Enroll
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
