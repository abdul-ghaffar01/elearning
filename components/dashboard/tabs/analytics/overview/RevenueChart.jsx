import React from 'react'
import { FaChartLine } from 'react-icons/fa'

const RevenueChart = ({analyticsData}) => {
    return (
        <div className="lg:col-span-2">
            {/* Revenue Chart */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Revenue Overview</h3>
                    <div className="flex items-center gap-2 text-sm opacity-70">
                        <FaChartLine />
                        <span>Monthly Revenue</span>
                    </div>
                </div>

                <div className="h-64 flex items-end gap-2">
                    {analyticsData.revenueData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                                className="w-full bg-gradient-to-t from-[var(--accent)] to-purple-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                                style={{ height: `${(item.revenue / 25000) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-2 opacity-70">{item.month}</span>
                            <span className="text-xs font-medium mt-1">${(item.revenue / 1000).toFixed(0)}k</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RevenueChart