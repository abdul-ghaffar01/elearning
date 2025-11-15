"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useUserStore } from "@/store/loginStore";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login, user } = useUserStore();
  const [loginStep, setLoginStep] = useState("login"); // 'login', 'role', 'profile'
  const [userData, setUserData] = useState({
    role: "",
    name: "",
    email: "",
    avatar: "",
    bio: "",
    expertise: "",
    institution: "",
    gradeLevel: "",
    interests: [],
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, user, router]);

  const handleGoogleLogin = () => {
    // Simulate Google login response
    const googleUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    };
    
    setUserData(prev => ({
      ...prev,
      ...googleUser
    }));
    setLoginStep("role");
  };

  const handleRoleSelect = (role) => {
    setUserData(prev => ({ ...prev, role }));
    setLoginStep("profile");
  };

  const handleProfileSubmit = (finalData) => {
    const completeUser = {
      ...finalData,
      enrolledTutorials: [],
      createdAt: new Date().toISOString(),
      isProfileComplete: true
    };
    
    login(completeUser);
    router.push("/dashboard");
  };

  if (isLoggedIn) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <AnimatePresence mode="wait">
        {loginStep === "login" && (
          <LoginStep key="login" onLogin={handleGoogleLogin} />
        )}
        
        {loginStep === "role" && (
          <RoleSelectionStep 
            key="role" 
            onRoleSelect={handleRoleSelect}
            userData={userData}
          />
        )}
        
        {loginStep === "profile" && (
          <ProfileSetupStep
            key="profile"
            userData={userData}
            onSubmit={handleProfileSubmit}
            onBack={() => setLoginStep("role")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Component 1: Initial Login
function LoginStep({ onLogin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md p-10 rounded-3xl glass shadow-xl flex flex-col items-center text-center"
    >
      <h1 className="text-4xl font-bold mb-4 text-[var(--foreground)]">
        Welcome Back!
      </h1>
      <p className="text-[var(--muted)] mb-8">
        Login with your Google account to continue learning
      </p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px var(--accent)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onLogin}
        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-medium shadow-md transition"
      >
        <FcGoogle size={24} /> Login with Google
      </motion.button>
    </motion.div>
  );
}

// Component 2: Role Selection
function RoleSelectionStep({ onRoleSelect, userData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md p-10 rounded-3xl glass shadow-xl flex flex-col items-center text-center"
    >
      <h1 className="text-3xl font-bold mb-2 text-[var(--foreground)]">
        Tell us about yourself
      </h1>
      <p className="text-[var(--muted)] mb-8">
        How would you like to use our platform?
      </p>

      <div className="w-full space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoleSelect("student")}
          className="w-full p-6 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] hover:border-[var(--accent)] transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">Student</h3>
              <p className="text-sm text-[var(--muted)]">
                I want to learn and take courses
              </p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoleSelect("instructor")}
          className="w-full p-6 rounded-xl bg-[var(--card)] border-2 border-[var(--border)] hover:border-[var(--accent)] transition-all text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">Instructor</h3>
              <p className="text-sm text-[var(--muted)]">
                I want to teach and create courses
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      <p className="text-xs text-[var(--muted)] mt-6">
        You can change this later in your profile settings
      </p>
    </motion.div>
  );
}

// Component 3: Profile Setup
function ProfileSetupStep({ userData, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    name: userData.name || "",
    bio: "",
    expertise: "",
    institution: "",
    gradeLevel: "",
    interests: [],
  });

  const studentInterests = [
    "Mathematics", "Science", "Programming", "History", 
    "Art & Design", "Languages", "Business", "Technology"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...userData,
      ...formData,
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${formData.name}&background=random`
    };
    onSubmit(finalData);
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md p-8 rounded-3xl glass shadow-xl"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition"
      >
        ← Back
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Complete Your Profile
        </h1>
        <p className="text-[var(--muted)] mt-2">
          {userData.role === "student" 
            ? "Tell us about your learning goals" 
            : "Tell us about your teaching experience"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            rows={3}
            className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
            placeholder={userData.role === "student" 
              ? "Tell us about your learning interests and goals..." 
              : "Tell us about your teaching experience and expertise..."}
          />
        </div>

        {userData.role === "student" && (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Grade Level / Institution
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="e.g., High School, University, Self-taught"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {studentInterests.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {userData.role === "instructor" && (
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Areas of Expertise
            </label>
            <input
              type="text"
              value={formData.expertise}
              onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
              className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="e.g., Mathematics, Programming, Design, Science"
            />
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium shadow-md transition"
        >
          Complete Setup
        </motion.button>
      </form>
    </motion.div>
  );
}