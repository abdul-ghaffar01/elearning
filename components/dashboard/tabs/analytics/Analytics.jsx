"use client";
import React, { useState } from 'react';
import Revenue from './Revenue';
import TutorialPerformance from './TutorialPerformance';
import Students from './Students';
import Header from './Header';
import Tabs from './Tabs';
import Overview from './Overview';

const Analytics = () => {
  const [activeView, setActiveView] = useState('overview');

  // Mock data - in real app, this would come from API
  const analyticsData = {
    overview: {
      totalStudents: 1247,
      totalRevenue: 18450,
      totalViews: 45289,
      avgCompletion: 68,
      avgRating: 4.8,
      totalHours: 342
    },
    trends: {
      students: { current: 1247, previous: 983, change: 26.8 },
      revenue: { current: 18450, previous: 15200, change: 21.4 },
      views: { current: 45289, previous: 38210, change: 18.5 },
      completion: { current: 68, previous: 62, change: 9.7 }
    },
    topTutorials: [
      {
        id: 1,
        title: "Complete React + Next.js Cloud Engineering Bootcamp",
        students: 420,
        revenue: 8400,
        completion: 72,
        rating: 4.9,
        views: 12500
      },
      {
        id: 2,
        title: "Data Structures & Algorithms Mastery",
        students: 380,
        revenue: 7600,
        completion: 65,
        rating: 4.7,
        views: 9800
      },
      {
        id: 3,
        title: "AWS Certified Solutions Architect",
        students: 295,
        revenue: 5900,
        completion: 58,
        rating: 4.8,
        views: 7500
      }
    ],
    studentProgress: [
      { lesson: "Introduction", completed: 95 },
      { lesson: "Basic Concepts", completed: 88 },
      { lesson: "Advanced Topics", completed: 72 },
      { lesson: "Project Setup", completed: 65 },
      { lesson: "Final Project", completed: 45 }
    ],
    geography: [
      { country: "United States", students: 420, percentage: 34 },
      { country: "India", students: 280, percentage: 22 },
      { country: "United Kingdom", students: 150, percentage: 12 },
      { country: "Germany", students: 95, percentage: 8 },
      { country: "Canada", students: 85, percentage: 7 },
      { country: "Others", students: 217, percentage: 17 }
    ],
    revenueData: [
      { month: 'Jan', revenue: 12000 },
      { month: 'Feb', revenue: 15000 },
      { month: 'Mar', revenue: 13200 },
      { month: 'Apr', revenue: 18450 },
      { month: 'May', revenue: 21000 },
      { month: 'Jun', revenue: 19500 }
    ]
  };



  return (
    <div className="p-6 lg:p-8 w-full h-full text-[var(--foreground)] overflow-y-auto">
      {/* Header */}
      <Header />

      {/* View Toggle */}
      <Tabs activeView={activeView} setActiveView={setActiveView} />

      {activeView === 'overview' && <Overview analyticsData={analyticsData} />}

      {activeView === 'tutorials' && <TutorialPerformance analyticsData={analyticsData} />}

      {activeView === 'students' && <Students />}

      {activeView === 'revenue' && <Revenue analyticsData={analyticsData} />}
    </div>
  );
};

export default Analytics;