"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVideo, FaFileAlt, FaQuestionCircle, FaLock, FaCheckCircle, FaArrowLeft, FaArrowRight, FaPlay, FaBook, FaStar, FaClock, FaUser } from "react-icons/fa";
import TutorialSidebar from "@/components/dashboard/TutorialSidebar";

// Mock tutorial data
const tutorialData = {
  id: 1,
  title: "Introduction to Databases",
  description: "Learn the basics of databases, SQL queries, and design patterns in this comprehensive course designed for beginners.",
  instructor: "Dr. Sarah Johnson",
  duration: "4h 20m",
  difficulty: "Beginner",
  rating: 4.8,
  category: "Database Management",
  lessons: [
    { 
      id: 1, 
      title: "What are Databases?", 
      type: "video", 
      status: "passed", 
      duration: "15:30",
      content: "Video content placeholder", 
      description: "Understand the fundamental concepts of databases and their importance in modern applications.",
      quiz: {
        questions: [
          {
            question: "What is the primary purpose of a database?",
            options: ["Store and organize data", "Create web pages", "Manage user interfaces", "Handle network requests"],
            correct: 0
          },
          {
            question: "Which of these is NOT a database type?",
            options: ["Relational", "NoSQL", "Graph", "Binary"],
            correct: 3
          }
        ]
      }
    },
    { 
      id: 2, 
      title: "Setting Up Your Environment", 
      type: "video", 
      status: "passed", 
      duration: "22:15",
      content: "Video content placeholder", 
      description: "Install and configure database tools and development environment.",
      quiz: {
        questions: [
          {
            question: "Which tool is commonly used for MySQL databases?",
            options: ["MySQL Workbench", "Visual Studio", "Photoshop", "Excel"],
            correct: 0
          }
        ]
      }
    },
    { 
      id: 3, 
      title: "Basic SQL Queries", 
      type: "reading", 
      status: "pending", 
      duration: "12 min read",
      content: "SQL (Structured Query Language) is the standard language for relational database management systems. In this lesson, you'll learn the basic SELECT, INSERT, UPDATE, and DELETE statements that form the foundation of database operations.", 
      description: "Learn to write simple SQL queries for data manipulation and retrieval.",
      quiz: {
        questions: [
          {
            question: "Which SQL statement is used to retrieve data?",
            options: ["SELECT", "GET", "RETRIEVE", "FETCH"],
            correct: 0
          },
          {
            question: "What does the WHERE clause do?",
            options: ["Filters records", "Sorts records", "Groups records", "Joins tables"],
            correct: 0
          }
        ]
      }
    },
    { 
      id: 4, 
      title: "Database Design Principles", 
      type: "reading", 
      status: "locked", 
      duration: "18 min read",
      content: "Understanding database design is crucial for building efficient applications.", 
      description: "Explore fundamental design patterns for efficient database architecture.",
      quiz: {
        questions: [
          {
            question: "What is database normalization?",
            options: ["Organizing data to reduce redundancy", "Speeding up queries", "Backing up data", "Encrypting data"],
            correct: 0
          }
        ]
      }
    },
  ],
};

// Helper function for icons
const getLessonIcon = (lesson) => {
  if (lesson.status === "locked") return <FaLock className="text-[var(--muted)]" />;
  switch (lesson.type) {
    case "video": return <FaVideo className="text-blue-500" />;
    case "reading": return <FaFileAlt className="text-green-500" />;
    case "quiz": return <FaQuestionCircle className="text-purple-500" />;
    default: return <FaFileAlt className="text-[var(--muted)]" />;
  }
};

const getLessonTypeColor = (type) => {
  switch (type) {
    case "video": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "reading": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "quiz": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default: return "bg-[var(--muted)]/10 text-[var(--muted)]";
  }
};

