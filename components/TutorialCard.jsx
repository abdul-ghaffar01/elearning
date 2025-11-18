import React from 'react'
import { motion } from "framer-motion";
import { FaStar, FaClock, FaPlayCircle, FaUsers, FaBook } from "react-icons/fa";
import Link from 'next/link';

const TutorialCard = ({ tut }) => {
    return (
        <motion.div
            key={tut.id}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-[var(--card-bg)] glass rounded-2xl shadow-md border border-[var(--border-color)] flex flex-col hover:shadow-xl transition-all duration-300"
        >
            {/* THUMBNAIL */}
            <div className="h-40 w-full rounded-t-2xl overflow-hidden relative">
                <img
                    src={tut.thumbnail}
                    alt={tut.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {tut.popular && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-medium rounded-full">
                        Popular
                    </div>
                )}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
                    {tut.duration}
                </div>
            </div>

            <div className="flex flex-col p-5 flex-grow">

                {/* TITLE */}
                <h2 className="font-bold text-lg mb-2 line-clamp-2 text-[var(--foreground)] leading-tight">
                    {tut.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2 leading-relaxed">
                    {tut.description}
                </p>

                {/* INSTRUCTOR */}
                <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-3">
                    <span>By {tut.instructor}</span>
                </div>

                {/* META INFO */}
                <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-4">
                    <div className="flex items-center gap-1">
                        <FaBook className="text-xs" />
                        <span>{tut.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaUsers className="text-xs" />
                        <span>{tut.students}</span>
                    </div>
                </div>

                {/* CATEGORY + LEVEL */}
                <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-[var(--accent)]/15 rounded-full text-[var(--accent)] text-sm font-medium">
                        {tut.category}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[var(--foreground)]/10 rounded-full text-[var(--foreground)] text-sm">
                            {tut.level}
                        </span>
                    </div>
                </div>

                {/* RATING + PRICE */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span className="text-sm font-medium text-[var(--foreground)]">{tut.rating}</span>
                        </div>
                        <span className="text-[var(--muted)] text-sm">({Math.floor(tut.students / 10)})</span>
                    </div>
                    <div className="text-lg font-bold text-[var(--accent)]">
                        {tut.price ? `${tut.price}` : "Free"}
                    </div>
                </div>

                {/* BUTTON – Continue or Enroll */}
                <Link
                    href={tut.enrolled ? `/u/dashboard/learning/${tut.id}` : `/tutorials/${tut.id}`}
                    className={`mt-auto w-full py-3 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2
                      ${tut.enrolled
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                            : "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] hover:from-[var(--accent-hover)] hover:to-[var(--accent)] shadow-lg hover:shadow-xl"
                        }`}
                >
                    {tut.enrolled ? (
                        <>
                            <FaPlayCircle />
                            Continue Learning
                        </>
                    ) : (
                        <>
                            Enroll Now
                        </>
                    )}
                </Link>

            </div>
        </motion.div>
    )
}

export default TutorialCard