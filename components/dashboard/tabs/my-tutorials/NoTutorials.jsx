import React from 'react'
import { FaPlus } from 'react-icons/fa'

const NoTutorials = ({setActiveTab}) => {
    return (
        (
            <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-[var(--accent)]/10 rounded-full flex items-center justify-center">
                    <FaPlus className="text-3xl text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tutorials yet</h3>
                <p className="text-sm opacity-70 mb-6">Create your first tutorial to get started</p>
                <button
                    onClick={() => setActiveTab("create_tutorial")}
                    className="px-6 py-3 bg-[var(--accent)] text-white font-medium rounded-xl hover:opacity-90 transition"
                >
                    Create Your First Tutorial
                </button>
            </div>
        )
    )
}

export default NoTutorials