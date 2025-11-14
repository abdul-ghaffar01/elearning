"use client";
import Link from "next/link";
import { useUserStore } from "@/store/loginStore";

const enrolledTutorials = [
  { id: 1, title: "Introduction to Databases", thumbnail: "/images/db_tutorial.jpg", passed: 3, total: 7 },
  { id: 2, title: "Advanced SQL Queries", thumbnail: "/images/sql_tutorial.jpg", passed: 2, total: 4 },
];

export default function EnrolledTutorials() {
  const { user } = useUserStore();
  if (!user) return <p className="p-10 text-[var(--foreground)]">Please login first.</p>;

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6 bg-transparent">
      <h1 className="text-3xl font-bold text-[var(--accent)]">Your Enrolled Tutorials</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {enrolledTutorials.map((tutorial) => (
          <Link
            key={tutorial.id}
            href={`/dashboard/learning/${tutorial.id}`}
            className="glass rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition border-[3px] border-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
          >
            <img
              src={tutorial.thumbnail}
              alt={tutorial.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-[var(--accent)]">{tutorial.title}</h2>
              <p className="text-sm text-[var(--muted)] mt-2">
                Progress: {tutorial.passed} lessons passed out of {tutorial.total}
              </p>
              <div className="w-full h-2 bg-[var(--muted)] rounded-full mt-1">
                <div
                  className="h-2 rounded-full bg-[var(--accent)]"
                  style={{ width: `${(tutorial.progress / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
