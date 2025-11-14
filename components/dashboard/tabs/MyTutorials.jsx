"use client";
import { useState, useRef, useEffect } from "react";
import { FaEllipsisH, FaEdit, FaTrash, FaUsers, FaEye, FaPlus, FaChartLine, FaCalendar, FaGlobe } from "react-icons/fa";

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
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div className="flex-1">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
                        My Tutorials
                    </h1>
                    <p className="text-sm opacity-70 mt-2">Manage, edit and monitor your tutorials</p>
                </div>

                <button
                    onClick={() => setActiveTab("create_tutorial")}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
                >
                    <FaPlus className="text-sm" />
                    Create Tutorial
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <FaUsers className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">168</p>
                            <p className="text-sm opacity-70">Total Students</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <FaGlobe className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">1</p>
                            <p className="text-sm opacity-70">Published</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg">
                            <FaChartLine className="text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">1,831</p>
                            <p className="text-sm opacity-70">Total Views</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {dummyTutorials.map((tutorial) => (
                    <div
                        key={tutorial.id}
                        className="bg-[var(--card-bg)] relative border border-[var(--border-color)] rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group hover:border-[var(--accent)]/30"
                    >
                        {/* Thumbnail with Overlay */}
                        <div className="relative w-full aspect-video overflow-hidden">
                            <img
                                src={tutorial.thumbnail}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                alt="tutorial thumbnail"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Status Badge on Thumbnail */}
                            <div className="absolute top-3 left-3">
                                <span
                                    className={`px-3 py-1 text-xs rounded-full font-medium backdrop-blur-sm
                                        ${
                                            tutorial.status === "published"
                                                ? "bg-green-500/90 text-white"
                                                : "bg-yellow-500/90 text-white"
                                        }`}
                                >
                                    {tutorial.status.toUpperCase()}
                                </span>
                            </div>

                            {/* Menu Button on Thumbnail */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="relative" ref={menuRef}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMenuOpen(menuOpen === tutorial.id ? null : tutorial.id);
                                        }}
                                        className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
                                    >
                                        <FaEllipsisH className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                            <h2 className="font-semibold text-lg leading-snug line-clamp-2 min-h-[56px] group-hover:text-[var(--accent)] transition-colors">
                                {tutorial.title}
                            </h2>

                            {/* Stats Row */}
                            <div className="flex items-center gap-4 mt-3 text-sm opacity-70">
                                <div className="flex items-center gap-1">
                                    <FaUsers className="text-xs" />
                                    <span>{tutorial.students} students</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaEye className="text-xs" />
                                    <span>{tutorial.views} views</span>
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <span>★</span>
                                    <span>{tutorial.rating}</span>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 mt-3 text-xs opacity-60">
                                <FaCalendar className="text-xs" />
                                <span>Created {tutorial.createdAt}</span>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[var(--border-color)]">
                                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all hover:scale-105">
                                    Manage Content
                                </button>

                                {/* Always Visible Menu Button for Mobile */}
                                <div className="lg:hidden relative" ref={menuRef}>
                                    <button
                                        onClick={() => setMenuOpen(menuOpen === tutorial.id ? null : tutorial.id)}
                                        className="p-2 hover:bg-[var(--accent)]/15 rounded-lg transition-colors border border-[var(--border-color)]"
                                    >
                                        <FaEllipsisH />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        {menuOpen === tutorial.id && (
                            <div className="absolute right-3 top-14 bg-[var(--card-bg)] border border-[var(--border-color)] shadow-2xl rounded-xl p-2 w-48 z-50 backdrop-blur-sm">
                                <MenuItem icon={<FaEdit />} text="Edit Tutorial" />
                                <MenuItem icon={<FaUsers />} text="View Students" />
                                <MenuItem icon={<FaEye />} text="Preview" />
                                <MenuItem icon={<FaChartLine />} text="Analytics" />
                                <div className="border-t border-[var(--border-color)] my-1"></div>
                                <MenuItem danger icon={<FaTrash />} text="Delete Tutorial" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State (optional) */}
            {dummyTutorials.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-4 bg-[var(--accent)]/10 rounded-full flex items-center justify-center">
                        <FaPlus className="text-3xl text-[var(--accent)]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No tutorials yet</h3>
                    <p className="text-sm opacity-70 mb-6">Create your first tutorial to get started</p>
                    <button
                        onClick={() => setActiveTab("create_tutorial")}
                        className="px-6 py-3 bg-[var(--accent)] text-white font-medium rounded-xl hover:opacity-90 transition"
                    >
                        Create Your First Tutorial
                    </button>
                </div>
            )}
        </div>
    );
}

function MenuItem({ icon, text, danger }) {
    return (
        <button
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200
                ${
                    danger
                        ? "text-red-500 hover:bg-red-500/10 hover:scale-105"
                        : "hover:bg-[var(--accent)]/10 hover:scale-105"
                }
            `}
        >
            <span className={`${danger ? "text-red-500" : "text-current"}`}>
                {icon}
            </span>
            <span>{text}</span>
        </button>
    );
}