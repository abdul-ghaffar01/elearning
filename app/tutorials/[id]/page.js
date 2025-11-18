"use client";
import React, { use, useState } from 'react';
import { motion } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaUsers,
  FaBook,
  FaPlay,
  FaCheck,
  FaArrowLeft,
  FaShare,
  FaHeart,
  FaRegHeart,
  FaGlobe,
  FaCertificate
} from "react-icons/fa";
import Link from 'next/link';
import { tutorialsData } from '@/components/dashboard/tabs/AllTutorials';

const TutorialDetailPage = ({ params }) => {
  const { id } = use(params)
  const tutorialId = parseInt(id);
  const tutorial = tutorialsData.find(tut => tut.id === tutorialId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tutorial Not Found</h1>
          <Link href="/tutorials" className="text-accent hover:underline">
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  const curriculum = [
    {
      section: "Getting Started",
      lessons: [
        { title: "Introduction to the Course", duration: "10:25", free: true },
        { title: "Setting Up Development Environment", duration: "15:30", free: true },
        { title: "Course Resources & Materials", duration: "08:15", free: false }
      ]
    },
    {
      section: "Fundamentals",
      lessons: [
        { title: "Core Concepts & Principles", duration: "22:45", free: false },
        { title: "Hands-on Exercises", duration: "18:20", free: false },
        { title: "Best Practices", duration: "14:10", free: false }
      ]
    },
    {
      section: "Advanced Topics",
      lessons: [
        { title: "Advanced Techniques", duration: "25:30", free: false },
        { title: "Real-world Projects", duration: "32:15", free: false },
        { title: "Performance Optimization", duration: "19:45", free: false }
      ]
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Alex Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment: "This course completely transformed my understanding. The instructor explains complex topics in a very accessible way.",
      avatar: "👨‍💻"
    },
    {
      id: 2,
      user: "Sarah Miller",
      rating: 4,
      date: "1 month ago",
      comment: "Great content and well-structured. The projects were challenging but very rewarding. Would recommend!",
      avatar: "👩‍🎓"
    },
    {
      id: 3,
      user: "Mike Chen",
      rating: 5,
      date: "3 weeks ago",
      comment: "The hands-on approach made all the difference. I was able to apply what I learned immediately at work.",
      avatar: "👨‍💼"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border-color">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/tutorials"
              className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
            >
              <FaArrowLeft />
              Back to Courses
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 text-muted hover:text-accent transition-colors"
              >
                {isFavorite ? <FaHeart className="text-accent" /> : <FaRegHeart />}
              </button>
              <button className="p-2 text-muted hover:text-accent transition-colors">
                <FaShare />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-sm text-muted mb-4">
                <span>{tutorial.category}</span>
                <span>•</span>
                <span>{tutorial.level}</span>
                {tutorial.popular && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs rounded-full">
                      Popular
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {tutorial.title}
              </h1>

              <p className="text-xl text-muted mb-6 leading-relaxed">
                {tutorial.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted mb-6">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-foreground font-medium">{tutorial.rating}</span>
                  <span>({Math.floor(tutorial.students / 10)} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers />
                  <span>{tutorial.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBook />
                  <span>{tutorial.lessons} lessons</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accent-hover flex items-center justify-center text-white font-bold">
                  {tutorial.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold">Created by {tutorial.instructor}</div>
                  <div className="text-sm text-muted">Senior Instructor</div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="border-b border-border-color mb-8">
              <nav className="flex space-x-8">
                {['overview', 'curriculum', 'reviews', 'resources'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors capitalize ${activeTab === tab
                        ? 'border-accent text-accent'
                        : 'border-transparent text-muted hover:text-foreground'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Master fundamental concepts and advanced techniques",
                        "Build real-world projects from scratch",
                        "Apply best practices and industry standards",
                        "Troubleshoot and debug effectively",
                        "Optimize performance and scalability",
                        "Prepare for technical interviews"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <FaCheck className="text-green-500 flex-shrink-0" />
                          <span className="text-muted">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted">
                      <li>Basic programming knowledge recommended</li>
                      <li>Computer with internet connection</li>
                      <li>Willingness to learn and practice</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-6">
                  {curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="glass rounded-2xl border border-border-color overflow-hidden">
                      <div className="p-6 bg-accent/5 border-b border-border-color">
                        <h4 className="font-semibold text-lg">{section.section}</h4>
                        <div className="text-sm text-muted mt-1">
                          {section.lessons.length} lessons • {section.lessons.reduce((acc, lesson) => acc + parseInt(lesson.duration), 0)} min
                        </div>
                      </div>
                      <div className="divide-y divide-border-color">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="p-6 flex items-center justify-between hover:bg-accent/5 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center">
                                <FaPlay className="text-xs text-muted" />
                              </div>
                              <div>
                                <div className="font-medium">{lesson.title}</div>
                                <div className="text-sm text-muted">{lesson.duration}</div>
                              </div>
                            </div>
                            {lesson.free && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-600 text-xs rounded-full">
                                Free
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-6 border border-border-color">
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-foreground">{tutorial.rating}</div>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.floor(tutorial.rating) ? "text-yellow-400" : "text-muted"}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted mt-1">Course Rating</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3 text-sm mb-2">
                            <div className="flex items-center gap-1 w-12">
                              <span>{star}</span>
                              <FaStar className="text-yellow-400 text-xs" />
                            </div>
                            <div className="flex-1 bg-muted/20 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${(star / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-muted w-12 text-right">{(star / 5 * 100).toFixed(0)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="glass rounded-2xl p-6 border border-border-color">
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">{review.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <div className="font-semibold">{review.user}</div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={i < review.rating ? "text-yellow-400 text-sm" : "text-muted text-sm"}
                                  />
                                ))}
                              </div>
                              <div className="text-sm text-muted">{review.date}</div>
                            </div>
                            <p className="text-muted leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  {[
                    { name: "Course Slides PDF", type: "PDF", size: "2.4 MB" },
                    { name: "Source Code Repository", type: "ZIP", size: "15.8 MB" },
                    { name: "Cheat Sheets", type: "PDF", size: "1.2 MB" },
                    { name: "Additional Reading Materials", type: "PDF", size: "3.7 MB" }
                  ].map((resource, index) => (
                    <div key={index} className="glass rounded-2xl p-4 border border-border-color flex items-center justify-between hover:bg-accent/5 transition-colors">
                      <div>
                        <div className="font-medium">{resource.name}</div>
                        <div className="text-sm text-muted">{resource.type} • {resource.size}</div>
                      </div>
                      <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8"
            >
              <div className="glass rounded-2xl border border-border-color overflow-hidden">
                {/* Course Preview */}
                <div className="relative">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 transition-transform">
                      <FaPlay className="text-xl ml-1" />
                    </button>
                  </div>
                </div>

                {/* Pricing & Enrollment */}
                <div className="p-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${tutorial.price}
                  </div>
                  <div className="text-sm text-muted mb-6">
                    One-time payment. Lifetime access.
                  </div>

                  <button className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 mb-4 flex items-center justify-center gap-2
                    ${tutorial.enrolled
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      : "bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent"
                    }`}
                  >
                    {tutorial.enrolled ? (
                      <>
                        <FaPlay />
                        Continue Learning
                      </>
                    ) : (
                      "Enroll Now"
                    )}
                  </button>

                  <div className="text-center text-sm text-muted mb-6">
                    30-day money-back guarantee
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span>Direct instructor support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share & Certificate */}
              <div className="glass rounded-2xl border border-border-color p-6 mt-6">
                <h4 className="font-semibold mb-4">This course includes</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <FaClock className="text-accent" />
                    <span>{tutorial.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaBook className="text-accent" />
                    <span>{tutorial.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaCertificate className="text-accent" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FaGlobe className="text-accent" />
                    <span>Full lifetime access</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetailPage;