"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaRocket, 
  FaUsers, 
  FaGraduationCap, 
  FaHeart, 
  FaAward, 
  FaGlobe, 
  FaLightbulb,
  FaCode,
  FaShieldAlt,
  FaHandshake,
  FaChartLine,
  FaStar,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaArrowRight
} from "react-icons/fa";

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

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    bio: "Former Google Engineering Manager with 15+ years in tech education",
    image: "👩‍💼",
    specialties: ["Curriculum Design", "Tech Education", "Leadership"],
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Marcus Rodriguez",
    role: "Head of Engineering",
    bio: "Full-stack architect passionate about making coding accessible",
    image: "👨‍💻",
    specialties: ["System Architecture", "DevOps", "Mentoring"],
    social: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Dr. Emily Watson",
    role: "Curriculum Director",
    bio: "PhD in Computer Science with focus on learning methodologies",
    image: "👩‍🎓",
    specialties: ["Learning Science", "Course Design", "Assessment"],
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Alex Thompson",
    role: "Community Lead",
    bio: "Dedicated to building supportive learning communities",
    image: "👨‍🏫",
    specialties: ["Community Building", "Student Success", "Events"],
    social: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const values = [
  {
    icon: <FaGraduationCap className="text-2xl" />,
    title: "Learning First",
    description: "Everything we do is centered around effective learning outcomes and student success.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaUsers className="text-2xl" />,
    title: "Community Driven",
    description: "We believe learning happens best when we learn together and support each other.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: "Integrity",
    description: "We maintain the highest standards of quality and transparency in everything we do.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <FaLightbulb className="text-2xl" />,
    title: "Innovation",
    description: "Constantly evolving our platform and teaching methods based on the latest research.",
    color: "from-yellow-500 to-amber-500"
  },
  {
    icon: <FaHandshake className="text-2xl" />,
    title: "Accessibility",
    description: "Making quality education accessible to everyone, regardless of background.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <FaGlobe className="text-2xl" />,
    title: "Global Impact",
    description: "Committed to creating positive change through technology education worldwide.",
    color: "from-indigo-500 to-purple-500"
  }
];

const milestones = [
  { year: "2020", event: "Platform Founded", description: "Started with a vision to democratize tech education" },
  { year: "2021", event: "First 1,000 Students", description: "Reached our first major milestone of active learners" },
  { year: "2022", event: "Mobile App Launch", description: "Expanded learning to mobile devices" },
  { year: "2023", event: "10K+ Community", description: "Grew to over 10,000 active developers" },
  { year: "2024", event: "AI Learning Assistant", description: "Integrated AI-powered personalized learning" }
];

const stats = [
  { number: "50K+", label: "Students Empowered", icon: <FaUsers /> },
  { number: "500+", label: "Expert Instructors", icon: <FaGraduationCap /> },
  { number: "100+", label: "Countries Reached", icon: <FaGlobe /> },
  { number: "98%", label: "Satisfaction Rate", icon: <FaStar /> },
  { number: "10K+", label: "Projects Completed", icon: <FaCode /> },
  { number: "24/7", label: "Support Available", icon: <FaChartLine /> }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl top-[-10%] right-[-10%]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl bottom-[-5%] left-[-5%]"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div
              variants={fadeUp()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent-hover text-white text-sm font-medium mb-8"
            >
              <FaRocket />
              Our Story
            </motion.div>

            <motion.h1 
              variants={fadeUp(0.2)}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            >
              Empowering the Next
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                Generation of Developers
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeUp(0.4)}
              className="text-xl text-muted mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              We're on a mission to make quality tech education accessible to everyone. 
              Through innovative learning methods, expert instruction, and a supportive community, 
              we're helping people worldwide build rewarding careers in technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp(0.1 * index)}
                className="text-center p-6 rounded-2xl glass border border-border-color hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent to-accent-hover flex items-center justify-center text-white mb-4 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted text-sm mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h2 
                variants={fadeUp()}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
              >
                Our Mission & Vision
              </motion.h2>
              
              <motion.div variants={fadeUp(0.2)} className="space-y-6">
                <div className="glass p-6 rounded-2xl border border-border-color">
                  <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-3">
                    <FaLightbulb className="text-accent" />
                    Our Mission
                  </h3>
                  <p className="text-muted leading-relaxed">
                    To democratize technology education by providing accessible, high-quality learning 
                    experiences that empower individuals to transform their careers and lives through code.
                  </p>
                </div>

                <div className="glass p-6 rounded-2xl border border-border-color">
                  <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-3">
                    <FaGlobe className="text-accent" />
                    Our Vision
                  </h3>
                  <p className="text-muted leading-relaxed">
                    A world where anyone, anywhere can learn the skills they need to thrive in the 
                    digital economy, regardless of their background or circumstances.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass p-8 rounded-3xl border border-border-color"
            >
              <div className="text-center">
                <FaQuoteLeft className="text-4xl text-accent mb-6 mx-auto" />
                <blockquote className="text-2xl font-light text-foreground mb-6 italic">
                  "Education is the most powerful weapon which you can use to change the world."
                </blockquote>
                <div className="text-muted font-medium">- Nelson Mandela</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeUp()}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            >
              Our Values
            </motion.h2>
            <motion.p 
              variants={fadeUp(0.2)}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.1 * index)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group p-8 rounded-3xl glass border border-border-color hover:shadow-2xl hover:border-accent cursor-pointer transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeUp()}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              variants={fadeUp(0.2)}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              Passionate educators and technologists dedicated to your success
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.1 * index)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group text-center p-8 rounded-3xl glass border border-border-color hover:shadow-2xl hover:border-accent transition-all duration-300"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {member.name}
                </h3>
                <div className="text-accent font-medium mb-4">{member.role}</div>
                <p className="text-muted text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {member.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-muted hover:text-accent transition-colors">
                      <FaLinkedin />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-muted hover:text-accent transition-colors">
                      <FaTwitter />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-muted hover:text-accent transition-colors">
                      <FaGithub />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-accent/5 via-background to-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeUp()}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            >
              Our Journey
            </motion.h2>
            <motion.p 
              variants={fadeUp(0.2)}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              Milestones in our mission to transform tech education
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent to-accent-hover rounded-full"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeUp(0.2 * index)}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="glass p-6 rounded-2xl border border-border-color hover:shadow-lg transition-all">
                    <div className="text-2xl font-bold text-accent mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-muted">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-accent border-4 border-background"></div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeUp()}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            >
              Join Our Learning Community
            </motion.h2>
            
            <motion.p 
              variants={fadeUp(0.2)}
              className="text-xl text-muted mb-10 max-w-2xl mx-auto"
            >
              Be part of our mission to make tech education accessible to everyone
            </motion.p>

            <motion.div
              variants={fadeUp(0.4)}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/courses"
                className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg flex items-center gap-3 bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent transition-all"
              >
                Explore Courses
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-semibold border-2 border-border-color text-accent hover:bg-accent/10 transition-all"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-border-color">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-foreground">
              <FaHeart className="text-accent" />
              <span className="font-semibold">CodeMastery</span>
            </div>
            
            <div className="flex gap-6 text-muted">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
            
            <div className="text-sm text-muted text-center md:text-right">
              &copy; 2024 CodeMastery. Empowering developers worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}