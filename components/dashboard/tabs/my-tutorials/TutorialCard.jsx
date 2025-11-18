import Link from 'next/link';
import React from 'react'
import { FaCalendar, FaChartLine, FaEdit, FaEllipsisH, FaEye, FaTrash, FaUsers } from 'react-icons/fa';
import MenuItem from './MenuItem';

const TutorialCard = ({ tutorial, menuOpen, setMenuOpen, menuRef }) => {
    return (
        <div
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
                                        ${tutorial.status === "published"
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
                                console.log("clicked")
                                e.stopPropagation();
                                if (menuOpen)
                                    setMenuOpen(null);
                                else if(menuOpen === null)
                                    setMenuOpen(tutorial.id)
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
                    <Link href={`/u/manage/${tutorial.id}`} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all hover:scale-105">
                        Manage Content
                    </Link>

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
    )
}

export default TutorialCard