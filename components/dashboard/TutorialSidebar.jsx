"use client";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FaVideo, FaFileAlt, FaQuestionCircle, FaLock, FaCheckCircle, FaPlay, FaBook, FaStar, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TutorialSidebar({ lessons, selectedLesson, setSelectedLesson }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close sidebar when lesson is selected on mobile
    useEffect(() => {
        if (isMobile && selectedLesson) {
            setIsMobileOpen(false);
        }
    }, [selectedLesson, isMobile]);

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
    const MobileToggleButton = () => {
        const y = useMotionValue(0);
        const opacity = useTransform(y, [-200, 0, 200], [0.6, 1, 0.6]);

        return (
            <motion.div
                className="md:hidden fixed top-1/2 -translate-y-1/2 z-50 cursor-move select-none"
                initial={false}
                animate={{
                    left: isMobileOpen ? '340px' : '1.5rem',
                }}
                style={{ y, opacity }}
                drag="y"
                dragConstraints={{
                    top: -window.innerHeight / 2 + 80,
                    bottom: window.innerHeight / 2 - 80,
                }}
                dragElastic={0.2}
                whileDrag={{
                    scale: 1.15,
                    transition: { duration: 0.1 }
                }}
                onDragEnd={() => {
                    // Smoothly return to center after drag
                    y.set(0);
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300
                }}
            >
                {/* Extended Vertical Line that grows with drag */}
                <motion.div
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 bg-[var(--accent)]/30 rounded-full"
                    style={{
                        height: useTransform(y, [-300, 0, 300], [120, 64, 120]),
                    }}
                />

                {/* Drag Handle Indicator */}
                <motion.div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-8 bg-[var(--accent)]/20 rounded-full"
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Arrow Button */}
                <motion.button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="relative p-3 bg-[var(--accent)] text-white rounded-xl shadow-lg border-2 border-white/20 hover:bg-[var(--accent-hover)] transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <motion.div
                        initial={false}
                        animate={{
                            rotate: isMobileOpen ? 0 : 180,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </motion.div>

                    {/* Drag Hint */}
                    <motion.div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-[var(--accent)] whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity"
                        whileHover={{ opacity: 1 }}
                    >
                        Drag vertically
                    </motion.div>
                </motion.button>
            </motion.div>
        );
    };
    // Mobile Overlay
    const MobileOverlay = () => (
        <AnimatePresence>
            {isMobileOpen && isMobile && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden fixed inset-0 bg-black/50 z-40"
                    />
                </>
            )}
        </AnimatePresence>
    );

    // Sidebar Content
    const SidebarContent = () => (
        <div className="h-full bg-[var(--card-bg)] border-r border-[var(--border-color)] p-3 flex flex-col">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-[var(--foreground)]">Course Content</h2>

                </div>

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
                                onClick={() => {
                                    if (!isLocked) {
                                        setSelectedLesson(lesson);
                                        if (isMobile) setIsMobileOpen(false);
                                    }
                                }}
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

    return (
        <>
            {/* Mobile Toggle Button */}
            <MobileToggleButton />

            {/* Mobile Overlay */}
            <MobileOverlay />

            {/* Sidebar - Different behavior for mobile vs desktop */}
            <AnimatePresence>
                {isMobile ? (
                    // Mobile Sidebar (Slides in from left)
                    isMobileOpen && (
                        <motion.div
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ type: "spring", damping: 30 }}
                            className="fixed top-0 left-0 h-full w-80 z-50 md:hidden"
                        >
                            <SidebarContent />
                        </motion.div>
                    )
                ) : (
                    // Desktop Sidebar (Always visible)
                    <div className="hidden md:block w-80 h-full">
                        <SidebarContent />
                    </div>
                )}
            </AnimatePresence>

            {/* Add padding for mobile when sidebar is hidden */}
            {isMobile && !isMobileOpen && (
                <div className="md:hidden h-16" />
            )}
        </>
    );
}