import React from 'react'
import { FaChartLine, FaGraduationCap, FaUsers } from 'react-icons/fa'
import ProgressBar from './ProgressBar'

const Students = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
                <h3 className="font-semibold mb-6">Student Engagement</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-xl">
                        <div>
                            <p className="font-semibold text-blue-500">Active Students</p>
                            <p className="text-2xl font-bold mt-1">847</p>
                        </div>
                        <FaUsers className="text-3xl text-blue-500 opacity-60" />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-xl">
                        <div>
                            <p className="font-semibold text-green-500">New Students</p>
                            <p className="text-2xl font-bold mt-1">124</p>
                        </div>
                        <FaChartLine className="text-3xl text-green-500 opacity-60" />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-purple-500/10 rounded-xl">
                        <div>
                            <p className="font-semibold text-purple-500">Completion Rate</p>
                            <p className="text-2xl font-bold mt-1">68%</p>
                        </div>
                        <FaGraduationCap className="text-3xl text-purple-500 opacity-60" />
                    </div>
                </div>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
                <h3 className="font-semibold mb-6">Learning Patterns</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Average Time to Complete</span>
                            <span className="font-semibold">14 days</span>
                        </div>
                        <ProgressBar percentage={65} color="bg-blue-500" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Daily Active Time</span>
                            <span className="font-semibold">42 min</span>
                        </div>
                        <ProgressBar percentage={78} color="bg-green-500" />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Quiz Pass Rate</span>
                            <span className="font-semibold">82%</span>
                        </div>
                        <ProgressBar percentage={82} color="bg-purple-500" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students