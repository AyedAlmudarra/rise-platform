'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface NavigationProps {
  className?: string;
}

// Extract SVG icons to a separate constant
const ICONS = {
  dashboard: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  ),
  profile: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  ),
  matches: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
    </svg>
  ),
  messages: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
    </svg>
  ),
  insights: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  ),
  documents: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
    </svg>
  ),
  discover: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd" />
    </svg>
  ),
  analytics: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
    </svg>
  ),
  portfolio: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  ),
};

// Helper functions for role-based navigation
const getCommonNavigation = (): NavigationItem[] => [
  { name: 'Dashboard', href: '/dashboard', icon: ICONS.dashboard },
  { name: 'Matches', href: '/dashboard/matches', icon: ICONS.matches },
  { name: 'Messages', href: '/dashboard/messages', icon: ICONS.messages },
  { name: 'AI Insights', href: '/dashboard/insights', icon: ICONS.insights },
  { name: 'Profile', href: '/dashboard/profile', icon: ICONS.profile },
];

const getStartupNavigation = (): NavigationItem[] => [
  { name: 'Dashboard', href: '/dashboard/startup', icon: ICONS.dashboard },
  { name: 'Profile', href: '/dashboard/startup/profile', icon: ICONS.profile },
  { name: 'Documents', href: '/dashboard/startup/documents', icon: ICONS.documents },
  { name: 'Analytics', href: '/dashboard/startup/analytics', icon: ICONS.analytics },
  { name: 'Investor Matches', href: '/dashboard/startup/matches', icon: ICONS.matches },
];

const getInvestorNavigation = (): NavigationItem[] => [
  { name: 'Dashboard', href: '/dashboard/investor', icon: ICONS.dashboard },
  { name: 'Profile', href: '/dashboard/investor/profile', icon: ICONS.profile },
  { name: 'Discover Startups', href: '/dashboard/investor/discover', icon: ICONS.discover },
  { name: 'Matches', href: '/dashboard/investor/matches', icon: ICONS.matches },
  { name: 'Portfolio', href: '/dashboard/investor/portfolio', icon: ICONS.portfolio },
];

const getAdminNavigation = (): NavigationItem[] => [
  { name: 'Dashboard', href: '/dashboard/admin', icon: ICONS.dashboard },
  { name: 'Users', href: '/dashboard/admin/users', icon: ICONS.users },
  { name: 'Analytics', href: '/dashboard/admin/analytics', icon: ICONS.analytics },
  { name: 'Settings', href: '/dashboard/admin/settings', icon: ICONS.insights },
];

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Role-based navigation items
  const getNavigationItems = (): NavigationItem[] => {
    if (!user) return [];

    // Enable role-based navigation
    switch (user.role) {
      case 'startup': return getStartupNavigation();
      case 'investor': return getInvestorNavigation();
      case 'admin': return getAdminNavigation();
      default: return getCommonNavigation();
    }
  };

  const navigationItems = getNavigationItems();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={cn('bg-white shadow-md', className)}>
      {/* Mobile menu button */}
      <div className="md:hidden p-4 border-b">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
          <span className="ml-2 font-medium">Menu</span>
        </button>
      </div>

      {/* Navigation content */}
      <div
        className={cn(
          'md:block',
          isMobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="px-4 py-6 md:py-8">
          <div className="flex flex-col space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-2 text-sm font-medium rounded-md group',
                    isActive
                      ? 'bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <span
                    className={cn(
                      'mr-3',
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-600'
                    )}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User info and sign out button */}
        <div className="border-t px-4 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] flex items-center justify-center text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() ?? 'U'}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.email ?? 'User'}</p>
              <button
                onClick={handleSignOut}
                className="text-xs text-gray-500 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation; 