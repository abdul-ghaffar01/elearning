"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaSave, 
  FaArrowLeft, 
  FaPlus, 
  FaTrash, 
  FaVideo, 
  FaFile, 
  FaQuestionCircle,
  FaClock,
  FaDollarSign,
  FaGlobe,
  FaTag,
  FaImage,
  FaYoutube,
  FaLink
} from "react-icons/fa";

const UpdateTutorialPage = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSaving, setIsSaving] = useState(false);
  const [tutorialData, setTutorialData] = useState({
    title: "Mastering Next.js 14 with App Router",
    description: "Learn how to build modern, high-performance web applications using Next.js 14, App Router, Server Components, and the latest React patterns.",
    price: 89.99,
    originalPrice: 129.99,
    category: "web-development",
    level: "intermediate",
    language: "english",
    thumbnail: "/tutorial-thumbnail.jpg",
    promoVideo: "",
    tags: ["nextjs", "react", "javascript", "web-development"],
    objectives: [
      "Build full-stack applications with Next.js 14",
      "Master Server Components and App Router",
      "Implement authentication and authorization"
    ],
    requirements: [
      "Basic knowledge of JavaScript",
      "Familiarity with React",
      "Node.js installed"
    ],
    curriculum: [
      {
        id: 1,
        module: "Getting Started",
        lessons: [
          { id: 1, title: "Introduction to Next.js 14", duration: "15:30", type: "video", content: "" },
          { id: 2, title: "Setting Up Development Environment", duration: "22:15", type: "video", content: "" }
        ]
      }
    ]
  });

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleInputChange = (section, field, value) => {
    setTutorialData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayUpdate = (field, value, index = null) => {
    if (index !== null) {
      setTutorialData(prev => ({
        ...prev,
        [field]: prev[field].map((item, i) => i === index ? value : item)
      }));
    } else {
      setTutorialData(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
  };

  const handleRemoveItem = (field, index) => {
    setTutorialData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    // Handle success
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: FaTag },
    { id: "content", label: "Content", icon: FaFile },
    { id: "curriculum", label: "Curriculum", icon: FaVideo },
    { id: "pricing", label: "Pricing", icon: FaDollarSign },
    { id: "settings", label: "Settings", icon: FaGlobe }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="glass border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-[var(--accent)]/10 transition">
                <FaArrowLeft />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Edit Tutorial</h1>
                <p className="text-[var(--muted)]">Update your course content and settings</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl font-semibold transition disabled:opacity-50"
            >
              <FaSave className={isSaving ? "animate-spin" : ""} />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="glass rounded-2xl p-2 mb-8">
          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition ${
                    activeTab === tab.id
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/10"
                  }`}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              key={activeTab}
              initial="initial"
              animate="animate"
              variants={fadeUp}
            >
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Course Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Course Title</label>
                        <input
                          type="text"
                          value={tutorialData.title}
                          onChange={(e) => setTutorialData(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          placeholder="Enter course title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={tutorialData.description}
                          onChange={(e) => setTutorialData(prev => ({ ...prev, description: e.target.value }))}
                          rows={6}
                          className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                          placeholder="Describe what students will learn"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Learning Objectives</h3>
                    <div className="space-y-3">
                      {tutorialData.objectives.map((objective, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={objective}
                            onChange={(e) => handleArrayUpdate('objectives', e.target.value, index)}
                            className="flex-1 p-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          />
                          <button
                            onClick={() => handleRemoveItem('objectives', index)}
                            className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => handleArrayUpdate('objectives', '')}
                        className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-[var(--border-color)] rounded-xl text-[var(--muted)] hover:text-[var(--foreground)] transition"
                      >
                        <FaPlus />
                        Add Learning Objective
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === "curriculum" && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Course Curriculum</h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-xl">
                        <FaPlus />
                        Add Module
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {tutorialData.curriculum.map((module, moduleIndex) => (
                        <div key={module.id} className="border border-[var(--border-color)] rounded-2xl overflow-hidden">
                          <div className="p-4 bg-[var(--accent)]/10 border-b border-[var(--border-color)]">
                            <input
                              type="text"
                              value={module.module}
                              onChange={(e) => {
                                const newCurriculum = [...tutorialData.curriculum];
                                newCurriculum[moduleIndex].module = e.target.value;
                                setTutorialData(prev => ({ ...prev, curriculum: newCurriculum }));
                              }}
                              className="w-full bg-transparent text-lg font-semibold focus:outline-none"
                            />
                          </div>
                          
                          <div className="p-4 space-y-3">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex items-center gap-4 p-3 bg-[var(--background)] rounded-xl">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    lesson.type === "video" ? "bg-blue-500/20 text-blue-500" : 
                                    lesson.type === "reading" ? "bg-green-500/20 text-green-500" : 
                                    "bg-purple-500/20 text-purple-500"
                                  }`}>
                                    {lesson.type === "video" ? <FaVideo /> : 
                                     lesson.type === "reading" ? <FaFile /> : 
                                     <FaQuestionCircle />}
                                  </div>
                                  <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => {
                                      const newCurriculum = [...tutorialData.curriculum];
                                      newCurriculum[moduleIndex].lessons[lessonIndex].title = e.target.value;
                                      setTutorialData(prev => ({ ...prev, curriculum: newCurriculum }));
                                    }}
                                    className="flex-1 bg-transparent focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={lesson.duration}
                                    onChange={(e) => {
                                      const newCurriculum = [...tutorialData.curriculum];
                                      newCurriculum[moduleIndex].lessons[lessonIndex].duration = e.target.value;
                                      setTutorialData(prev => ({ ...prev, curriculum: newCurriculum }));
                                    }}
                                    className="w-20 bg-transparent text-[var(--muted)] focus:outline-none"
                                    placeholder="Duration"
                                  />
                                </div>
                                <button
                                  onClick={() => {
                                    const newCurriculum = [...tutorialData.curriculum];
                                    newCurriculum[moduleIndex].lessons = newCurriculum[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
                                    setTutorialData(prev => ({ ...prev, curriculum: newCurriculum }));
                                  }}
                                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                            
                            <button className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-[var(--border-color)] rounded-xl text-[var(--muted)] hover:text-[var(--foreground)] transition">
                              <FaPlus />
                              Add Lesson
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Tab */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Pricing</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Price ($)</label>
                        <div className="relative">
                          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)]" />
                          <input
                            type="number"
                            value={tutorialData.price}
                            onChange={(e) => setTutorialData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                            className="w-full pl-10 p-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Original Price ($)</label>
                        <div className="relative">
                          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)]" />
                          <input
                            type="number"
                            value={tutorialData.originalPrice}
                            onChange={(e) => setTutorialData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                            className="w-full pl-10 p-3 rounded-xl bg-[var(--background)] border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold mb-4">Course Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--muted)]">Status</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">Published</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--muted)]">Students</span>
                  <span className="font-semibold">28,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--muted)]">Rating</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold mb-4">Preview</h3>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[var(--border-color)] rounded-xl hover:bg-[var(--accent)]/10 transition">
                <FaImage />
                View Course Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTutorialPage;