import React from 'react'
import { FaPlus } from 'react-icons/fa'

const Header = ({setActiveTab}) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
                    My Tutorials
                </h1>
                <p className="text-sm opacity-70 mt-2">Manage, edit and monitor your tutorials</p>
            </div>

            <button
                onClick={() => setActiveTab("create_tutorial")}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
            >
                <FaPlus className="text-sm" />
                Create Tutorial
            </button>
        </div>

    )
}

export default Header