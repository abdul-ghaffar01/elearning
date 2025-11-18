import React from 'react'
import KeyMatrics from './overview/KeyMatrics'
import RevenueChart from './overview/RevenueChart'
import StudentProgress from './overview/StudentProgress'
import Geography from './overview/Geography'
import TopPeformingTuts from './overview/TopPeformingTuts'

const Overview = ({ analyticsData }) => {
    return (
        <div className="space-y-8">
            {/* Key Metrics */}
            <KeyMatrics analyticsData={analyticsData} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart analyticsData={analyticsData} />

                {/* Student Progress */}
                <StudentProgress analyticsData={analyticsData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Tutorials */}
                <TopPeformingTuts analyticsData={analyticsData} />

                {/* Geography Distribution */}
                <Geography analyticsData={analyticsData} />
            </div>
        </div>
    )
}

export default Overview