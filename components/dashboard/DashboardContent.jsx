"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState("enrolled");

  return (
    <div className="flex h-[calc(100dvh-72px)]">
      {/* Sidebar fixed, already handled */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="w-full h-full">
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
}
