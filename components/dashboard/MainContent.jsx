"use client";
import { useEffect } from "react";
import EnrolledTutorials from "./tabs/EnrolledTutorials";
import AllTutorials from "./tabs/AllTutorials";
import Profile from "./tabs/Profile";
import MyTutorials from "./tabs/my-tutorials/MyTutorials";
import CreateTutorial from "./tabs/create-tutorial/CreateTutorial";
import Students from "./tabs/Students";
import Analytics from "./tabs/analytics/Analytics";
import Certificates from "./tabs/Certificates";

export default function MainContent({ activeTab, setActiveTab, role }) {

    const studentTabs = ["enrolled", "all", "certificates", "profile"];
    const instructorTabs = ["my_tutorials", "create_tutorial", "students", "analytics", "profile"];

    // Fix activeTab if role is mismatched
    useEffect(() => {
        if (role === "student" && !studentTabs.includes(activeTab)) {
            setActiveTab("enrolled");
        }
        if (role === "instructor" && !instructorTabs.includes(activeTab)) {
            setActiveTab("my_tutorials");
        }
    }, [activeTab, role]);

    // Student UI
    if (role === "student") {
        return (
            <div className="w-full h-full overflow-y-auto scrollbar-hide">
                {activeTab === "enrolled" && <EnrolledTutorials />}
                {activeTab === "all" && <AllTutorials />}
                {activeTab === "certificates" && <Certificates />}
                {activeTab === "profile" && <Profile />}
            </div>
        );
    }

    // Instructor UI
    if (role === "instructor") {
        return (
            <div className="w-full h-full overflow-y-auto scrollbar-hide">
                {activeTab === "my_tutorials" && <MyTutorials setActiveTab={setActiveTab} />}
                {activeTab === "create_tutorial" && <CreateTutorial setActiveTab={setActiveTab} />}
                {activeTab === "students" && <Students />}
                {activeTab === "analytics" && <Analytics />}
                {activeTab === "profile" && <Profile />}
            </div>
        );
    }

    return <div className="w-full h-full p-6 text-[var(--foreground)]">Invalid role.</div>;
}
