"use client";
import React, { useRef, useState } from "react";
import { useUserStore } from "@/store/loginStore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGraduationCap, 
  FaSignOutAlt, 
  FaDownload, 
  FaEdit, 
  FaTrash, 
  FaUser, 
  FaEye, 
  FaTrophy,
  FaCalendar,
  FaClock,
  FaStar,
  FaAward,
  FaCog,
  FaShield,
  FaBook,
  FaFire
} from "react-icons/fa";
import html2canvas from "html2canvas";

const Profile = () => {
  const { user, logout } = useUserStore();
  const certificateRef = useRef();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 bg-[var(--background)]">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-xl text-[var(--foreground)] mb-4">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  const handleDownloadCertificate = async (tutorial) => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, { 
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true
    });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${tutorial.title.replace(/\s+/g, '_')}_certificate.png`;
    link.click();
  };

  const handleDeactivate = () => {
    if (confirm("Are you sure you want to deactivate your account? You can reactivate later.")) {
      alert("Account deactivation functionality would go here!");
    }
  };

  const handleDelete = () => {
    if (confirm("This action cannot be undone. All your data will be permanently deleted. Are you sure?")) {
      alert("Account deletion functionality would go here!");
    }
  };

  const handleSaveProfile = () => {
    // In a real app, you'd update the user in the backend here
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleViewTutorial = (tutorialId) => {
    // Navigate to tutorial page
    alert(`Would navigate to tutorial ${tutorialId}`);
  };

  const stats = {
    totalEnrolled: user.totalEnrolled || 8,
    completed: user.completedTutorials?.length || 5,
    inProgress: 3,
    totalHours: 24,
    streak: 7,
    level: "Intermediate"
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "achievements", label: "Achievements", icon: <FaTrophy /> },
    { id: "certificates", label: "Certificates", icon: <FaAward /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const achievements = [
    { id: 1, name: "First Steps", description: "Complete your first tutorial", earned: true, icon: "🚀" },
    { id: 2, name: "Quick Learner", description: "Complete 5 tutorials", earned: true, icon: "⚡" },
    { id: 3, name: "Dedicated", description: "7-day learning streak", earned: true, icon: "🔥" },
    { id: 4, name: "Expert", description: "Complete 20 tutorials", earned: false, icon: "🎓" },
    { id: 5, name: "Speed Demon", description: "Complete a tutorial in one sitting", earned: false, icon: "💨" },
  ];

  return (
    <div className="min-h-screen p-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-3xl shadow-xl mb-8"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar Section */}
            <div className="relative">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-2xl object-cover border-4 border-[var(--accent)] shadow-lg"
              />
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute -bottom-2 -right-2 p-2 bg-[var(--accent)] text-white rounded-full hover:bg-[var(--accent-hover)] transition-all shadow-lg"
              >
                <FaEdit />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-[var(--muted)] mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <FaCalendar />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <FaTrophy />
                  <span>Level {stats.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <FaFire />
                  <span>{stats.streak} day streak</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDeactivate}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-500/10 text-yellow-600 rounded-xl hover:bg-yellow-500/20 transition border border-yellow-500/20"
              >
                <FaUser />
                Deactivate
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition border border-red-500/20"
              >
                <FaTrash />
                Delete Account
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Enrolled", value: stats.totalEnrolled, icon: <FaBook />, color: "blue" },
            { label: "Completed", value: stats.completed, icon: <FaGraduationCap />, color: "green" },
            { label: "In Progress", value: stats.inProgress, icon: <FaClock />, color: "yellow" },
            { label: "Learning Hours", value: stats.totalHours, icon: <FaStar />, color: "purple" },
          ].map((stat, index) => (
            <div key={stat.label} className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <div className={`text-2xl mb-2 flex justify-center text-${stat.color}-500`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-[var(--foreground)] mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Tabs */}
        <div className="glass p-2 rounded-2xl mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--accent)] text-white shadow-lg"
                  : "text-[var(--foreground)] hover:bg-[var(--accent)]/10"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass p-8 rounded-3xl shadow-xl"
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
                  <FaGraduationCap className="text-[var(--accent)]" />
                  Learning Progress
                </h2>

                {user.completedTutorials?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No tutorials completed yet</h3>
                    <p className="text-[var(--muted)]">Start your learning journey to see your progress here!</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {user.completedTutorials?.map((tutorial, index) => (
                      <motion.div
                        key={tutorial.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent)]/50 transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                            {tutorial.title}
                          </h3>
                          <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                            Completed
                          </span>
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleDownloadCertificate(tutorial)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                          >
                            <FaDownload />
                            Certificate
                          </button>
                          <button
                            onClick={() => handleViewTutorial(tutorial.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition"
                          >
                            <FaEye />
                            Review
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
                  <FaTrophy className="text-yellow-500" />
                  Your Achievements
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        achievement.earned
                          ? "border-yellow-500 bg-yellow-500/10"
                          : "border-[var(--border-color)] bg-[var(--card-bg)] opacity-50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{achievement.icon}</div>
                      <h3 className="font-semibold text-[var(--foreground)] mb-1">{achievement.name}</h3>
                      <p className="text-sm text-[var(--muted)]">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "certificates" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
                  <FaAward className="text-[var(--accent)]" />
                  Certificates
                </h2>
                {user.completedTutorials?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">No certificates yet</h3>
                    <p className="text-[var(--muted)]">Complete tutorials to earn certificates!</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {user.completedTutorials?.map((tutorial) => (
                      <div key={tutorial.id} className="flex items-center justify-between p-4 rounded-2xl border border-[var(--border-color)]">
                        <div>
                          <h3 className="font-semibold text-[var(--foreground)]">{tutorial.title}</h3>
                          <p className="text-sm text-[var(--muted)]">Completed on {new Date().toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={() => handleDownloadCertificate(tutorial)}
                          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition"
                        >
                          <FaDownload />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-3">
                  <FaCog className="text-[var(--accent)]" />
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-[var(--border-color)]">
                    <h3 className="font-semibold text-[var(--foreground)] mb-2">Profile Information</h3>
                    <p className="text-sm text-[var(--muted)] mb-4">Update your personal information</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition"
                    >
                      Edit Profile
                    </button>
                  </div>
                  
                  <div className="p-4 rounded-2xl border border-[var(--border-color)]">
                    <h3 className="font-semibold text-[var(--foreground)] mb-2">Security</h3>
                    <p className="text-sm text-[var(--muted)] mb-4">Manage your account security</p>
                    <button className="px-4 py-2 bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hidden Certificate Template */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        {user.completedTutorials?.map((tutorial) => (
          <div
            key={tutorial.id}
            ref={certificateRef}
            className="w-[800px] h-[600px] p-16 bg-white text-black border-[20px] border-indigo-500 rounded-[40px] flex flex-col items-center justify-center font-sans shadow-2xl"
          >
            <div className="text-6xl font-bold text-indigo-600 mb-8 text-center">Certificate of Completion</div>
            <div className="text-2xl mb-6 text-gray-600 text-center">This certifies that</div>
            <div className="text-5xl font-semibold text-gray-800 mb-4 text-center">{user.name}</div>
            <div className="text-2xl mb-8 text-gray-600 text-center">has successfully completed the course</div>
            <div className="text-4xl font-medium text-indigo-700 mb-12 text-center">{tutorial.title}</div>
            <div className="text-xl text-gray-500 text-center">Congratulations on your outstanding achievement!</div>
            <div className="mt-12 text-lg text-gray-400">Issued on {new Date().toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;