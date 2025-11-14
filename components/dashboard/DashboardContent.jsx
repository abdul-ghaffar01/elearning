"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useUserStore } from "@/store/loginStore";

export default function DashboardContent() {
    const [activeTab, setActiveTab] = useState("");
    const user = useUserStore().user;

    // Allowed tabs for both roles
    const studentTabs = ["enrolled", "all", "certificates", "profile"];
    const instructorTabs = ["my_tutorials", "create_tutorial", "students", "analytics", "profile"];

    useEffect(() => {
        if (!user?.role) return;

        // Set default tab based on role (on first load)
        const defaultTab = user.role === "student" ? "enrolled" : "my_tutorials";
        setActiveTab(defaultTab);
    }, [user]);

    useEffect(() => {
        if (!user?.role || !activeTab) return;

        // Redirect if user tries to access invalid tab manually
        if (user.role === "student" && !studentTabs.includes(activeTab)) {
            setActiveTab("enrolled");
        }

        if (user.role === "instructor" && !instructorTabs.includes(activeTab)) {
            setActiveTab("my_tutorials");
        }
    }, [activeTab, user]);

    return (
        <div className="flex fixed h-[calc(100dvh-72px)] w-full">

            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

            {/* Main Content */}
            <div className="flex-1 h-full">
                <MainContent
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    role={user.role}
                />
            </div>
        </div>
    );
}
