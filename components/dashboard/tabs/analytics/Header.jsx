import React, { useState } from 'react'
import { FaCalendar, FaDownload } from 'react-icons/fa'

const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
];


const Header = () => {

    const [timeRange, setTimeRange] = useState('30d');
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
                    Analytics Dashboard
                </h1>
                <p className="text-sm opacity-70 mt-2">Track your tutorial performance and student engagement</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2">
                    <FaCalendar className="opacity-60" />
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-transparent border-none focus:outline-none text-sm"
                    >
                        {timeRanges.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                    </select>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-xl hover:opacity-90 transition-opacity">
                    <FaDownload className="text-sm" />
                    Export Report
                </button>
            </div>
        </div>
    )
}

export default Header