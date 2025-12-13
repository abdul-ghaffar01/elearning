"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useUserStore } from "@/store/loginStore";
import { useSearchParams, useRouter } from "next/navigation";

export default function DashboardContent() {
    const [activeTab, setActiveTab] = useState("");
    const user = useUserStore().user;
    const searchParams = useSearchParams();
    const router = useRouter();

    // Check for tab in URL query params
    const tabFromParams = searchParams.get("tab");

    // Allowed tabs for both roles
    const studentTabs = ["enrolled", "all", "certificates", "profile"];
    const instructorTabs = ["my_tutorials", "create_tutorial", "students", "analytics", "profile"];

    useEffect(() => {
        if (!user?.role) return;

        // Priority 1: Use tab from URL params if valid
        if (tabFromParams) {
            const allowedTabs = user.role === "student" ? studentTabs : instructorTabs;
            if (allowedTabs.includes(tabFromParams)) {
                setActiveTab(tabFromParams);
                return;
            }
        }

        // Priority 2: Set default tab based on role
        const defaultTab = user.role === "student" ? "enrolled" : "my_tutorials";
        setActiveTab(defaultTab);

        // Update URL with default tab if no valid tab in params
        if (!tabFromParams || !studentTabs.includes(tabFromParams)) {
            const params = new URLSearchParams(searchParams);
            params.set("tab", defaultTab);
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [user, tabFromParams]); // Depend on both user and tabFromParams

    // Sync URL when activeTab changes (except during initial load)
    useEffect(() => {
        if (!activeTab || !user?.role) return;

        const params = new URLSearchParams(searchParams);

        // Only update URL if it's different from current
        if (params.get("tab") !== activeTab) {
            params.set("tab", activeTab);
            router.replace(`?${params.toString()}`, { scroll: false });
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
                        role={user?.role}
                    />
                </div>
            </div>
    );
}