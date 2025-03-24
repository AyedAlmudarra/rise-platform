import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import MatchCard from '@/components/shared/MatchCard';
import { Card } from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

// Sample match data
const sampleMatches = [
  {
    id: '1',
    name: 'Tech Innovators Arabia',
    description: 'A promising tech startup focusing on AI-driven solutions for the oil and gas industry in Saudi Arabia.',
    compatibilityScore: 92,
    matchReasons: [
      'Industry alignment',
      'Growth potential',
      'Technology focus'
    ],
    status: 'pending',
    profileType: 'startup'
  },
  {
    id: '2',
    name: 'Saudi Venture Capital',
    description: 'Leading investment firm specializing in early-stage tech startups with a focus on digital transformation.',
    compatibilityScore: 88,
    matchReasons: [
      'Investment strategy match',
      'Portfolio complementary',
      'Geographic focus'
    ],
    status: 'pending',
    profileType: 'investor'
  },
  {
    id: '3',
    name: 'Riyadh Health Solutions',
    description: 'Healthcare technology startup developing telemedicine platforms for hospitals across the Kingdom.',
    compatibilityScore: 85,
    matchReasons: [
      'Sector expertise',
      'Scalable business model',
      'Team experience'
    ],
    status: 'accepted',
    profileType: 'startup'
  },
  {
    id: '4',
    name: 'Gulf Innovation Fund',
    description: 'Investment fund focusing on supporting innovative businesses with high growth potential across the GCC.',
    compatibilityScore: 79,
    matchReasons: [
      'Financial objectives alignment',
      'Market focus',
      'Industry expertise'
    ],
    status: 'rejected',
    profileType: 'investor'
  },
  {
    id: '5',
    name: 'Sustainable Energy Solutions',
    description: "Green energy startup focusing on sustainable solutions for Saudi Arabia's 2030 vision.",
    compatibilityScore: 76,
    matchReasons: [
      'Vision 2030 alignment',
      'Sustainability focus',
      'Team expertise'
    ],
    status: 'pending',
    profileType: 'startup'
  },
];

export default function MatchesPage() {
  return (
    <DashboardLayout
      pageTitle="Your Matches"
      pageDescription="Discover your most compatible connections"
    >
      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900">Match Filters</h3>
            <div className="flex flex-wrap gap-3">
              <div className="w-48">
                <Select 
                  label="Status"
                  options={[
                    { value: 'all', label: 'All Statuses' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'accepted', label: 'Accepted' },
                    { value: 'rejected', label: 'Rejected' }
                  ]}
                  value="all"
                  onChange={() => {}}
                />
              </div>
              <div className="w-48">
                <Select 
                  label="Sort By"
                  options={[
                    { value: 'compatibility', label: 'Compatibility' },
                    { value: 'recent', label: 'Most Recent' },
                    { value: 'name', label: 'Name' }
                  ]}
                  value="compatibility"
                  onChange={() => {}}
                />
              </div>
              <Button variant="outline" className="mt-auto">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Match Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="p-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Matches</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">24</p>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-gray-500 text-sm font-medium">Pending Actions</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">8</p>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="text-gray-500 text-sm font-medium">Match Success Rate</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">68%</p>
          </div>
        </Card>
      </div>
      
      {/* Matches List */}
      <div className="space-y-6">
        {sampleMatches.map(match => (
          <MatchCard
            key={match.id}
            name={match.name}
            description={match.description}
            compatibilityScore={match.compatibilityScore}
            matchReasons={match.matchReasons}
            status={match.status as 'pending' | 'accepted' | 'rejected'}
            profileType={match.profileType as 'startup' | 'investor'}
            onAccept={() => {}}
            onReject={() => {}}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="primary" size="sm" className="bg-gray-900">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="text-gray-500">...</span>
          <Button variant="outline" size="sm">
            8
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </nav>
      </div>
    </DashboardLayout>
  );
} 