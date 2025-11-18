"use client";
import { useState, useRef, useEffect } from "react";
import NoTutorials from "./NoTutorials";
import Header from "./Header";
import Stats from "./Stats";
import TutorialCard from "./TutorialCard";

const dummyTutorials = [
    {
        id: "t1",
        title: "Complete React + Next.js Cloud Engineering Bootcamp (With Projects & Deep Dive Architecture)",
        students: 120,
        status: "published",
        createdAt: "2025-01-20",
        thumbnail: "https://images.unsplash.com/photo-1559027615-ce3da15c93d3",
        views: 1542,
        rating: 4.8
    },
    {
        id: "t2",
        title: "Data Structures & Algorithms Mastery — Practical, Cloud-Focused, Real-World Examples",
        students: 48,
        status: "draft",
        createdAt: "2025-02-01",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        views: 289,
        rating: 4.5
    },
];

export default function MyTutorials({ setActiveTab }) {
    const [menuOpen, setMenuOpen] = useState(null);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="p-6 lg:p-8 w-full h-full text-[var(--foreground)] overflow-y-auto">
            {/* Page Header */}
            <Header setActiveTab={setActiveTab} />
            {/* Stats Overview */}
            <Stats />

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {dummyTutorials.map((tutorial) => (
                    <TutorialCard
                        key={tutorial.id}
                        tutorial={tutorial}
                        menuOpen={menuOpen}
                        menuRef={menuRef}
                        setMenuOpen={setMenuOpen}
                    />
                ))}
            </div>

            {/* Empty State (optional) */}
            {dummyTutorials.length === 0 && <NoTutorials setActiveTab={setActiveTab} />}
        </div>
    );
}
