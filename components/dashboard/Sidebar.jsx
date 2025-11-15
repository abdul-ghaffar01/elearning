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
    FaHome,
} from "react-icons/fa";

export default function Sidebar({ user, activeTab, setActiveTab }) {
    const [collapsed, setCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Define Student and Instructor Tabs with enhanced structure
    const studentTabs = [
        { id: "enrolled", label: "My Learning", icon: <FaBook />, category: "learning", mobileIcon: <FaBook size={18} /> },
        { id: "all", label: "Browse Tutorials", icon: <FaList />, category: "discovery", mobileIcon: <FaList size={18} /> },
        { id: "certificates", label: "Certificates", icon: <FaGraduationCap />, category: "achievements", mobileIcon: <FaGraduationCap size={18} /> },
    ];

    const instructorTabs = [
        { id: "my_tutorials", label: "My Tutorials", icon: <FaChalkboardTeacher />, category: "content", mobileIcon: <FaChalkboardTeacher size={18} /> },
        { id: "create_tutorial", label: "Create New", icon: <FaPlusCircle />, category: "content", mobileIcon: <FaPlusCircle size={18} /> },
        { id: "students", label: "Students", icon: <FaUsers />, category: "audience", mobileIcon: <FaUsers size={18} /> },
        { id: "analytics", label: "Analytics", icon: <FaChartBar />, category: "insights", mobileIcon: <FaChartBar size={18} /> },
    ];

    const commonTabs = [
        { id: "profile", label: "Profile", icon: <FaUser />, category: "account", mobileIcon: <FaUser size={18} /> },
        { id: "settings", label: "Settings", icon: <FaCog />, category: "account", mobileIcon: <FaCog size={18} /> },
    ];

    // Select correct tab list based on user role
    const tabs = useMemo(() => {
        if (!user) return [...studentTabs, ...commonTabs];
        const roleTabs = user.role === "instructor" ? instructorTabs : studentTabs;
        return [...roleTabs, ...commonTabs];
    }, [user]);

    // Mobile tabs - show only essential tabs
    const mobileTabs = useMemo(() => {
        const essentialTabs = tabs.filter(tab => 
            tab.id === "enrolled" || 
            tab.id === "all" || 
            tab.id === "my_tutorials" || 
            tab.id === "create_tutorial" ||
            tab.id === "profile"
        ).slice(0, 5); // Limit to 5 tabs for mobile
        return essentialTabs;
    }, [tabs]);

    // Group tabs by category for better organization (desktop only)
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
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <DesktopSidebar 
                    user={user}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                    groupedTabs={groupedTabs}
                    categoryLabels={categoryLabels}
                    tabs={tabs}
                />
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden">
                <MobileBottomNav 
                    user={user}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    mobileTabs={mobileTabs}
                />
            </div>
        </>
    );
}

