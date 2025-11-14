"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState("enrolled");

  return (
    <div className="flex fixed h-[calc(100dvh-72px)] w-full">
      {/* Sidebar fixed, already handled */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 h-full">
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
}
