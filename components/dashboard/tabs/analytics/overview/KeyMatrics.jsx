import React from 'react'
import StatCard from '../StatCard'
import { FaDollarSign, FaEye, FaGraduationCap, FaUsers } from 'react-icons/fa'

const KeyMatrics = ({ analyticsData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Students"
                value={analyticsData.overview.totalStudents.toLocaleString()}
                icon={<FaUsers className="text-xl" />}
                change={analyticsData.trends.students.change}
            />
            <StatCard
                title="Total Revenue"
                value={`$${analyticsData.overview.totalRevenue.toLocaleString()}`}
                icon={<FaDollarSign className="text-xl" />}
                change={analyticsData.trends.revenue.change}
                subtitle="Lifetime earnings"
            />
            <StatCard
                title="Total Views"
                value={analyticsData.overview.totalViews.toLocaleString()}
                icon={<FaEye className="text-xl" />}
                change={analyticsData.trends.views.change}
            />
            <StatCard
                title="Avg Completion"
                value={`${analyticsData.overview.avgCompletion}%`}
                icon={<FaGraduationCap className="text-xl" />}
                change={analyticsData.trends.completion.change}
            />
        </div>
    )
}

export default KeyMatrics