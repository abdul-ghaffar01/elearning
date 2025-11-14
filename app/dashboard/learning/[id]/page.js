"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaVideo, FaFileAlt, FaQuestionCircle, FaLock, FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TutorialSidebar from "@/components/dashboard/TutorialSidebar";

// Mock tutorial data
const tutorialData = {
  id: 1,
  title: "Introduction to Databases",
  description: "Learn the basics of databases, SQL queries, and design patterns.",
  lessons: [
    { id: 1, title: "Introduction", type: "video", status: "passed", content: "Video content placeholder", description: "This video introduces databases." },
    { id: 2, title: "Setup & Installation", type: "video", status: "passed", content: "Video content placeholder", description: "Install necessary tools." },
    { id: 3, title: "Basic Queries", type: "reading", status: "pending", content: "Text content placeholder", description: "Learn to write simple SQL queries." },
    { id: 4, title: "Quiz 1", type: "quiz", status: "locked", content: { questions: ["Q1?", "Q2?"] }, description: "Quiz to test your understanding." },
  ],
};

// Helper function for icons
const getLessonIcon = (lesson) => {
  if (lesson.status === "locked") return <FaLock />;
  switch (lesson.type) {
    case "video": return <FaVideo />;
    case "reading": return <FaFileAlt />;
    case "quiz": return <FaQuestionCircle />;
    default: return <FaFileAlt />;
  }
};

export default function TutorialPage() {
  const [lessons, setLessons] = useState(tutorialData.lessons);
  const [selectedLesson, setSelectedLesson] = useState(lessons.find(l => l.status !== "locked") || lessons[0]);

  const handleCompleteLesson = (lessonId) => {
    setLessons(prev =>
      prev.map(l => {
        if (l.id === lessonId) return { ...l, status: "passed" };
        if (l.id === lessonId + 1 && l.status === "locked") return { ...l, status: "pending" };
        return l;
      })
    );
  };

  const navigateLesson = (direction) => {
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
    let nextLesson = null;

    if (direction === "next" && currentIndex < lessons.length - 1) {
      const candidate = lessons[currentIndex + 1];
      if (candidate.status !== "locked") nextLesson = candidate;
    }

    if (direction === "prev" && currentIndex > 0) {
      nextLesson = lessons[currentIndex - 1];
    }

    if (nextLesson) setSelectedLesson(nextLesson);
  };

  return (
    <div className="flex h-[calc(100dvh-70px)] bg-[var(--background)] overflow-hidden">

      {/* Sidebar */}
      <div className="w-[300px] border-r border-[var(--muted)]">
        <TutorialSidebar
          lessons={lessons}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="flex-1 p-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Tutorial Title */}
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-2">{tutorialData.title}</h1>
        <p className="text-[var(--muted)] mb-6">{tutorialData.description}</p>

        {/* Lesson Content */}
        <motion.div
          key={selectedLesson.id}
          className="glass p-6 rounded-3xl shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            {getLessonIcon(selectedLesson)}
            <h2 className="text-2xl font-semibold">{selectedLesson.title}</h2>
            {selectedLesson.status === "passed" && <FaCheckCircle className="text-green-500" />}
          </div>

          {/* Lesson Description */}
          {selectedLesson.description && (
            <p className="text-[var(--foreground)] mb-4">{selectedLesson.description}</p>
          )}

          {/* Content by type */}
          {selectedLesson.type === "video" && (
            <div className="w-full h-64 bg-black rounded-lg flex items-center justify-center text-white mb-4">
              Video Player Placeholder
            </div>
          )}
          {selectedLesson.type === "reading" && (
            <div className="prose max-w-full text-[var(--foreground)] mb-4">
              <p>{selectedLesson.content}</p>
            </div>
          )}
          {selectedLesson.type === "quiz" && (
            <div className="flex flex-col gap-4 mb-4">
              {selectedLesson.content.questions.map((q, i) => (
                <div key={i} className="glass p-4 rounded-lg shadow-sm">
                  <p className="font-medium">{q}</p>
                  <button className="mt-2 px-4 py-1 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition">
                    Answer
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigateLesson("prev")}
              disabled={lessons.findIndex(l => l.id === selectedLesson.id) === 0}
              className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition"
            >
              <FaArrowLeft className="inline mr-2" /> Previous
            </button>
            <button
              onClick={() => navigateLesson("next")}
              disabled={lessons.findIndex(l => l.id === selectedLesson.id) === lessons.length - 1 || lessons[lessons.findIndex(l => l.id === selectedLesson.id) + 1].status === "locked"}
              className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition"
            >
              Next <FaArrowRight className="inline ml-2" />
            </button>
          </div>

          {/* Complete Lesson Button */}
          {selectedLesson.status !== "passed" && selectedLesson.status !== "locked" && (
            <button
              onClick={() => handleCompleteLesson(selectedLesson.id)}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Mark as Completed
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