export default function TutorialPage() {
  const [lessons, setLessons] = useState(tutorialData.lessons);
  const [selectedLesson, setSelectedLesson] = useState(lessons.find(l => l.status !== "locked") || lessons[0]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentContent, setCurrentContent] = useState("lesson"); // "lesson" or "quiz"

  const handleCompleteLesson = (lessonId) => {
    setLessons(prev =>
      prev.map(l => {
        if (l.id === lessonId) return { ...l, status: "passed" };
        return l;
      })
    );
  };

  const unlockNextLesson = (lessonId) => {
    setLessons(prev =>
      prev.map(l => {
        if (l.id === lessonId + 1 && l.status === "locked") {
          return { ...l, status: "pending" };
        }
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

    if (nextLesson) {
      setSelectedLesson(nextLesson);
      setShowQuizResults(false);
      setQuizAnswers({});
      setCurrentContent("lesson");
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateQuizScore = () => {
    if (!selectedLesson.quiz) return 0;
    
    const totalQuestions = selectedLesson.quiz.questions.length;
    let correctAnswers = 0;
    
    selectedLesson.quiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    const score = calculateQuizScore();
    
    // Pass threshold is 50% or more
    if (score >= 50) {
      handleCompleteLesson(selectedLesson.id);
      unlockNextLesson(selectedLesson.id);
    }
  };

  const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
  const progress = ((currentIndex + 1) / lessons.length) * 100;
  const canTakeQuiz = selectedLesson.status !== "locked" && selectedLesson.quiz;

  return (
    <div className="flex h-[calc(100dvh-72px)] bg-[var(--background)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[300px] border-r border-[var(--border-color)]">
        <TutorialSidebar
          lessons={lessons}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Compact Progress Header */}
        <div className="border-b border-[var(--border-color)] p-4 bg-[var(--card-bg)] backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-[var(--foreground)] truncate">{tutorialData.title}</h1>
              <div className="flex items-center gap-3 text-xs text-[var(--muted)] mt-1">
                <span className="flex items-center gap-1">
                  <FaUser className="text-[var(--accent)]" />
                  {tutorialData.instructor}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-[var(--accent)]" />
                  {tutorialData.duration}
                </span>
                <span>•</span>
                <span>Lesson {currentIndex + 1} of {lessons.length}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-yellow-500">
                <FaStar />
                <span>{tutorialData.rating}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-[var(--background)] rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-purple-600"
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
            <span>{Math.round(progress)}% Complete</span>
            <span>{lessons.filter(l => l.status === "passed").length}/{lessons.length} Lessons</span>
          </div>
        </div>

        {/* Lesson Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLesson.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Lesson Header */}
                <div className="glass p-6 rounded-2xl shadow-lg mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${getLessonTypeColor(selectedLesson.type)}`}>
                        {getLessonIcon(selectedLesson)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--foreground)]">{selectedLesson.title}</h2>
                        <div className="flex items-center gap-4 text-sm text-[var(--muted)] mt-1">
                          <span className="flex items-center gap-1">
                            <FaClock />
                            {selectedLesson.duration}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            selectedLesson.status === "passed" 
                              ? "bg-green-500/10 text-green-500" 
                              : selectedLesson.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-[var(--muted)]/10"
                          }`}>
                            {selectedLesson.status === "passed" ? "Completed" : selectedLesson.status === "pending" ? "In Progress" : "Locked"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {selectedLesson.status === "passed" && (
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    )}
                  </div>

                  {/* Lesson Description */}
                  {selectedLesson.description && (
                    <p className="text-[var(--foreground)] text-lg mb-4 border-l-4 border-[var(--accent)] pl-4 py-1 bg-[var(--accent)]/5 rounded-r-lg">
                      {selectedLesson.description}
                    </p>
                  )}

                  {/* Quiz Navigation */}
                  {canTakeQuiz && currentContent === "lesson" && (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setCurrentContent("quiz")}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                      >
                        <FaQuestionCircle />
                        Take Quiz
                      </button>
                    </div>
                  )}

                  {currentContent === "quiz" && (
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => setCurrentContent("lesson")}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors text-sm"
                      >
                        <FaBook />
                        Back to Lesson
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="glass p-6 rounded-2xl shadow-lg">
                  {currentContent === "lesson" ? (
                    <>
                      {selectedLesson.type === "video" && (
                        <div className="space-y-4">
                          <div className="w-full aspect-video bg-black rounded-xl flex items-center justify-center text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
                            <div className="text-center z-10">
                              <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer">
                                <FaPlay className="text-white text-xl ml-1" />
                              </div>
                              <p className="text-lg font-semibold">Video Lesson</p>
                              <p className="text-sm text-gray-300">Click play to start learning</p>
                            </div>
                          </div>
                          <div className="prose max-w-none text-[var(--foreground)]">
                            <p>This video covers essential concepts and practical examples related to this lesson.</p>
                          </div>
                        </div>
                      )}

                      {selectedLesson.type === "reading" && (
                        <div className="prose prose-lg max-w-none text-[var(--foreground)]">
                          <div className="p-6 bg-[var(--card-bg)] rounded-lg border border-[var(--border-color)]">
                            <h3 className="text-xl font-bold text-[var(--accent)] mb-4 flex items-center gap-2">
                              <FaBook />
                              Reading Material
                            </h3>
                            <div className="space-y-4 leading-relaxed">
                              {selectedLesson.content.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Quiz Content */
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <FaQuestionCircle className="text-purple-500" />
                        Knowledge Check - {selectedLesson.title}
                      </h3>
                      
                      {!showQuizResults ? (
                        <>
                          <p className="text-[var(--muted)] mb-6">
                            Answer the following questions to test your understanding. You need 50% or more to pass and unlock the next lesson.
                          </p>
                          
                          {selectedLesson.quiz.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="glass p-6 rounded-xl border border-[var(--border-color)]">
                              <p className="font-semibold text-lg mb-4 text-[var(--foreground)]">
                                {questionIndex + 1}. {question.question}
                              </p>
                              <div className="space-y-3">
                                {question.options.map((option, optionIndex) => (
                                  <button
                                    key={optionIndex}
                                    onClick={() => handleQuizAnswer(questionIndex, optionIndex)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                                      quizAnswers[questionIndex] === optionIndex
                                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                                        : 'border-[var(--border-color)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          
                          <button
                            onClick={handleQuizSubmit}
                            disabled={Object.keys(quizAnswers).length !== selectedLesson.quiz.questions.length}
                            className="w-full py-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
                          >
                            Submit Answers
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-6xl mb-4">
                            {calculateQuizScore() >= 50 ? "🎉" : "📝"}
                          </div>
                          <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                            {calculateQuizScore() >= 50 ? "Congratulations!" : "Keep Learning!"}
                          </h3>
                          <p className="text-[var(--muted)] mb-4">
                            You scored {calculateQuizScore()}% on this quiz
                          </p>
                          {calculateQuizScore() >= 50 ? (
                            <div className="space-y-3">
                              <p className="text-green-500 font-semibold">
                                ✅ You've passed! Next lesson is now unlocked.
                              </p>
                              <button
                                onClick={() => {
                                  setCurrentContent("lesson");
                                  navigateLesson("next");
                                }}
                                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                              >
                                Continue to Next Lesson
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-yellow-500 font-semibold">
                                📚 Score below 50%. Review the material and try again.
                              </p>
                              <button
                                onClick={() => {
                                  setShowQuizResults(false);
                                  setQuizAnswers({});
                                }}
                                className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors font-semibold"
                              >
                                Retry Quiz
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation & Actions */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--border-color)]">
                    <button
                      onClick={() => navigateLesson("prev")}
                      disabled={currentIndex === 0}
                      className="flex items-center gap-3 px-6 py-3 bg-[var(--card-bg)] text-[var(--foreground)] rounded-xl hover:bg-[var(--accent)]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-[var(--border-color)]"
                    >
                      <FaArrowLeft className="text-[var(--accent)]" />
                      Previous
                    </button>

                    <div className="flex items-center gap-3">
                      {selectedLesson.status !== "passed" && selectedLesson.status !== "locked" && currentContent === "lesson" && (
                        <button
                          onClick={() => setCurrentContent("quiz")}
                          className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-semibold flex items-center gap-2"
                        >
                          <FaQuestionCircle />
                          Take Quiz
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => navigateLesson("next")}
                      disabled={currentIndex === lessons.length - 1 || lessons[currentIndex + 1].status === "locked"}
                      className="flex items-center gap-3 px-6 py-3 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                    >
                      Next
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}