"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

export default function RoleSelectionPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = async (role) => {
        setSelectedRole(role);
        setIsLoading(true);

        try {
            // Save role to user store or API
            // await userStore.updateRole(role);

            // Check if profile setup is needed
            const profileSetupNeeded = true; // Replace with actual check from API

            if (profileSetupNeeded) {
                router.push(`/u/profile-setup/setup?role=${role}`);
            } else {
                router.push("/u/dashboard");
            }
        } catch (error) {
            console.error("Error selecting role:", error);
        } finally {
            setIsLoading(false);
        }
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

                <div className="p-8 rounded-3xl glass shadow-xl text-center">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
                            Tell us about yourself
                        </h1>
                        <p className="text-[var(--muted)]">
                            How would you like to use our platform?
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <RoleCard
                            role="student"
                            title="Student"
                            description="I want to learn and take courses"
                            emoji="🎓"
                            color="blue"
                            selected={selectedRole === "student"}
                            onClick={() => handleRoleSelect("student")}
                            disabled={isLoading}
                        />

                        <RoleCard
                            role="instructor"
                            title="Instructor"
                            description="I want to teach and create courses"
                            emoji="👨‍🏫"
                            color="green"
                            selected={selectedRole === "instructor"}
                            onClick={() => handleRoleSelect("instructor")}
                            disabled={isLoading}
                        />
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center gap-2 text-[var(--muted)]">
                            <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                            <span>Setting up your account...</span>
                        </div>
                    )}

                    <p className="text-sm text-[var(--muted)] mt-6">
                        You can change this later in your profile settings
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

function RoleCard({ role, title, description, emoji, color, selected, onClick, disabled }) {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
    };

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={onClick}
            disabled={disabled}
            className={`w-full p-6 rounded-xl bg-[var(--card)] border-2 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed ${selected
                    ? "border-[var(--accent)] bg-[var(--card)] shadow-md"
                    : "border-[var(--border)] hover:border-[var(--accent)]"
                }`}
        >
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${(() => {
                    switch (color) {
                        case "red": return colorClasses.red;
                        case "blue": return colorClasses.blue;
                        default: return "";
                    }
                })()}`}>
                    <span className="text-2xl">{emoji}</span>
                </div>
                <div className="flex-1 text-left">
                    <h3 className="font-semibold text-[var(--foreground)]">{title}</h3>
                    <p className="text-sm text-[var(--muted)]">{description}</p>
                </div>
                {selected && (
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}
            </div>
        </motion.button>
    );
}