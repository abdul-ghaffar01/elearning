import React from 'react'
import { FaChartLine, FaGlobe, FaUsers } from 'react-icons/fa'

const Stats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <FaUsers className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">168</p>
                        <p className="text-sm opacity-70">Total Students</p>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                        <FaGlobe className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">1</p>
                        <p className="text-sm opacity-70">Published</p>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                        <FaChartLine className="text-amber-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">1,831</p>
                        <p className="text-sm opacity-70">Total Views</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats