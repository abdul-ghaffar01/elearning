"use client";
import { motion } from "framer-motion";
import { FaVideo, FaFileAlt, FaQuestionCircle, FaLock, FaCheckCircle } from "react-icons/fa";

export default function TutorialSidebar({ lessons, selectedLesson, setSelectedLesson }) {
  const getLessonIcon = (lesson) => {
    if (lesson.status === "locked") return <FaLock />;
    switch (lesson.type) {
      case "video":
        return <FaVideo />;
      case "reading":
        return <FaFileAlt />;
      case "quiz":
        return <FaQuestionCircle />;
      default:
        return <FaFileAlt />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-400 text-black";
      case "locked":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-300";
    }
  };

  const passedCount = lessons.filter((l) => l.status === "passed").length;
  const totalCount = lessons.length;

  return (
    <div className="h-full bg-[var(--card-bg)] p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-[var(--accent)]">Lessons</h2>

      {/* Progress */}
      <div className="mb-4">
        <p className="text-sm text-[var(--muted)] mb-1">
          Progress: {passedCount}/{totalCount} lessons passed
        </p>
        <div className="w-full h-2 bg-[var(--muted)] rounded-full">
          <div
            className="h-2 rounded-full bg-[var(--accent)]"
            style={{ width: `${(passedCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons List */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-2 scrollbar-hide">
        {lessons.map((lesson) => (
          <motion.li
            key={lesson.id}
            whileHover={{ scale: lesson.status !== "locked" ? 1.02 : 1 }}
            onClick={() => lesson.status !== "locked" && setSelectedLesson(lesson)}
            className={`flex items-center justify-between gap-2 p-2 rounded-lg cursor-pointer glass shadow-sm transition
              ${selectedLesson?.id === lesson.id ? "bg-[var(--accent)] text-white" : "text-[var(--foreground)]"}
              ${lesson.status === "locked" ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{getLessonIcon(lesson)}</span>
              <span>{lesson.title}</span>
            </div>
            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(lesson.status)}`}>
              {lesson.status === "locked"
                ? "Locked"
                : lesson.status === "passed"
                ? "Passed"
                : "Pending"}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
