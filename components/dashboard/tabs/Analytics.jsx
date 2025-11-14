"use client";
import React, { useState } from 'react';
import { 
  FaUsers, 
  FaEye, 
  FaChartLine, 
  FaDollarSign, 
  FaClock, 
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaCalendar,
  FaFilter,
  FaDownload,
  FaPlay,
  FaGraduationCap,
  FaRegClock,
  FaChartBar,
  FaTable,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
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

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const StatCard = ({ title, value, icon, change, subtitle }) => {
    const isPositive = change >= 0;
    
    return (
      <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium opacity-70 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
          </div>
          <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl">
            {icon}
          </div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
            <span>{Math.abs(change)}%</span>
            <span className="text-xs opacity-70 ml-1">from previous period</span>
          </div>
        )}
      </div>
    );
  };

  const ProgressBar = ({ percentage, color = 'bg-[var(--accent)]' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 w-full h-full text-[var(--foreground)] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-sm opacity-70 mt-2">Track your tutorial performance and student engagement</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2">
            <FaCalendar className="opacity-60" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-xl hover:opacity-90 transition-opacity">
            <FaDownload className="text-sm" />
            Export Report
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-1 p-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl w-fit mb-8">
        {[
          { id: 'overview', label: 'Overview', icon: FaChartBar },
          { id: 'tutorials', label: 'Tutorials', icon: FaPlay },
          { id: 'students', label: 'Students', icon: FaUsers },
          { id: 'revenue', label: 'Revenue', icon: FaDollarSign }
        ].map((view) => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeView === view.id
                  ? 'bg-[var(--accent)] text-white'
                  : 'hover:bg-[var(--accent)]/10'
              }`}
            >
              <Icon className="text-sm" />
              {view.label}
            </button>
          );
        })}
      </div>

      {activeView === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Students"
              value={analyticsData.overview.totalStudents.toLocaleString()}
              icon={<FaUsers className="text-xl" />}
              change={analyticsData.trends.students.change}
            />
            <StatCard
              title="Total Revenue"
              value={`$${analyticsData.overview.totalRevenue.toLocaleString()}`}
              icon={<FaDollarSign className="text-xl" />}
              change={analyticsData.trends.revenue.change}
              subtitle="Lifetime earnings"
            />
            <StatCard
              title="Total Views"
              value={analyticsData.overview.totalViews.toLocaleString()}
              icon={<FaEye className="text-xl" />}
              change={analyticsData.trends.views.change}
            />
            <StatCard
              title="Avg Completion"
              value={`${analyticsData.overview.avgCompletion}%`}
              icon={<FaGraduationCap className="text-xl" />}
              change={analyticsData.trends.completion.change}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Revenue Chart */}
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Revenue Overview</h3>
                  <div className="flex items-center gap-2 text-sm opacity-70">
                    <FaChartLine />
                    <span>Monthly Revenue</span>
                  </div>
                </div>
                
                <div className="h-64 flex items-end gap-2">
                  {analyticsData.revenueData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-[var(--accent)] to-purple-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${(item.revenue / 25000) * 100}%` }}
                      ></div>
                      <span className="text-xs mt-2 opacity-70">{item.month}</span>
                      <span className="text-xs font-medium mt-1">${(item.revenue / 1000).toFixed(0)}k</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Student Progress */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Student Progress</h3>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <FaRegClock />
                  <span>Completion Rate</span>
                </div>
              </div>

              <div className="space-y-4">
                {analyticsData.studentProgress.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.lesson}</span>
                      <span className="opacity-70">{item.completed}%</span>
                    </div>
                    <ProgressBar percentage={item.completed} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Tutorials */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Top Performing Tutorials</h3>
                <FaFilter className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-4">
                {analyticsData.topTutorials.map((tutorial) => (
                  <div key={tutorial.id} className="flex items-center justify-between p-4 hover:bg-[var(--accent)]/5 rounded-xl transition-colors">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{tutorial.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs opacity-70">
                        <span className="flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          {tutorial.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <FaStar className="text-xs" />
                          {tutorial.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-500">${tutorial.revenue}</p>
                      <p className="text-xs opacity-70">{tutorial.completion}% completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geography Distribution */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Student Geography</h3>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <FaMapMarkerAlt />
                  <span>Top Countries</span>
                </div>
              </div>

              <div className="space-y-4">
                {analyticsData.geography.map((country, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{country.country}</span>
                      <span className="opacity-70">{country.students} students ({country.percentage}%)</span>
                    </div>
                    <ProgressBar 
                      percentage={country.percentage} 
                      color={index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-yellow-500' : 'bg-purple-500'}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'tutorials' && (
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <h3 className="font-semibold mb-6">Tutorial Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-3 font-medium">Tutorial</th>
                    <th className="text-right py-3 font-medium">Students</th>
                    <th className="text-right py-3 font-medium">Revenue</th>
                    <th className="text-right py-3 font-medium">Completion</th>
                    <th className="text-right py-3 font-medium">Rating</th>
                    <th className="text-right py-3 font-medium">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topTutorials.map((tutorial) => (
                    <tr key={tutorial.id} className="border-b border-[var(--border-color)]/30 hover:bg-[var(--accent)]/5 transition-colors">
                      <td className="py-4">
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{tutorial.title}</p>
                        </div>
                      </td>
                      <td className="text-right py-4">{tutorial.students}</td>
                      <td className="text-right py-4 font-semibold text-green-500">${tutorial.revenue}</td>
                      <td className="text-right py-4">
                        <div className="flex items-center justify-end gap-2">
                          <span>{tutorial.completion}%</span>
                          <ProgressBar percentage={tutorial.completion} />
                        </div>
                      </td>
                      <td className="text-right py-4">
                        <div className="flex items-center justify-end gap-1">
                          <FaStar className="text-yellow-500" />
                          <span>{tutorial.rating}</span>
                        </div>
                      </td>
                      <td className="text-right py-4">{tutorial.views.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'students' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <h3 className="font-semibold mb-6">Student Engagement</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-xl">
                <div>
                  <p className="font-semibold text-blue-500">Active Students</p>
                  <p className="text-2xl font-bold mt-1">847</p>
                </div>
                <FaUsers className="text-3xl text-blue-500 opacity-60" />
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-xl">
                <div>
                  <p className="font-semibold text-green-500">New Students</p>
                  <p className="text-2xl font-bold mt-1">124</p>
                </div>
                <FaChartLine className="text-3xl text-green-500 opacity-60" />
              </div>

              <div className="flex justify-between items-center p-4 bg-purple-500/10 rounded-xl">
                <div>
                  <p className="font-semibold text-purple-500">Completion Rate</p>
                  <p className="text-2xl font-bold mt-1">68%</p>
                </div>
                <FaGraduationCap className="text-3xl text-purple-500 opacity-60" />
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <h3 className="font-semibold mb-6">Learning Patterns</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Average Time to Complete</span>
                  <span className="font-semibold">14 days</span>
                </div>
                <ProgressBar percentage={65} color="bg-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Daily Active Time</span>
                  <span className="font-semibold">42 min</span>
                </div>
                <ProgressBar percentage={78} color="bg-green-500" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Quiz Pass Rate</span>
                  <span className="font-semibold">82%</span>
                </div>
                <ProgressBar percentage={82} color="bg-purple-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Monthly Revenue"
              value="$18,450"
              icon={<FaDollarSign className="text-xl" />}
              change={21.4}
              subtitle="Current month"
            />
            <StatCard
              title="Projected Revenue"
              value="$22,800"
              icon={<FaChartLine className="text-xl" />}
              change={15.2}
              subtitle="Next month"
            />
            <StatCard
              title="Avg. per Student"
              value="$14.80"
              icon={<FaUsers className="text-xl" />}
              change={8.3}
              subtitle="Lifetime value"
            />
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <h3 className="font-semibold mb-6">Revenue Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analyticsData.topTutorials.map((tutorial, index) => (
                <div key={tutorial.id} className="text-center p-4 bg-[var(--accent)]/5 rounded-xl">
                  <div className="text-2xl font-bold text-green-500 mb-2">
                    ${tutorial.revenue}
                  </div>
                  <div className="text-sm font-medium mb-1 truncate">{tutorial.title}</div>
                  <div className="text-xs opacity-70">{tutorial.students} students</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;