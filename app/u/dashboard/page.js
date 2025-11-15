"use client";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { Suspense } from "react";

export default function DashboardPage() {


  return <Suspense>
    <DashboardContent />;
  </Suspense>
}
