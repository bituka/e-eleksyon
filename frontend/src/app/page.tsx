'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Vote, Shield, Users, Clock, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Secure Voting',
      description: 'End-to-end encryption and blockchain-inspired integrity for tamper-proof elections.',
    },
    {
      icon: Users,
      title: 'Voter Management',
      description: 'Comprehensive voter registration, verification, and authentication system.',
    },
    {
      icon: Clock,
      title: 'Real-time Results',
      description: 'Live vote counting and transparent result aggregation with audit trails.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Vote className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-bold text-gray-900">E-Eleksyon</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/elections" className="text-gray-600 hover:text-gray-900 font-medium">
                Elections
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              {user ? (
                <>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin" className="text-gray-600 hover:text-gray-900 font-medium">
                      Admin Dashboard
                    </Link>
                  )}
                  <Link href="/profile" className="text-gray-600 hover:text-gray-900 font-medium">
                    Profile
                  </Link>
                  <button onClick={logout} className="text-gray-600 hover:text-gray-900 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link href="/elections" className="text-gray-600 hover:text-gray-900 font-medium">
                  Elections
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">
                  About
                </Link>
                {user ? (
                  <>
                    {user.role === 'ADMIN' && (
                      <Link href="/admin" className="text-gray-600 hover:text-gray-900 font-medium">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link href="/profile" className="text-gray-600 hover:text-gray-900 font-medium">
                      Profile
                    </Link>
                    <button onClick={logout} className="text-gray-600 hover:text-gray-900 font-medium text-left">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                      Login
                    </Link>
                    <Link href="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Secure, Transparent, and{' '}
              <span className="text-primary-600">Accessible</span> Digital Elections
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              E-Eleksyon is a modern online voting platform designed to make digital elections
              secure, transparent, and user-friendly for everyone.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {!user ? (
                <>
                  <Link
                    href="/register"
                    className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/elections"
                    className="w-full sm:w-auto bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-50 transition-colors"
                  >
                    View Elections
                  </Link>
                </>
              ) : (
                <Link
                  href="/elections"
                  className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Elections</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Key Features</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to run secure and transparent digital elections
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  How It Works
                </h2>
                <div className="space-y-6">
                  {[
                    'Register as a voter with secure identity verification',
                    'Browse active and upcoming elections',
                    'Cast your vote securely from any device',
                    'View real-time results with full transparency',
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <p className="text-gray-600 text-lg pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Vote?</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of voters participating in secure digital elections.
                  Create your account in minutes and make your voice heard.
                </p>
                <Link
                  href={user ? '/elections' : '/register'}
                  className="inline-flex items-center justify-center w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  {user ? 'Browse Elections' : 'Create Free Account'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Vote className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold">E-Eleksyon</span>
              </Link>
              <p className="mt-4 text-gray-400">Secure digital elections for everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/elections" className="hover:text-white">Elections</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 E-Eleksyon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}