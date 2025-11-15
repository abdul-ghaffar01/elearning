"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useUserStore } from "@/store/loginStore";
import { FaRocket, FaGraduationCap, FaCode, FaStar, FaUsers, FaLightbulb, FaArrowRight, FaPlay, FaChartLine } from "react-icons/fa";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay, 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const floatAnimation = {
  animate: { 
    y: [0, -20, 0],
    rotate: [0, 5, 0]
  },
  transition: { 
    duration: 8, 
    repeat: Infinity, 
    ease: "easeInOut" 
  },
};

export default function LandingPage() {
  const { isLoggedIn, user, login } = useUserStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    mouseX.set(clientX / width - 0.5);
    mouseY.set(clientY / height - 0.5);
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const features = [
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Lightning Fast",
      desc: "Built with Next.js 14 for instant page loads and optimal performance.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Expert-Led",
      desc: "Learn from industry professionals with real-world experience.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaCode className="text-2xl" />,
      title: "Hands-On Coding",
      desc: "Interactive coding exercises and live projects.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Community Driven",
      desc: "Join thousands of learners in our active community.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Smart Learning",
      desc: "AI-powered recommendations and personalized paths.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Track Progress",
      desc: "Visualize your learning journey with detailed analytics.",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "500+", label: "Courses" },
    { number: "50+", label: "Expert Instructors" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl top-[-10%] left-[-10%]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl bottom-[-5%] right-[-5%]"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 max-w-6xl w-full my-20"
      >
        <motion.div
          variants={fadeUp()}
          className="glass p-12 md:p-16 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-xl"
          style={{ rotateX, rotateY }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium mb-8"
          >
            <FaStar className="text-yellow-300" />
            Trusted by 10,000+ developers
          </motion.div>

          <motion.h1 
            variants={fadeUp(0.3)}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-slate-800 to-purple-600 dark:from-white dark:to-purple-200 bg-clip-text text-transparent"
          >
            Code Your Future
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Starts Here
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeUp(0.5)}
            className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Master modern web development with interactive courses, real-world projects, 
            and a community that helps you grow from beginner to job-ready.
          </motion.p>

          {!isLoggedIn ? (
            <motion.div variants={fadeUp(0.7)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => login({ 
                  name: "Demo User", 
                  email: "demo@example.com",
                  role: "student" 
                })}
                className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <FaPlay className="text-sm" />
                Start Learning Free
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl font-semibold border-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUp(0.7)}
              className="flex flex-col md:flex-row items-center justify-center gap-6"
            >
              <div className="text-center md:text-left">
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-2">
                  Welcome back,
                </p>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user?.name || "Awesome Learner"}! 🎉
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/tutorials"
                  className="px-6 py-3 rounded-xl glass hover:shadow-lg border border-white/20 hover:border-purple-300 dark:hover:border-purple-600 font-medium flex items-center gap-2 transition-all group"
                >
                  Explore Courses
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/u/dashboard"
                  className="px-6 py-3 rounded-xl font-medium text-white shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
                >
                  <FaChartLine />
                  My Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 max-w-4xl w-full mb-24"
      >
        <motion.div variants={fadeUp()} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp(0.1 * index)}
              className="text-center p-6 rounded-2xl glass border border-white/20 hover:shadow-lg transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-400 mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 max-w-6xl w-full mb-24"
      >
        <motion.div variants={fadeUp()} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-purple-600 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
            Why Learn With Us?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We've reimagined online learning for the modern developer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp(0.1 * index)}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group p-8 rounded-3xl glass border border-white/20 hover:shadow-2xl hover:border-purple-200 dark:hover:border-purple-600 cursor-pointer transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.8)}
        className="relative z-10 max-w-4xl w-full text-center"
      >
        <div className="glass p-12 rounded-3xl border border-white/20 backdrop-blur-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've transformed their careers with our platform.
          </p>
          {!isLoggedIn && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => login({ 
                name: "Demo User", 
                email: "demo@example.com",
                role: "student" 
              })}
              className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-3 mx-auto"
            >
              <FaRocket />
              Launch Your Career Today
            </motion.button>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 mt-20 py-8 text-slate-600 dark:text-slate-400"
      >
        <p>Built with ❤️ for the developer community</p>
      </motion.footer>
    </div>
  );
}