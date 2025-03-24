import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  pageTitle,
  pageDescription,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00bfe6]"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            Please{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              sign in
            </a>{' '}
            to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation sidebar */}
      <div className="w-64 hidden md:block">
        <Navigation className="h-full border-r border-gray-200" />
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10">
        <Navigation />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header with page title */}
        <header className="bg-white shadow-sm py-4 px-6 md:px-8 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              {pageTitle && (
                <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
              )}
              {pageDescription && (
                <p className="mt-1 text-sm text-gray-500">{pageDescription}</p>
              )}
            </div>
            
            {/* Logo */}
            <div className="md:hidden">
              <span className="text-xl font-bold bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] text-transparent bg-clip-text">
                RISE
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className={cn(
            'flex-1 py-6 px-4 md:px-8',
            'md:mt-0 mt-16' // Add top margin for mobile to account for fixed navigation
          )}
        >
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6 md:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} RISE. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout; 