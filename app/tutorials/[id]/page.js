"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlay, 
  FaClock, 
  FaUser, 
  FaStar, 
  FaBook, 
  FaDownload, 
  FaShare, 
  FaHeart, 
  FaChevronRight,
  FaCode,
  FaVideo,
  FaFile,
  FaCheckCircle,
  FaLock,
  FaUsers,
  FaLevelUpAlt,
  FaGlobe,
  FaCertificate
} from "react-icons/fa";

const TutorialPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState("enrolled"); // "enrolled", "not-enrolled", "completed"

  // Mock tutorial data
  const tutorialData = {
    id: 1,
    title: "Mastering Next.js 14 with App Router",
    description: "Learn how to build modern, high-performance web applications using Next.js 14, App Router, Server Components, and the latest React patterns.",
    instructor: {
      name: "Sarah Johnson",
      avatar: "/instructor-avatar.jpg",
      rating: 4.9,
      students: 12500,
      courses: 15
    },
    stats: {
      duration: "12 hours",
      lessons: 45,
      level: "Intermediate",
      rating: 4.8,
      reviews: 1247,
      students: 28450
    },
    features: [
      "Lifetime Access",
      "Certificate of Completion",
      "Project Files",
      "Q&A Support",
      "Mobile App Access"
    ],
    curriculum: [
      {
        module: "Getting Started",
        lessons: [
          { id: 1, title: "Introduction to Next.js 14", duration: "15:30", type: "video", free: true },
          { id: 2, title: "Setting Up Development Environment", duration: "22:15", type: "video", free: true },
          { id: 3, title: "Project Structure Overview", duration: "18:45", type: "reading", free: false }
        ]
      },
      {
        module: "App Router Fundamentals",
        lessons: [
          { id: 4, title: "Understanding App Router", duration: "25:20", type: "video", free: false },
          { id: 5, title: "Server vs Client Components", duration: "32:10", type: "video", free: false },
          { id: 6, title: "Routing and Navigation", duration: "28:35", type: "video", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Alex Chen",
        rating: 5,
        comment: "This course completely changed how I build web applications. The App Router explanation was exceptional!",
        date: "2 weeks ago"
      },
      {
        id: 2,
        user: "Maria Garcia",
        rating: 4,
        comment: "Great content, but some sections could use more real-world examples. Overall very valuable.",
        date: "1 month ago"
      }
    ]
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/10 via-transparent to-[var(--accent-hover)]/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Left Content */}
            <motion.div variants={fadeUp}>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
                <span>Development</span>
                <FaChevronRight className="text-xs" />
                <span>Web Development</span>
                <FaChevronRight className="text-xs" />
                <span className="text-[var(--accent)]">Next.js</span>
              </nav>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight mb-6">
                {tutorialData.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
                {tutorialData.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <FaStar className="text-[var(--accent)]" />
                  <span className="font-semibold text-[var(--foreground)]">{tutorialData.stats.rating}</span>
                  <span className="text-[var(--muted)]">({tutorialData.stats.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-[var(--accent)]" />
                  <span className="text-[var(--muted)]">{tutorialData.stats.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[var(--accent)]" />
                  <span className="text-[var(--muted)]">{tutorialData.stats.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLevelUpAlt className="text-[var(--accent)]" />
                  <span className="text-[var(--muted)]">{tutorialData.stats.level}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-4 glass rounded-2xl">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-bold">
                  SJ
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Created by {tutorialData.instructor.name}</p>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                    <FaStar className="text-[var(--accent)]" />
                    <span>{tutorialData.instructor.rating} Instructor Rating</span>
                    <span>•</span>
                    <span>{tutorialData.instructor.students.toLocaleString()} Students</span>
                    <span>•</span>
                    <span>{tutorialData.instructor.courses} Courses</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Enrollment Card */}
            <motion.div 
              variants={fadeUp}
              className="lg:sticky lg:top-24"
            >
              <div className="glass rounded-3xl shadow-2xl overflow-hidden">
                {/* Preview Video */}
                <div className="relative aspect-video bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)]">
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                  </button>
                </div>

                {/* Pricing & Enrollment */}
                <div className="p-8">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-[var(--foreground)]">$89.99</span>
                    <span className="text-[var(--muted)] line-through">$129.99</span>
                    <span className="bg-[var(--accent)] text-white text-sm px-2 py-1 rounded-full">30% OFF</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {tutorialData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheckCircle className="text-[var(--accent)] flex-shrink-0" />
                        <span className="text-[var(--foreground)]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {enrollmentStatus === "not-enrolled" ? (
                      <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                        Enroll Now - $89.99
                      </button>
                    ) : enrollmentStatus === "enrolled" ? (
                      <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-4 rounded-xl transition-all">
                        Continue Learning
                      </button>
                    ) : (
                      <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-4 rounded-xl transition-all">
                        View Certificate
                      </button>
                    )}
                    
                    <button className="w-full border-2 border-[var(--border-color)] text-[var(--foreground)] font-semibold py-4 rounded-xl hover:bg-[var(--accent)]/10 transition-all">
                      Add to Wishlist
                    </button>
                  </div>

                  {/* Guarantee */}
                  <div className="text-center mt-6">
                    <p className="text-sm text-[var(--muted)]">
                      30-Day Money-Back Guarantee • Full Lifetime Access
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="border-b border-[var(--border-color)]">
          <nav className="flex space-x-8">
            {["overview", "curriculum", "reviews", "instructor"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* What You'll Learn */}
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Build full-stack applications with Next.js 14",
                      "Master Server Components and App Router",
                      "Implement authentication and authorization",
                      "Deploy to production with best practices",
                      "Optimize performance and SEO",
                      "Work with databases and APIs"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheckCircle className="text-[var(--accent)] flex-shrink-0" />
                        <span className="text-[var(--foreground)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="glass rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-[var(--foreground)] mb-4">Requirements</h4>
                  <ul className="space-y-2 text-[var(--foreground)]">
                    <li>• Basic knowledge of JavaScript</li>
                    <li>• Familiarity with React</li>
                    <li>• Node.js installed</li>
                    <li>• Code editor (VS Code recommended)</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "curriculum" && (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">Course Content</h3>
                  <div className="text-[var(--muted)]">
                    {tutorialData.curriculum.reduce((total, module) => total + module.lessons.length, 0)} lessons • {tutorialData.stats.duration}
                  </div>
                </div>

                <div className="space-y-4">
                  {tutorialData.curriculum.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="glass rounded-2xl overflow-hidden">
                      <div className="p-6 bg-[var(--accent)]/10 border-b border-[var(--border-color)]">
                        <h4 className="font-semibold text-[var(--foreground)] flex items-center gap-3">
                          <FaBook className="text-[var(--accent)]" />
                          {module.module}
                        </h4>
                      </div>
                      <div className="divide-y divide-[var(--border-color)]">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="p-4 hover:bg-[var(--accent)]/5 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  lesson.free ? 'bg-[var(--accent)]/20 text-[var(--accent)]' : 'bg-[var(--accent)]/10 text-[var(--accent)]'
                                }`}>
                                  {lesson.type === "video" ? <FaVideo /> : <FaFile />}
                                </div>
                                <div>
                                  <h5 className="font-medium text-[var(--foreground)]">{lesson.title}</h5>
                                  <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                                    <span>{lesson.duration}</span>
                                    {lesson.free && <span className="bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-1 rounded-full text-xs">Free</span>}
                                  </div>
                                </div>
                              </div>
                              {lesson.free ? (
                                <FaPlay className="text-[var(--muted)]" />
                              ) : (
                                <FaLock className="text-[var(--muted)]" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Student Reviews</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-[var(--foreground)]">{tutorialData.stats.rating}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} className={`${
                              star <= Math.floor(tutorialData.stats.rating) 
                                ? 'text-[var(--accent)]' 
                                : 'text-[var(--muted)]'
                            }`} />
                          ))}
                        </div>
                        <p className="text-[var(--muted)]">Course Rating • {tutorialData.stats.reviews} reviews</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {tutorialData.reviews.map((review) => (
                    <div key={review.id} className="glass rounded-2xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-bold">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-semibold text-[var(--foreground)]">{review.user}</h5>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar key={star} className={`${
                                  star <= review.rating 
                                    ? 'text-[var(--accent)]' 
                                    : 'text-[var(--muted)]'
                                } text-sm`} />
                              ))}
                            </div>
                            <span className="text-sm text-[var(--muted)]">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[var(--foreground)] leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "instructor" && (
              <motion.div
                key="instructor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">About the Instructor</h3>
                  <div className="glass rounded-2xl p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        SJ
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[var(--foreground)] mb-2">{tutorialData.instructor.name}</h4>
                        <p className="text-[var(--muted)] mb-4">Senior Full-Stack Developer & Educator</p>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[var(--foreground)]">{tutorialData.instructor.rating}</div>
                            <div className="text-sm text-[var(--muted)]">Instructor Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[var(--foreground)]">{tutorialData.instructor.reviews}</div>
                            <div className="text-sm text-[var(--muted)]">Reviews</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[var(--foreground)]">{tutorialData.instructor.students.toLocaleString()}</div>
                            <div className="text-sm text-[var(--muted)]">Students</div>
                          </div>
                        </div>
                        <p className="text-[var(--foreground)] leading-relaxed">
                          With over 8 years of experience in web development, Sarah specializes in React, Next.js, and modern 
                          JavaScript frameworks. She's passionate about teaching and has helped thousands of students worldwide 
                          launch their development careers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-6">
                    <h4 className="font-semibold text-[var(--foreground)] mb-4">Other Courses</h4>
                    <div className="space-y-4">
                      {["Advanced React Patterns", "TypeScript Masterclass", "Node.js Backend Development"].map((course, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 hover:bg-[var(--accent)]/10 rounded-lg transition-colors cursor-pointer">
                          <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white">
                            <FaCode />
                          </div>
                          <div>
                            <h5 className="font-medium text-[var(--foreground)] text-sm">{course}</h5>
                            <p className="text-xs text-[var(--muted)]">By {tutorialData.instructor.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              question: "Can I take this course if I'm a beginner?",
              answer: "Yes! This course starts with fundamentals and gradually progresses to advanced topics. Basic JavaScript knowledge is recommended."
            },
            {
              question: "How long will I have access to the course?",
              answer: "You'll have lifetime access to the course content, including future updates and additions."
            },
            {
              question: "Is there a certificate upon completion?",
              answer: "Yes, you'll receive a certificate of completion that you can share on LinkedIn and other professional platforms."
            }
          ].map((faq, index) => (
            <div key={index} className="glass rounded-2xl p-6">
              <h4 className="font-semibold text-[var(--foreground)] mb-2">{faq.question}</h4>
              <p className="text-[var(--foreground)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TutorialPage;