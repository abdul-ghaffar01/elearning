"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaBook,
    FaList,
    FaUser,
    FaBars,
    FaChalkboardTeacher,
    FaPlusCircle,
    FaUsers,
    FaChartBar,
    FaChevronLeft,
    FaGraduationCap,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ user, activeTab, setActiveTab }) {
    const [collapsed, setCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Define Student and Instructor Tabs with enhanced structure
    const studentTabs = [
        { id: "enrolled", label: "My Learning", icon: <FaBook />, category: "learning" },
        { id: "all", label: "Browse Tutorials", icon: <FaList />, category: "discovery" },
        { id: "certificates", label: "Certificates", icon: <FaGraduationCap />, category: "achievements" },
    ];

    const instructorTabs = [
        { id: "my_tutorials", label: "My Tutorials", icon: <FaChalkboardTeacher />, category: "content" },
        { id: "create_tutorial", label: "Create New", icon: <FaPlusCircle />, category: "content" },
        { id: "students", label: "Students", icon: <FaUsers />, category: "audience" },
        { id: "analytics", label: "Analytics", icon: <FaChartBar />, category: "insights" },
    ];

    const commonTabs = [
        { id: "profile", label: "Profile", icon: <FaUser />, category: "account" },
        { id: "settings", label: "Settings", icon: <FaCog />, category: "account" },
    ];

    // Select correct tab list based on user role
    const tabs = useMemo(() => {
        if (!user) return [...studentTabs, ...commonTabs];
        const roleTabs = user.role === "instructor" ? instructorTabs : studentTabs;
        return [...roleTabs, ...commonTabs];
    }, [user]);

    // Group tabs by category for better organization
    const groupedTabs = useMemo(() => {
        const groups = {};
        tabs.forEach(tab => {
            if (!groups[tab.category]) {
                groups[tab.category] = [];
            }
            groups[tab.category].push(tab);
        });
        return groups;
    }, [tabs]);

    const categoryLabels = {
        learning: "Learning",
        discovery: "Discover",
        achievements: "Achievements",
        content: "Content",
        audience: "Audience",
        insights: "Insights",
        account: "Account"
    };

    return (
        <motion.div
            className={`min-h-[calc(100dvh-70px)] bg-[var(--card-bg)] border-r border-[var(--border-color)] shadow-md p-4 flex flex-col transition-all duration-300 overflow-y-auto relative
        ${collapsed ? "w-20" : "w-80"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layout
        >
            {/* Header with Collapse Button - Always visible */}
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-8`}>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                            <FaGraduationCap className="text-white text-lg" />
                        </div>
                        <div>
                            <h2 className="font-bold text-[var(--foreground)] text-lg">
                                {user?.role === "instructor" ? "Instructor Portal" : "Learning Hub"}
                            </h2>
                            <p className="text-xs text-[var(--muted-foreground)]">
                                {user?.name || "Welcome back"}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Collapse button */}
                <motion.button
                    onClick={() => setCollapsed(!collapsed)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--accent)]/10 transition-colors text-[var(--accent)] flex-shrink-0
            ${collapsed ? 'top-4 right-4' : ''}`}
                >
                    {collapsed ? (<FaBars />) : <FaChevronLeft />}
                </motion.button>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide overflow-visible p-1">
                <ul className="flex flex-col gap-2">
                    {Object.entries(groupedTabs).map(([category, categoryTabs]) => (
                        <li key={category}>
                            {/* Category Label - Only show when not collapsed */}
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="px-3 py-2 mb-1"
                                >
                                    <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
                                        {categoryLabels[category]}
                                    </span>
                                </motion.div>
                            )}

                            {/* Tabs */}
                            <ul className="flex flex-col gap-1">
                                {categoryTabs.map((tab) => (
                                    <motion.li
                                        key={tab.id}
                                        layout
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                        <motion.button
                                            onClick={() => setActiveTab(tab.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full flex items-center gap-3 cursor-pointer px-3 py-3 transition-all duration-200 relative group rounded-lg
                        ${activeTab === tab.id
                                                    ? "bg-[var(--accent)] text-white shadow-lg"
                                                    : "text-[var(--foreground)] hover:bg-[var(--accent)]/10"
                                                } ${collapsed ? 'justify-center' : ''}`}
                                        >
                                            {/* Icon */}
                                            <span className={`text-lg flex-shrink-0 transition-colors ${activeTab === tab.id ? "text-white" : "text-[var(--muted-foreground)] group-hover:text-[var(--accent)]"
                                                }`}>
                                                {tab.icon}
                                            </span>

                                            {/* Label - Only show when not collapsed */}
                                            {!collapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="font-medium text-sm whitespace-nowrap overflow-hidden"
                                                >
                                                    {tab.label}
                                                </motion.span>
                                            )}

                                            {/* Active indicator */}
                                            {activeTab === tab.id && !collapsed && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}

                                            {/* Tooltip when collapsed */}
                                            {collapsed && (
                                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-[var(--card-bg)] border border-[var(--border-color)] px-3 py-2 rounded-lg shadow-xl text-[var(--foreground)] text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 pointer-events-none">
                                                    {tab.label}
                                                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-r-[var(--card-bg)]"></div>
                                                </div>
                                            )}
                                        </motion.button>
                                    </motion.li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="pt-4 border-t border-[var(--border-color)] mt-auto">
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 px-3 py-2 text-[var(--muted-foreground)] hover:bg-[var(--accent)]/10 rounded-lg cursor-pointer transition-colors"
                    >
                        <FaSignOutAlt />
                        <span className="text-sm font-medium">Sign Out</span>
                    </motion.div>
                )}
                {collapsed && (
                    <motion.div
                        className="flex justify-center"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="p-3 text-[var(--muted-foreground)] hover:bg-[var(--accent)]/10 rounded-lg cursor-pointer transition-colors">
                            <FaSignOutAlt />
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}