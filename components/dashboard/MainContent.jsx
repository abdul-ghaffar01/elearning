"use client";
import EnrolledTutorials from "./tabs/EnrolledTutorials";
import AllTutorials from "./tabs/AllTutorials";
import Profile from "./tabs/Profile";

export default function MainContent({ activeTab }) {
  return (
    <div className="w-full h-full overflow-y-auto scrollbar-hide">
      {activeTab === "enrolled" && <EnrolledTutorials />}
      {activeTab === "all" && <AllTutorials />}
      {activeTab === "profile" && <Profile />}
    </div>
  );
}
