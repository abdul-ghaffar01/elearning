"use client";
import React, { useRef } from "react";
import { useUserStore } from "@/store/loginStore";
import { FaGraduationCap, FaSignOutAlt, FaDownload, FaEdit, FaTrash, FaUser, FaEye } from "react-icons/fa";
import html2canvas from "html2canvas";

const Profile = () => {
  const { user, logout } = useUserStore();
  const certificateRef = useRef();

  if (!user) return <p className="p-10">Please login first.</p>;

  const handleDownloadCertificate = async (tutorial) => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${tutorial.title}_certificate.png`;
    link.click();
  };

  const handleDeactivate = () => alert("Deactivate account functionality!");
  const handleDelete = () => alert("Delete account functionality!");
  const handleUpdateInfo = () => alert("Update profile information!");

  return (
    <div className="min-h-screen p-10 bg-[var(--background)] flex flex-col gap-10">
      {/* Header */}
      <div className="glass p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-[var(--accent)]"
          />
          <div>
            <h1 className="text-3xl font-bold text-[var(--accent)]">{user.name}</h1>
            <p className="text-[var(--muted)]">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleUpdateInfo}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <FaEdit /> Update Info
          </button>
          <button
            onClick={handleDeactivate}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            <FaUser /> Deactivate
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <FaTrash /> Delete Account
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="glass p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-around items-center gap-6">
        <div className="text-center">
          <p className="text-[var(--muted)]">Total Enrolled</p>
          <p className="text-2xl font-bold text-[var(--accent)]">{user.totalEnrolled}</p>
        </div>
        <div className="text-center">
          <p className="text-[var(--muted)]">Completed</p>
          <p className="text-2xl font-bold text-[var(--accent)]">{user.completedTutorials.length}</p>
        </div>
      </div>

      {/* Completed Tutorials */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-[var(--accent)] flex items-center gap-2">
          <FaGraduationCap /> Completed Tutorials
        </h2>

        {user.completedTutorials.length === 0 ? (
          <p className="text-[var(--muted)]">You haven’t completed any tutorials yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {user.completedTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="glass p-6 rounded-3xl shadow-lg flex flex-col gap-4 transition hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-[var(--accent)]">{tutorial.title}</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleDownloadCertificate(tutorial)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    <FaDownload /> Download Certificate
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <FaEye /> View Tutorial
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden Certificate Template */}
      <div className="hidden">
        {user.completedTutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            ref={certificateRef}
            style={{
              width: "800px",
              height: "600px",
              padding: "40px",
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "10px solid #818cf8",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px" }}>Certificate of Completion</h1>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>This certifies that</p>
            <h2 style={{ fontSize: "36px", fontWeight: "600", marginBottom: "8px" }}>{user.name}</h2>
            <p style={{ fontSize: "20px", marginBottom: "16px" }}>has successfully completed the course</p>
            <h3 style={{ fontSize: "28px", fontWeight: "500", marginBottom: "24px" }}>{tutorial.title}</h3>
            <p style={{ fontSize: "14px", color: "#555555" }}>Congratulations on your achievement!</p>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 w-fit transition"
      >
        <FaSignOutAlt className="inline mr-2" /> Logout
      </button>
    </div>
  );
};

export default Profile;
