"use client";
import { useState } from "react";
import TutorialCard from "@/components/TutorialCard";
export const tutorialsData = [
  {
    id: 1,
    title: "Complete Introduction to Databases & SQL for Beginners",
    description: "Learn SQL from scratch with hands-on queries, database design, indexing, normalization, and real-world database management.",
    category: "Databases",
    level: "Beginner",
    rating: 4.8,
    students: 1200,
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "12 hours",
    lessons: 45,
    instructor: "Sarah Chen",
    price: 89.99,
    popular: true
  },
  {
    id: 2,
    title: "Mastering Backend Engineering with GoLang",
    description: "Build scalable microservices, use gRPC, JWT auth, middleware, clean architecture, and deploy production-ready applications.",
    category: "Backend",
    level: "Intermediate",
    rating: 4.7,
    students: 950,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "18 hours",
    lessons: 62,
    instructor: "Marcus Rodriguez",
    price: 129.99,
    popular: true
  },
  {
    id: 3,
    title: "Modern React Development with TypeScript",
    description: "Master React 18, TypeScript, hooks, context API, state management, and build enterprise-level applications.",
    category: "Frontend",
    level: "Intermediate",
    rating: 4.9,
    students: 2100,
    thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "15 hours",
    lessons: 58,
    instructor: "Alex Johnson",
    price: 0,
    popular: true
  },
  {
    id: 4,
    title: "Python for Data Science & Machine Learning",
    description: "Complete guide to data analysis, visualization, machine learning algorithms, and building predictive models with Python.",
    category: "Data Science",
    level: "Beginner",
    rating: 4.6,
    students: 1800,
    thumbnail: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "20 hours",
    lessons: 75,
    instructor: "Dr. Emily Watson",
    price: 149.99,
    popular: false
  },
  {
    id: 5,
    title: "Full Stack Web Development with Next.js 14",
    description: "Build modern full-stack applications with Next.js 14, React, Tailwind CSS, and deploy to production with best practices.",
    category: "Full Stack",
    level: "Advanced",
    rating: 4.8,
    students: 850,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "25 hours",
    lessons: 88,
    instructor: "James Wilson",
    price: 169.99,
    popular: true
  },
  {
    id: 6,
    title: "AWS Cloud Practitioner & Solutions Architect",
    description: "Master AWS services, cloud architecture, security, and prepare for AWS certification exams with hands-on labs.",
    category: "Cloud Computing",
    level: "Intermediate",
    rating: 4.7,
    students: 1300,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "22 hours",
    lessons: 70,
    instructor: "Maria Garcia",
    price: 139.99,
    popular: false
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android using React Native, Expo, and modern mobile development patterns.",
    category: "Mobile",
    level: "Intermediate",
    rating: 4.5,
    students: 1100,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "16 hours",
    lessons: 55,
    instructor: "David Kim",
    price: 119.99,
    popular: true
  },
  {
    id: 8,
    title: "DevOps & Docker Containerization",
    description: "Learn Docker, Kubernetes, CI/CD pipelines, infrastructure as code, and modern DevOps practices for scalable applications.",
    category: "DevOps",
    level: "Advanced",
    rating: 4.9,
    students: 950,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "19 hours",
    lessons: 65,
    instructor: "Chris Thompson",
    price: 149.99,
    popular: false
  },
  {
    id: 9,
    title: "JavaScript Fundamentals to Advanced Concepts",
    description: "Master JavaScript from basics to advanced topics like closures, prototypes, async programming, and modern ES6+ features.",
    category: "Programming",
    level: "Beginner",
    rating: 4.6,
    students: 2500,
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "14 hours",
    lessons: 52,
    instructor: "Lisa Park",
    price: 79.99,
    popular: true
  },
  {
    id: 10,
    title: "UI/UX Design Principles for Developers",
    description: "Learn design thinking, user research, wireframing, prototyping, and create beautiful, user-friendly interfaces.",
    category: "Design",
    level: "Beginner",
    rating: 4.4,
    students: 800,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "10 hours",
    lessons: 38,
    instructor: "Sophie Martinez",
    price: 69.99,
    popular: false
  },
  {
    id: 11,
    title: "Node.js API Development & Microservices",
    description: "Build RESTful APIs, GraphQL servers, microservices architecture, and learn advanced Node.js patterns for production.",
    category: "Backend",
    level: "Intermediate",
    rating: 4.7,
    students: 1400,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "17 hours",
    lessons: 60,
    instructor: "Ryan Cooper",
    price: 119.99,
    popular: true
  },
  {
    id: 12,
    title: "Cybersecurity Fundamentals for Developers",
    description: "Understand web security vulnerabilities, encryption, authentication, authorization, and secure coding practices.",
    category: "Security",
    level: "Intermediate",
    rating: 4.8,
    students: 700,
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "13 hours",
    lessons: 48,
    instructor: "Michael Brown",
    price: 99.99,
    popular: false
  },
  {
    id: 13,
    title: "GraphQL API Development with Apollo",
    description: "Master GraphQL schema design, queries, mutations, subscriptions, and build efficient APIs with Apollo Server and Client.",
    category: "API",
    level: "Intermediate",
    rating: 4.5,
    students: 600,
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "11 hours",
    lessons: 42,
    instructor: "Emma Davis",
    price: 89.99,
    popular: true
  },
  {
    id: 14,
    title: "Testing Strategies & Test-Driven Development",
    description: "Learn unit testing, integration testing, end-to-end testing, and implement TDD in your development workflow.",
    category: "Testing",
    level: "Intermediate",
    rating: 4.6,
    students: 550,
    thumbnail: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "9 hours",
    lessons: 35,
    instructor: "Daniel Lee",
    price: 79.99,
    popular: false
  },
  {
    id: 15,
    title: "Advanced CSS & Animation Techniques",
    description: "Master modern CSS features, Grid, Flexbox, animations, transitions, and create stunning visual effects.",
    category: "Frontend",
    level: "Advanced",
    rating: 4.7,
    students: 900,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "8 hours",
    lessons: 32,
    instructor: "Olivia Taylor",
    price: 69.99,
    popular: true
  },
  {
    id: 16,
    title: "Machine Learning Operations (MLOps)",
    description: "Learn to deploy, monitor, and maintain machine learning models in production using modern MLOps practices.",
    category: "AI/ML",
    level: "Advanced",
    rating: 4.9,
    students: 450,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "21 hours",
    lessons: 72,
    instructor: "Dr. Robert Chen",
    price: 179.99,
    popular: false
  },
  {
    id: 17,
    title: "Blockchain & Smart Contract Development",
    description: "Build decentralized applications, write smart contracts with Solidity, and understand blockchain fundamentals.",
    category: "Blockchain",
    level: "Advanced",
    rating: 4.8,
    students: 350,
    thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=250&fit=crop",
    enrolled: false,
    duration: "24 hours",
    lessons: 80,
    instructor: "Carlos Rodriguez",
    price: 199.99,
    popular: true
  },
  {
    id: 18,
    title: "System Design & Architecture Patterns",
    description: "Learn to design scalable systems, understand microservices vs monoliths, and master system architecture principles.",
    category: "Architecture",
    level: "Advanced",
    rating: 4.9,
    students: 1200,
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=250&fit=crop",
    enrolled: true,
    duration: "20 hours",
    lessons: 68,
    instructor: "Amanda Wilson",
    price: 159.99,
    popular: true
  }
];

export default function AllTutorials() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Databases", "Frontend", "Backend", "DevOps", "Cloud"];

  const filteredTutorials = tutorialsData.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || t.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full p-6 mb-8">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-semibold mb-6 text-[var(--accent)]">All Tutorials</h1>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[300px] px-4 py-2 bg-[var(--card-bg)] border border-[var(--muted)] rounded-xl outline-none focus:border-[var(--accent)] transition"
        />

        {/* CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--muted)] rounded-xl outline-none focus:border-[var(--accent)] transition"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* GRID OF TUTORIAL CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {filteredTutorials.map((tut) => (
          <TutorialCard key={tut.id} tut={tut} />
        ))}

      </div>
    </div>
  );
}
