import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for performance trends
const performanceData = [
  { month: 'Jan', revenue: 125000, expenses: 85000, profit: 40000 },
  { month: 'Feb', revenue: 148000, expenses: 92000, profit: 56000 },
  { month: 'Mar', revenue: 172000, expenses: 97000, profit: 75000 },
  { month: 'Apr', revenue: 168000, expenses: 102000, profit: 66000 },
  { month: 'May', revenue: 195000, expenses: 110000, profit: 85000 },
  { month: 'Jun', revenue: 220000, expenses: 115000, profit: 105000 },
];

// Sample data for market comparison
const marketComparisonData = [
  { category: 'Revenue Growth', yours: 18, industry: 12 },
  { category: 'Profit Margin', yours: 22, industry: 15 },
  { category: 'Customer Acquisition', yours: 14, industry: 18 },
  { category: 'Customer Retention', yours: 92, industry: 85 },
  { category: 'Team Efficiency', yours: 87, industry: 79 },
];

export default function InsightsPage() {
  return (
    <DashboardLayout
      pageTitle="AI Insights"
      pageDescription="AI-powered analytics and recommendations for your business"
    >
      {/* Recent Insights */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Latest AI Analysis</h3>
            <span className="text-sm text-gray-500">Updated: June 15, 2023</span>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Executive Summary</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Tech Innovators Arabia is demonstrating strong financial health with consistent revenue growth (18% YoY) and improving profit margins. Your current business model shows scalability potential, particularly in the enterprise segment where customer retention is 7% above industry average.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="text-base font-medium text-gray-900">Strengths</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Strong product-market fit in the Saudi oil & gas sector</li>
                <li>Above-average customer retention (92%)</li>
                <li>Efficient cash utilization compared to similar startups</li>
                <li>Rapid implementation speed reported by customers</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h4 className="text-base font-medium text-gray-900">Opportunities</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Expand to adjacent markets like UAE and Qatar</li>
                <li>Develop partnerships with major Saudi energy companies</li>
                <li>Introduce subscription-based pricing to improve recurring revenue</li>
                <li>Leverage Vision 2030 initiatives for sustainability solutions</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <h4 className="text-base font-medium text-gray-900">Challenges</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Customer acquisition costs trending upward (+15% in Q2)</li>
                <li>Potential market saturation in current niche</li>
                <li>Limited intellectual property protection</li>
                <li>Competition from international AI solutions providers</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Performance Trends */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Performance Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#ff8042" name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <strong>AI Insight:</strong> Your profit margin has been steadily increasing, suggesting operational efficiency improvements. The gap between revenue and expenses is widening positively, indicating strong business model economics.
          </div>
        </div>
      </Card>
      
      {/* Market Comparison */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Market Comparison</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={marketComparisonData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="yours" fill="#8884d8" name="Your Company" />
                <Bar dataKey="industry" fill="#82ca9d" name="Industry Average" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <strong>AI Insight:</strong> You're outperforming the industry in 4 of 5 key metrics. Your customer acquisition cost is higher than average, suggesting an opportunity to optimize marketing and sales strategies.
          </div>
        </div>
      </Card>
      
      {/* Recommendations */}
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Strategic Recommendations</h3>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="text-base font-medium text-indigo-800">1. Optimize Customer Acquisition</h4>
              <p className="mt-1 text-sm text-indigo-700">
                Your CAC is 15% higher than industry benchmarks. Consider refining your targeting strategy to focus on high-value accounts in the energy sector with 500+ employees. Emphasize ROI metrics in marketing materials based on success with existing clients.
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-100">
                  View Detailed Plan
                </Button>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="text-base font-medium text-indigo-800">2. Expand Regional Presence</h4>
              <p className="mt-1 text-sm text-indigo-700">
                Your solution has achieved product-market fit in Saudi Arabia. Our analysis indicates UAE and Qatar markets offer similar opportunity with lower competition. Consider allocating 20% of your marketing budget to these regions in Q3.
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-100">
                  View Market Analysis
                </Button>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="text-base font-medium text-indigo-800">3. Develop Strategic Partnerships</h4>
              <p className="mt-1 text-sm text-indigo-700">
                Our network analysis identified 5 potential strategic partners who could accelerate your market penetration. These partners offer complementary services and overlapping customer bases without direct competition.
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-100">
                  View Partner Profiles
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="primary" size="lg">
              Request Updated AI Analysis
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              Next scheduled analysis: July 15, 2023
            </p>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
} 