"use client";
import Link from "next/link";
import { useUserStore } from "@/store/loginStore";
import { motion } from "framer-motion";

const enrolledTutorials = [
  { 
    id: 1, 
    title: "Introduction to Databases", 
    thumbnail: "/images/db_tutorial.jpg", 
    passed: 3, 
    total: 7,
    progress: 3,
    instructor: "Sarah Johnson",
    duration: "4h 20m",
    category: "Database"
  },
  { 
    id: 2, 
    title: "Advanced SQL Queries", 
    thumbnail: "/images/sql_tutorial.jpg", 
    passed: 2, 
    total: 4,
    progress: 2,
    instructor: "Mike Chen",
    duration: "2h 45m",
    category: "SQL"
  },
  { 
    id: 3, 
    title: "Web Development Fundamentals", 
    thumbnail: "/images/web_tutorial.jpg", 
    passed: 5, 
    total: 8,
    progress: 5,
    instructor: "Alex Rodriguez",
    duration: "6h 15m",
    category: "Web Dev"
  },
];

export default function EnrolledTutorials() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="w-full h-full p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-xl text-[var(--foreground)] mb-4">Please login to view your tutorials</p>
          <Link 
            href="/login"
            className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors inline-block"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const calculateProgress = (passed, total) => {
    return Math.round((passed / total) * 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-[var(--accent)]";
    return "bg-orange-500";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full h-full p-6 flex flex-col gap-8 bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Your Learning Journey</h1>
        <p className="text-[var(--muted)]">
          Continue where you left off and track your progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">{enrolledTutorials.length}</div>
          <div className="text-sm text-[var(--muted)]">Active Courses</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">
            {enrolledTutorials.reduce((total, tutorial) => total + tutorial.passed, 0)}
          </div>
          <div className="text-sm text-[var(--muted)]">Lessons Completed</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">
            {Math.round(enrolledTutorials.reduce((total, tutorial) => total + calculateProgress(tutorial.passed, tutorial.total), 0) / enrolledTutorials.length)}%
          </div>
          <div className="text-sm text-[var(--muted)]">Average Progress</div>
        </div>
      </div>

      {/* Tutorials Grid */}
      {enrolledTutorials.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No tutorials yet</h3>
            <p className="text-[var(--muted)] mb-4">Start your learning journey by enrolling in tutorials</p>
            <Link 
              href="/tutorials"
              className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors inline-block"
            >
              Browse Tutorials
            </Link>
          </div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {enrolledTutorials.map((tutorial) => {
            const progressPercentage = calculateProgress(tutorial.passed, tutorial.total);
            
            return (
              <motion.div
                key={tutorial.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/u/dashboard/learning/${tutorial.id}`}
                  className="block glass rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[var(--border-color)] group"
                >
                  {/* Thumbnail with Overlay */}
                  <div className="relative overflow-hidden">
                    <img
                      src={tutorial.thumbnail}
                      alt={tutorial.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-[var(--accent)] text-white text-xs rounded-full">
                        {tutorial.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                        {tutorial.duration}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center justify-between text-white">
                        <span className="text-sm font-medium">{tutorial.instructor}</span>
                        <span className="text-sm font-semibold">{progressPercentage}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-[var(--foreground)] text-lg mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                      {tutorial.title}
                    </h3>
                    
                    {/* Progress Section */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted)]">Progress</span>
                        <span className="font-semibold text-[var(--foreground)]">
                          {tutorial.passed}/{tutorial.total} lessons
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-[var(--background)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-2 rounded-full ${getProgressColor(progressPercentage)}`}
                        />
                      </div>
                      
                      {/* Continue Button */}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-[var(--muted)]">
                          {progressPercentage === 100 ? 'Completed! 🎉' : 'Continue learning'}
                        </span>
                        <div className="px-3 py-1 bg-[var(--accent)] text-white text-xs rounded-full group-hover:bg-[var(--accent-hover)] transition-colors">
                          {progressPercentage === 100 ? 'Review' : 'Continue'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}