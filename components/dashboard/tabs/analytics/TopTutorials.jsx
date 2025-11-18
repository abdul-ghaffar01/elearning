import React from 'react'
import { FaFilter, FaStar, FaUsers } from 'react-icons/fa'

const TopTutorials = () => {
    return (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Top Performing Tutorials</h3>
                <FaFilter className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" />
            </div>

            <div className="space-y-4">
                {analyticsData.topTutorials.map((tutorial) => (
                    <div key={tutorial.id} className="flex items-center justify-between p-4 hover:bg-[var(--accent)]/5 rounded-xl transition-colors">
                        <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{tutorial.title}</h4>
                            <div className="flex items-center gap-4 mt-2 text-xs opacity-70">
                                <span className="flex items-center gap-1">
                                    <FaUsers className="text-xs" />
                                    {tutorial.students} students
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaStar className="text-xs" />
                                    {tutorial.rating}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-green-500">${tutorial.revenue}</p>
                            <p className="text-xs opacity-70">{tutorial.completion}% completed</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopTutorials