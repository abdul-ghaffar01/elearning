"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const tutorialsData = [
  {
    id: 1,
    title: "Complete Introduction to Databases & SQL for Beginners",
    description:
      "Learn SQL from scratch with hands-on queries, database design, indexing, normalization, and more.",
    category: "Databases",
    level: "Beginner",
    rating: 4.8,
    students: 1200,
    thumbnail: "/images/db.jpg",
    enrolled: false,
  },
  {
    id: 2,
    title: "Mastering Backend Engineering with GoLang",
    description:
      "Build scalable microservices, use gRPC, JWT auth, middleware, clean architecture, and more.",
    category: "Backend",
    level: "Intermediate",
    rating: 4.7,
    students: 950,
    thumbnail: "/images/go.jpg",
    enrolled: true,
  },
  {
    id: 3,
    title: "Mastering Backend Engineering with GoLang",
    description:
      "Build scalable microservices, use gRPC, JWT auth, middleware, clean architecture, and more.",
    category: "Backend",
    level: "Intermediate",
    rating: 4.7,
    students: 950,
    thumbnail: "/images/go.jpg",
    enrolled: false,
  },
  {
    id: 4,
    title: "Mastering Backend Engineering with GoLang",
    description:
      "Build scalable microservices, use gRPC, JWT auth, middleware, clean architecture, and more.",
    category: "Backend",
    level: "Intermediate",
    rating: 4.7,
    students: 950,
    thumbnail: "/images/go.jpg",
    enrolled: true,
  },
  {
    id: 8,
    title: "Mastering Backend Engineering with GoLang",
    description:
      "Build scalable microservices, use gRPC, JWT auth, middleware, clean architecture, and more.",
    category: "Backend",
    level: "Intermediate",
    rating: 4.7,
    students: 950,
    thumbnail: "/images/go.jpg",
    enrolled: true,
  },
];

export default function AllTutorials() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Databases", "Frontend", "Backend", "DevOps", "Cloud"];

  const filteredTutorials = tutorialsData.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || t.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full p-6 mb-8">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-semibold mb-6 text-[var(--accent)]">All Tutorials</h1>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[300px] px-4 py-2 bg-[var(--card-bg)] border border-[var(--muted)] rounded-xl outline-none focus:border-[var(--accent)] transition"
        />

        {/* CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--muted)] rounded-xl outline-none focus:border-[var(--accent)] transition"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* GRID OF TUTORIAL CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {filteredTutorials.map((tut) => (
          <motion.div
            key={tut.id}
            whileHover={{ scale: 1.02 }}
            className="bg-[var(--card-bg)] glass rounded-2xl shadow-md border border-[var(--muted)] flex flex-col"
          >
            {/* THUMBNAIL */}
            <div className="h-40 w-full rounded-t-2xl overflow-hidden">
              <img
                src={tut.thumbnail}
                alt={tut.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col p-4 flex-grow">

              {/* TITLE */}
              <h2 className="font-semibold text-lg mb-2 line-clamp-2 text-[var(--foreground)]">
                {tut.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-[var(--muted)] text-sm mb-3 line-clamp-3">
                {tut.description}
              </p>

              {/* CATEGORY + LEVEL */}
              <div className="flex justify-between text-sm mb-3">
                <span className="px-3 py-1 bg-[var(--accent)]/15 rounded-full text-[var(--accent)]">
                  {tut.category}
                </span>
                <span className="px-3 py-1 bg-[var(--foreground)]/10 rounded-full text-[var(--foreground)]">
                  {tut.level}
                </span>
              </div>

              {/* RATING + STUDENTS */}
              <div className="flex items-center gap-2 text-sm text-[var(--foreground)] mb-4">
                <FaStar className="text-yellow-400" />
                <span>{tut.rating}</span>
                <span className="text-[var(--muted)] ml-auto">{tut.students} students</span>
              </div>

              {/* BUTTON – Continue or Enroll */}
              <button
                className={`mt-auto w-full py-2 rounded-xl text-white font-medium transition
                ${tut.enrolled
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
                }`}
              >
                {tut.enrolled ? "Continue Learning" : "Enroll Now"}
              </button>

            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
