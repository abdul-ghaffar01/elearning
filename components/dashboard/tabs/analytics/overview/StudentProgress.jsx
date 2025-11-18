import React from 'react'
import { FaRegClock } from 'react-icons/fa'
import ProgressBar from '../ProgressBar'

const StudentProgress = ({ analyticsData }) => {
    return (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Student Progress</h3>
                <div className="flex items-center gap-2 text-sm opacity-70">
                    <FaRegClock />
                    <span>Completion Rate</span>
                </div>
            </div>

            <div className="space-y-4">
                {analyticsData.studentProgress.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{item.lesson}</span>
                            <span className="opacity-70">{item.completed}%</span>
                        </div>
                        <ProgressBar percentage={item.completed} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentProgress