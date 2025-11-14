"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaList, FaUser, FaBars } from "react-icons/fa";

const tabs = [
    { id: "enrolled", label: "Enrolled Tutorials", icon: <FaBook /> },
    { id: "all", label: "All Tutorials", icon: <FaList /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
];

export default function Sidebar({ activeTab, setActiveTab }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div
            className={`min-h-[calc(100dvh-70px)] bg-[var(--card-bg)] border-r border-[var(--border-color)] shadow-md p-4 flex flex-col transition-all duration-300 overflow-y-auto
        ${collapsed ? "w-20" : "w-[300px]"}`}
        >
            {/* Collapse Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-[var(--accent)] mb-6 text-xl hover:scale-115 transition mx-auto"
            >
                <FaBars />
            </button>

            {/* Tabs */}
            <ul className="flex flex-col gap-4 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {tabs.map((tab) => (
                    <motion.li
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className={`group flex items-center gap-4 cursor-pointer px-3 py-2 transition relative
    ${activeTab === tab.id
                                ? "bg-[var(--accent)] text-white rounded-lg"
                                : "text-[var(--foreground)] hover:bg-[var(--accent)]/20 rounded-lg"}`}
                    >
                        {/* Icon */}
                        <span className="text-lg">{tab.icon}</span>

                        {/* Label */}
                        {!collapsed && <span className="text-[var(--foreground)] no-break">{tab.label}</span>}

                        {/* Tooltip when collapsed */}
                        {collapsed && (
                            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[var(--card-bg)] glass px-3 py-1 rounded shadow-md text-[var(--foreground)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {tab.label}
                            </span>
                        )}
                    </motion.li>

                ))}
            </ul>
        </div>
    );
}
