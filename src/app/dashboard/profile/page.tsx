import React from 'react';
import DashboardLayout from '@/components/shared/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import ProgressBar from '@/components/ui/ProgressBar';

export default function ProfilePage() {
  // Profile completion calculation based on filled fields
  const profileCompletion = 75;
  
  return (
    <DashboardLayout
      pageTitle="Profile Settings"
      pageDescription="Manage your profile information and settings"
    >
      {/* Profile Completion */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Completion</h3>
          <p className="text-sm text-gray-600 mb-4">Complete your profile to improve your match quality</p>
          <div className="flex items-center">
            <div className="flex-1 mr-4">
              <ProgressBar value={profileCompletion} />
            </div>
            <span className="text-sm font-medium text-gray-900">{profileCompletion}%</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <strong>Tip:</strong> Add your business metrics to significantly improve your matches.
          </div>
        </div>
      </Card>
      
      {/* Basic Information */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <Input
                  label="Name/Company Name"
                  placeholder="Enter your name or company name"
                  value="Tech Innovators Arabia"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select
                  label="Industry"
                  options={[
                    { value: 'technology', label: 'Technology' },
                    { value: 'healthcare', label: 'Healthcare' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'education', label: 'Education' },
                    { value: 'energy', label: 'Energy' },
                    { value: 'manufacturing', label: 'Manufacturing' },
                    { value: 'retail', label: 'Retail' },
                  ]}
                  value="technology"
                  onChange={() => {}}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  label="Founded Year"
                  type="number"
                  placeholder="YYYY"
                  value="2021"
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
                  value="contact@techinnovatorsarabia.sa"
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  label="Phone"
                  placeholder="Enter your phone number"
                  value="+966 50 123 4567"
                />
              </div>
            </div>
            
            <div className="w-full">
              <Input
                label="Website"
                placeholder="https://www.example.com"
                value="https://www.techinnovatorsarabia.sa"
              />
            </div>
            
            <div className="w-full">
              <h4 className="block text-sm font-medium text-gray-700 mb-1">
                Company Logo
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-500 text-xl">TIA</span>
                </div>
                <FileUpload
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                  onFileChange={() => {}}
                  label="Upload Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Business Details */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Business Details</h3>
          
          <div className="space-y-6">
            <div className="w-full">
              <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Company Description
              </label>
              <textarea
                id="companyDescription"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your company, products, and vision..."
                defaultValue="Tech Innovators Arabia is a technology startup focusing on AI-driven solutions for the oil and gas industry in Saudi Arabia. Our advanced analytics platform helps energy companies optimize their operations, reduce costs, and improve safety measures through predictive maintenance and real-time monitoring."
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <Select
                  label="Company Stage"
                  options={[
                    { value: 'idea', label: 'Idea Stage' },
                    { value: 'pre-seed', label: 'Pre-Seed' },
                    { value: 'seed', label: 'Seed' },
                    { value: 'series-a', label: 'Series A' },
                    { value: 'series-b', label: 'Series B' },
                    { value: 'growth', label: 'Growth Stage' },
                    { value: 'mature', label: 'Mature' },
                  ]}
                  value="seed"
                  onChange={() => {}}
                />
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  label="Team Size"
                  type="number"
                  placeholder="Number of employees"
                  value="12"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Select
                  label="Current Funding"
                  options={[
                    { value: 'pre-revenue', label: 'Pre-Revenue' },
                    { value: 'bootstrapped', label: 'Bootstrapped' },
                    { value: '<500k', label: 'Under $500K' },
                    { value: '500k-1m', label: '$500K - $1M' },
                    { value: '1m-5m', label: '$1M - $5M' },
                    { value: '5m-10m', label: '$5M - $10M' },
                    { value: '>10m', label: 'Over $10M' },
                  ]}
                  value="500k-1m"
                  onChange={() => {}}
                />
              </div>
            </div>
            
            <div className="w-full">
              <h4 className="block text-sm font-medium text-gray-700 mb-1">
                Key Markets
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <span>Saudi Arabia</span>
                  <button type="button" className="ml-1.5 text-blue-600 hover:text-blue-800">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <span>UAE</span>
                  <button type="button" className="ml-1.5 text-blue-600 hover:text-blue-800">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <span>Qatar</span>
                  <button type="button" className="ml-1.5 text-blue-600 hover:text-blue-800">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
                <button type="button" className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Market
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Financial & Growth Metrics */}
      <Card className="mb-6">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Financial & Growth Metrics</h3>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <Input
                  label="Annual Revenue (SAR)"
                  type="number"
                  placeholder="Enter annual revenue"
                  value="2500000"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  label="Monthly Growth Rate (%)"
                  type="number"
                  placeholder="Enter monthly growth rate"
                  value="8.5"
                />
              </div>
              <div className="w-full md:w-1/3">
                <Input
                  label="Customer Acquisition Cost (SAR)"
                  type="number"
                  placeholder="Enter CAC"
                  value="5000"
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <Input
                  label="Lifetime Value (SAR)"
                  type="number"
                  placeholder="Enter customer LTV"
                  value="45000"
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  label="Burn Rate (SAR/month)"
                  type="number"
                  placeholder="Enter monthly burn rate"
                  value="180000"
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <Select
                  label="Funding Needed"
                  options={[
                    { value: 'none', label: 'Not Currently Raising' },
                    { value: '<1m', label: 'Under $1M' },
                    { value: '1m-3m', label: '$1M - $3M' },
                    { value: '3m-5m', label: '$3M - $5M' },
                    { value: '5m-10m', label: '$5M - $10M' },
                    { value: '>10m', label: 'Over $10M' },
                  ]}
                  value="3m-5m"
                  onChange={() => {}}
                />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                  label="Runway (months)"
                  type="number"
                  placeholder="Enter remaining runway"
                  value="14"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button variant="primary" size="lg">
          Save Changes
        </Button>
      </div>
    </DashboardLayout>
  );
} 