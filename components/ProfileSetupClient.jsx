"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

export default function ProfileSetupClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "student";

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        expertise: "",
        institution: "",
        gradeLevel: "",
        interests: [],
    });

    const studentInterests = [
        "Mathematics", "Science", "Programming", "History",
        "Art & Design", "Languages", "Business", "Technology"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        router.push("/u/dashboard");
        setIsLoading(false);
    };

    const handleChange = (e) => {
        setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    };

    const toggleInterest = (interest) => {
        setFormData(p => ({
            ...p,
            interests: p.interests.includes(interest)
                ? p.interests.filter(i => i !== interest)
                : [...p.interests, interest]
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-md"
            >
                <button
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] mb-6 transition disabled:opacity-50"
                >
                    <MdArrowBack size={20} />
                    Back
                </button>

                <div className="p-8 rounded-3xl glass shadow-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                            Complete Your Profile
                        </h1>
                        <p className="text-[var(--muted)]">
                            {role === "student"
                                ? "Tell us about your learning goals"
                                : "Tell us about your teaching experience"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="Enter your full name"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
                                placeholder={role === "student"
                                    ? "Tell us about your learning interests and goals..."
                                    : "Tell us about your teaching experience and expertise..."}
                                disabled={isLoading}
                            />
                        </div>

                        {role === "student" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                        Grade Level / Institution
                                    </label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                        placeholder="e.g., High School, University, Self-taught"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
                                        Interests
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {studentInterests.map((interest) => (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() => toggleInterest(interest)}
                                                disabled={isLoading}
                                                className={`px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50 ${formData.interests.includes(interest)
                                                        ? "bg-[var(--accent)] text-white"
                                                        : "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]"
                                                    }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {role === "instructor" && (
                            <div>
                                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                                    Areas of Expertise
                                </label>
                                <input
                                    type="text"
                                    name="expertise"
                                    value={formData.expertise}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    placeholder="e.g., Mathematics, Programming, Design, Science"
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        <motion.button
                            whileHover={!isLoading ? { scale: 1.02 } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-medium shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Setting up profile...
                                </span>
                            ) : (
                                "Complete Setup"
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
