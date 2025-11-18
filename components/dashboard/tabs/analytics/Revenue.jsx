import React from 'react'
import StatCard from './StatCard'
import { FaChartLine, FaDollarSign, FaUsers } from 'react-icons/fa'

const Revenue = ({analyticsData}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Monthly Revenue"
                    value="$18,450"
                    icon={<FaDollarSign className="text-xl" />}
                    change={21.4}
                    subtitle="Current month"
                />
                <StatCard
                    title="Projected Revenue"
                    value="$22,800"
                    icon={<FaChartLine className="text-xl" />}
                    change={15.2}
                    subtitle="Next month"
                />
                <StatCard
                    title="Avg. per Student"
                    value="$14.80"
                    icon={<FaUsers className="text-xl" />}
                    change={8.3}
                    subtitle="Lifetime value"
                />
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
                <h3 className="font-semibold mb-6">Revenue Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analyticsData.topTutorials.map((tutorial, index) => (
                        <div key={tutorial.id} className="text-center p-4 bg-[var(--accent)]/5 rounded-xl">
                            <div className="text-2xl font-bold text-green-500 mb-2">
                                ${tutorial.revenue}
                            </div>
                            <div className="text-sm font-medium mb-1 truncate">{tutorial.title}</div>
                            <div className="text-xs opacity-70">{tutorial.students} students</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Revenue