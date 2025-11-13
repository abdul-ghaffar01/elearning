"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/loginStore";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useUserStore();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace("/login");
    }
  }, [isLoggedIn, user, router]);

  // Avoid flashing dashboard while redirecting
  if (!isLoggedIn || !user) return null;

  return <DashboardContent />;
}
