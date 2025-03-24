import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] text-transparent bg-clip-text">
                RISE
              </span>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
            </nav>
            
            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                  <span>AI-Powered Analytics for the</span>{' '}
                  <span className="bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] text-transparent bg-clip-text">Saudi Startup Ecosystem</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  RISE transforms raw business data into actionable insights, enabling startups to grow and investors to make informed decisions.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/register?role=startup">
                    <Button variant="primary" size="lg">
                      Join as Startup
                    </Button>
                  </Link>
                  <Link href="/register?role=investor">
                    <Button variant="outline" size="lg">
                      Join as Investor
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block relative">
                <div className="w-full h-[400px] bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] rounded-lg opacity-20 absolute -right-10 top-10"></div>
                <div className="w-full h-[400px] border-2 border-gray-200 rounded-lg relative">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <p className="text-xl font-semibold text-center text-gray-800">Dashboard Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Powerful Features for Growth
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to elevate your business strategy and investment decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-gray-600">
                Monitor key performance indicators and market trends with interactive dashboards updated in real-time.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Matching Algorithm</h3>
              <p className="text-gray-600">
                Connect startups with the right investors through our sophisticated matching algorithm tailored to the Saudi market.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Data Handling</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and compliant with local regulations including Saudi PDPL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              How RISE Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple process to transform your business data into strategic insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 -ml-3 bg-[#00bfe6] rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">1</div>
              <div className="bg-white pt-10 px-6 pb-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Register and Input Data</h3>
                <p className="text-gray-600">
                  Create your profile, select your role (startup or investor), and input your key business metrics or investment criteria.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 -ml-3 bg-[#00bfe6] rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">2</div>
              <div className="bg-white pt-10 px-6 pb-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Our AI engine analyzes your data and generates actionable insights, performance metrics, and potential matches.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 -ml-3 bg-[#00bfe6] rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">3</div>
              <div className="bg-white pt-10 px-6 pb-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Connect and Grow</h3>
                <p className="text-gray-600">
                  Review your matches, connect with potential partners, and leverage insights to drive strategic growth decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#00002e] via-[#00bfe6] to-[#b04af6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Transform Your Business?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join RISE today and gain access to powerful analytics and connections that will drive your success in the Saudi market.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#00bfe6] hover:bg-gray-100">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-[#00bfe6] to-[#b04af6] text-transparent bg-clip-text">
                RISE
              </span>
              <p className="mt-4 text-gray-400">
                AI-powered analytics for the Saudi startup ecosystem
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="/features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="/api" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="/integrations" className="text-gray-400 hover:text-white">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/docs" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="/tutorials" className="text-gray-400 hover:text-white">Tutorials</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="/compliance" className="text-gray-400 hover:text-white">PDPL Compliance</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} RISE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 