import React from 'react';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/useAuth';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RISE - AI-Powered Analytics for Saudi Startups',
  description: 'RISE transforms raw business data into actionable insights, enabling startups to grow and investors to make informed decisions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 