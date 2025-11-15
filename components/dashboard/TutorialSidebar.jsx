"use client";
import { motion } from "framer-motion";
import { FaVideo, FaFileAlt, FaQuestionCircle, FaLock, FaCheckCircle, FaPlay, FaBook, FaStar } from "react-icons/fa";

export default function TutorialSidebar({ lessons, selectedLesson, setSelectedLesson }) {
    const getLessonIcon = (lesson) => {
        if (lesson.status === "locked") return <FaLock className="text-[var(--muted)]" />;
        switch (lesson.type) {
            case "video":
                return <FaVideo className="text-blue-500" />;
            case "reading":
                return <FaFileAlt className="text-green-500" />;
            case "quiz":
                return <FaQuestionCircle className="text-purple-500" />;
            default:
                return <FaFileAlt className="text-[var(--muted)]" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "passed":
                return "bg-green-500/20 text-green-500 border-green-500/30";
            case "pending":
                return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
            case "locked":
                return "bg-[var(--muted)]/20 text-[var(--muted)] border-[var(--muted)]/30";
            default:
                return "bg-[var(--muted)]/20 text-[var(--muted)]";
        }
    };

    const getLessonTypeColor = (type, isSelected) => {
        if (isSelected) return "bg-[var(--accent)]/20 border-[var(--accent)]";

        switch (type) {
            case "video": return "bg-blue-500/10 border-blue-500/20";
            case "reading": return "bg-green-500/10 border-green-500/20";
            case "quiz": return "bg-purple-500/10 border-purple-500/20";
            default: return "bg-[var(--muted)]/10 border-[var(--muted)]/20";
        }
    };

    const passedCount = lessons.filter((l) => l.status === "passed").length;
    const totalCount = lessons.length;
    const progressPercentage = Math.round((passedCount / totalCount) * 100);

    return (
        <div className="h-full bg-[var(--card-bg)] border-r border-[var(--border-color)] p-3 flex flex-col">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Course Content</h2>

                {/* Progress */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[var(--muted)]">Your progress</span>
                        <span className="font-semibold text-[var(--accent)]">{progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--background)] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-600"
                        />
                    </div>
                    <p className="text-xs text-[var(--muted)] text-center">
                        {passedCount} of {totalCount} lessons completed
                    </p>
                </div>
            </div>

            {/* Lessons List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide overflow-visible" style={{ overflow: "visible" }}>
                <ul className="flex flex-col gap-3 overflow-visible p-1">
                    {lessons.map((lesson, index) => {
                        const isSelected = selectedLesson?.id === lesson.id;
                        const isLocked = lesson.status === "locked";
                        const isPassed = lesson.status === "passed";

                        return (
                            <motion.li
                                key={lesson.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: !isLocked ? 1.02 : 1,
                                    x: !isLocked ? 4 : 0
                                }}
                                onClick={() => !isLocked && setSelectedLesson(lesson)}
                                className={`relative p-2 rounded-xl border-2 cursor-pointer transition-all duration-200 group
    ${isSelected
                                        ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-lg shadow-[var(--accent)]/10"
                                        : getLessonTypeColor(lesson.type, isSelected)
                                    }
    ${isLocked
                                        ? "opacity-60 cursor-not-allowed grayscale"
                                        : "hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 hover:shadow-md"
                                    }`}
                            >
                                {/* Selected Indicator - BEHIND content */}
                                {isSelected && (
                                    <motion.div
                                        layoutId="selectedLesson"
                                        className="absolute inset-0 border-2 border-[var(--accent)] rounded-xl pointer-events-none z-0"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}

                                {/* Lesson Number */}
                                <div className={`absolute -left-3 -top-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 z-10
    ${isSelected
                                        ? "bg-[var(--accent)] text-white border-white"
                                        : isPassed
                                            ? "bg-green-500 text-white border-white"
                                            : "bg-[var(--card-bg)] text-[var(--foreground)] border-[var(--border-color)]"
                                    }`}>
                                    {index + 1}
                                </div>

                                <div className="flex items-start gap-3 relative z-10">
                                    {/* Icon */}
                                    <div className={`p-2 rounded-lg border-2 mt-1 flex-shrink-0
      ${isSelected
                                            ? "border-[var(--accent)] bg-[var(--accent)]/20"
                                            : getLessonTypeColor(lesson.type, false)
                                        }`}>
                                        {getLessonIcon(lesson)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-semibold text-sm leading-tight mb-1 transition-colors
        ${isSelected
                                                ? "text-[var(--accent)]"
                                                : "text-[var(--foreground)] group-hover:text-[var(--accent)]"
                                            }`}>
                                            {lesson.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                                            <span className="flex items-center gap-1">
                                                {lesson.type === "video" && <FaPlay className="text-blue-500" />}
                                                {lesson.type === "reading" && <FaBook className="text-green-500" />}
                                                {lesson.type === "quiz" && <FaStar className="text-purple-500" />}
                                                {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                                            </span>
                                            <span>•</span>
                                            <span>{lesson.duration}</span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`px-2 py-1 text-xs rounded-full border flex-shrink-0 z-20
      ${getStatusColor(lesson.status)}`}>
                                        {isLocked ? "Locked" : isPassed ? "Completed" : "Available"}
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                {!isLocked && (
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
                                )}
                            </motion.li>
                        );
                    })}
                </ul>
            </div>

            {/* Completion Message */}
            {progressPercentage === 100 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-center"
                >
                    <FaCheckCircle className="text-green-500 text-lg mx-auto mb-1" />
                    <p className="text-xs text-green-500 font-semibold">Course Completed! 🎉</p>
                </motion.div>
            )}
        </div>
    );
}