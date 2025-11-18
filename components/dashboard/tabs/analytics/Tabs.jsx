import React from 'react'
import { FaChartBar, FaDollarSign, FaPlay, FaUsers } from 'react-icons/fa';

const Tabs = ({ activeView, setActiveView }) => {
    return (
        <div className="flex gap-1 p-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl w-fit mb-8">
            {[
                { id: 'overview', label: 'Overview', icon: FaChartBar },
                { id: 'tutorials', label: 'Tutorials', icon: FaPlay },
                { id: 'students', label: 'Students', icon: FaUsers },
                { id: 'revenue', label: 'Revenue', icon: FaDollarSign }
            ].map((view) => {
                const Icon = view.icon;
                return (
                    <button
                        key={view.id}
                        onClick={() => setActiveView(view.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeView === view.id
                            ? 'bg-[var(--accent)] text-white'
                            : 'hover:bg-[var(--accent)]/10'
                            }`}
                    >
                        <Icon className="text-sm" />
                        {view.label}
                    </button>
                );
            })}
        </div>
    )
}

export default Tabs