// Desktop Sidebar Component
function DesktopSidebar({ 
    user, 
    activeTab, 
    setActiveTab, 
    collapsed, 
    setCollapsed, 
    isHovered, 
    setIsHovered,
    groupedTabs,
    categoryLabels,
    tabs 
}) {
    return (
        <motion.div
            className={`min-h-[calc(100dvh-70px)] bg-[var(--card-bg)] border-r border-[var(--border-color)] shadow-md p-4 flex flex-col transition-all duration-300 overflow-y-auto relative
                ${collapsed ? "w-20" : "w-80"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layout
        >
            {/* Header with Collapse Button */}
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

                <motion.button
                    onClick={() => setCollapsed(!collapsed)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)] hover:bg-[var(--accent)] transition-colors text-[var(--accent)] flex-shrink-0
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
                                            <span className={`text-lg flex-shrink-0 transition-colors ${activeTab === tab.id ? "text-white" : "text-[var(--muted-foreground)] group-hover:text-[var(--accent)]"
                                                }`}>
                                                {tab.icon}
                                            </span>

                                            {!collapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="font-medium text-sm whitespace-nowrap overflow-hidden"
                                                >
                                                    {tab.label}
                                                </motion.span>
                                            )}

                                            {activeTab === tab.id && !collapsed && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}

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

// Mobile Bottom Navigation Component
function MobileBottomNav({ user, activeTab, setActiveTab, mobileTabs }) {
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    // Get all tabs for the more menu
    const allTabs = useMemo(() => {
        const studentTabs = [
            { id: "enrolled", label: "My Learning", icon: <FaBook size={16} /> },
            { id: "all", label: "Browse Tutorials", icon: <FaList size={16} /> },
            { id: "certificates", label: "Certificates", icon: <FaGraduationCap size={16} /> },
        ];

        const instructorTabs = [
            { id: "my_tutorials", label: "My Tutorials", icon: <FaChalkboardTeacher size={16} /> },
            { id: "create_tutorial", label: "Create New", icon: <FaPlusCircle size={16} /> },
            { id: "students", label: "Students", icon: <FaUsers size={16} /> },
            { id: "analytics", label: "Analytics", icon: <FaChartBar size={16} /> },
        ];

        const commonTabs = [
            { id: "profile", label: "Profile", icon: <FaUser size={16} /> },
            { id: "settings", label: "Settings", icon: <FaCog size={16} /> },
        ];

        if (!user) return [...studentTabs, ...commonTabs];
        const roleTabs = user.role === "instructor" ? instructorTabs : studentTabs;
        return [...roleTabs, ...commonTabs];
    }, [user]);

    return (
        <>
            {/* Main Bottom Navigation */}
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-[var(--card-bg)] border-t border-[var(--border-color)] shadow-lg z-50"
            >
                <div className="flex items-center justify-around px-2 py-3">
                    {mobileTabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            whileTap={{ scale: 0.9 }}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 flex-1 max-w-[80px] min-w-[60px]
                                ${activeTab === tab.id
                                    ? "text-[var(--accent)] bg-[var(--accent)]/10"
                                    : "text-[var(--muted-foreground)]"
                                }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${activeTab === tab.id ? "bg-[var(--accent)]/20" : ""}`}>
                                {tab.mobileIcon || tab.icon}
                            </div>
                            <span className="text-xs font-medium truncate w-full text-center">
                                {tab.label.split(' ')[0]}
                            </span>
                            
                            {/* Active indicator */}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="mobileActiveTab"
                                    className="w-1 h-1 bg-[var(--accent)] rounded-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}

                    {/* More Menu Button */}
                    <motion.button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        whileTap={{ scale: 0.9 }}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 flex-1 max-w-[80px] min-w-[60px]
                            ${showMoreMenu
                                ? "text-[var(--accent)] bg-[var(--accent)]/10"
                                : "text-[var(--muted-foreground)]"
                            }`}
                    >
                        <div className={`p-2 rounded-lg transition-colors ${showMoreMenu ? "bg-[var(--accent)]/20" : ""}`}>
                            <FaBars size={18} />
                        </div>
                        <span className="text-xs font-medium">More</span>
                        
                        {showMoreMenu && (
                            <motion.div
                                layoutId="mobileMoreTab"
                                className="w-1 h-1 bg-[var(--accent)] rounded-full"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </motion.button>
                </div>
            </motion.nav>

            {/* More Menu Overlay */}
            <AnimatePresence>
                {showMoreMenu && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setShowMoreMenu(false)}
                        />
                        
                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 100 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="fixed bottom-20 left-4 right-4 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] shadow-2xl z-50 p-4"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {allTabs.filter(tab => !mobileTabs.find(mt => mt.id === tab.id)).map((tab) => (
                                    <motion.button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setShowMoreMenu(false);
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                                            ${activeTab === tab.id
                                                ? "bg-[var(--accent)] text-white"
                                                : "bg-[var(--background)] hover:bg-[var(--accent)]/10"
                                            }`}
                                    >
                                        {tab.icon}
                                        <span className="text-sm font-medium whitespace-nowrap">
                                            {tab.label}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Sign Out Button */}
                            <motion.button
                                onClick={() => {/* Handle sign out */}}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors mt-3"
                            >
                                <FaSignOutAlt size={16} />
                                <span className="text-sm font-medium">Sign Out</span>
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Bottom padding for content */}
            <div className="h-20" />
        </>
    );
}