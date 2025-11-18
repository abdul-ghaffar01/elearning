import React from 'react'
import ProgressBar from './ProgressBar'
import { FaStar } from 'react-icons/fa'

const TutorialPerformance = ({analyticsData}) => {
    return (
        <div className="space-y-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
                <h3 className="font-semibold mb-6">Tutorial Performance</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[var(--border-color)]">
                                <th className="text-left py-3 font-medium">Tutorial</th>
                                <th className="text-right py-3 font-medium">Students</th>
                                <th className="text-right py-3 font-medium">Revenue</th>
                                <th className="text-right py-3 font-medium">Completion</th>
                                <th className="text-right py-3 font-medium">Rating</th>
                                <th className="text-right py-3 font-medium">Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyticsData.topTutorials.map((tutorial) => (
                                <tr key={tutorial.id} className="border-b border-[var(--border-color)]/30 hover:bg-[var(--accent)]/5 transition-colors">
                                    <td className="py-4">
                                        <div className="max-w-xs">
                                            <p className="font-medium truncate">{tutorial.title}</p>
                                        </div>
                                    </td>
                                    <td className="text-right py-4">{tutorial.students}</td>
                                    <td className="text-right py-4 font-semibold text-green-500">${tutorial.revenue}</td>
                                    <td className="text-right py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <span>{tutorial.completion}%</span>
                                            <ProgressBar percentage={tutorial.completion} />
                                        </div>
                                    </td>
                                    <td className="text-right py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <FaStar className="text-yellow-500" />
                                            <span>{tutorial.rating}</span>
                                        </div>
                                    </td>
                                    <td className="text-right py-4">{tutorial.views.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TutorialPerformance