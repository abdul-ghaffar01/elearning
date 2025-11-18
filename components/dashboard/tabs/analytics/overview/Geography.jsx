import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import ProgressBar from '../ProgressBar'

const Geography = ({ analyticsData }) => {
    return (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Student Geography</h3>
                <div className="flex items-center gap-2 text-sm opacity-70">
                    <FaMapMarkerAlt />
                    <span>Top Countries</span>
                </div>
            </div>

            <div className="space-y-4">
                {analyticsData.geography.map((country, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{country.country}</span>
                            <span className="opacity-70">{country.students} students ({country.percentage}%)</span>
                        </div>
                        <ProgressBar
                            percentage={country.percentage}
                            color={index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-yellow-500' : 'bg-purple-500'}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Geography