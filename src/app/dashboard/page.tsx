import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Sample data for charts
const pieData = [
  { name: 'Technology', value: 45 },
  { name: 'Healthcare', value: 20 },
  { name: 'Finance', value: 15 },
  { name: 'Education', value: 10 },
  { name: 'Others', value: 10 },
];

const barData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 8 },
  { name: 'Apr', value: 15 },
  { name: 'May', value: 22 },
  { name: 'Jun', value: 30 },
];

const lineData = [
  { name: 'Week 1', investors: 4, startups: 12 },
  { name: 'Week 2', investors: 6, startups: 15 },
  { name: 'Week 3', investors: 8, startups: 18 },
  { name: 'Week 4', investors: 10, startups: 22 },
  { name: 'Week 5', investors: 12, startups: 25 },
  { name: 'Week 6', investors: 14, startups: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  return (
    <DashboardLayout
      pageTitle="Dashboard Overview"
      pageDescription="Your key metrics and insights at a glance"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="p-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Matches</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">24</p>
              <p className="ml-2 text-sm text-green-600">+14%</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-gray-500 text-sm font-medium">Pending Connections</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">8</p>
              <p className="ml-2 text-sm text-yellow-600">+3%</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">68%</p>
              <p className="ml-2 text-sm text-green-600">+7%</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-gray-500 text-sm font-medium">Profile Views</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">312</p>
              <p className="ml-2 text-sm text-green-600">+18%</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Industry Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Connections</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Platform Growth */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="investors" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="startups" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">New match with Saudi Tech Ventures</h3>
                      <p className="text-sm text-gray-500">2h ago</p>
                    </div>
                    <p className="text-sm text-gray-500">Compatibility score: 85%</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Profile viewed by Riyadh Angels</h3>
                      <p className="text-sm text-gray-500">5h ago</p>
                    </div>
                    <p className="text-sm text-gray-500">They spent 4 minutes on your profile</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Connection request accepted by Growth Capital</h3>
                      <p className="text-sm text-gray-500">1d ago</p>
                    </div>
                    <p className="text-sm text-gray-500">You can now message them directly</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Your latest metrics were updated</h3>
                      <p className="text-sm text-gray-500">2d ago</p>
                    </div>
                    <p className="text-sm text-gray-500">AI analysis shows 12% growth potential</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
} 