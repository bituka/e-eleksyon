'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { User } from '@/types';
import api from '@/lib/api';
import { User as UserIcon, Mail, Shield, Calendar, Loader2, LogOut } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function ProfilePage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [votingHistory, setVotingHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchVotingHistory();
    }
  }, [user]);

  const fetchVotingHistory = async () => {
    try {
      const response = await api.get('/votes/history');
      setVotingHistory(response.data);
    } catch (err) {
      // Ignore error
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-gray-600">Manage your account and view voting history</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-10 w-10 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                <p className="text-gray-600">{user.email}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                }`}>
                  {user.role === 'ADMIN' ? (
                    <>
                      <Shield className="h-4 w-4 mr-1" />
                      Administrator
                    </>
                  ) : (
                    <>
                      <UserIcon className="h-4 w-4 mr-1" />
                      Voter
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="mt-1 text-gray-900">{user.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Role</label>
                <p className="mt-1 text-gray-900 capitalize">{user.role.toLowerCase()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Member Since</label>
                <p className="mt-1 text-gray-900">
                  {user.id ? 'Account created' : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Voting History</h3>
              <span className="text-sm text-gray-500">{votingHistory.length} elections voted</span>
            </div>

            {votingHistory.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No voting history</h4>
                <p className="text-gray-500">You haven't voted in any elections yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {votingHistory.map((vote: any) => (
                  <div key={vote.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{vote.electionTitle || 'Election'}</h4>
                        <p className="text-sm text-gray-500">
                          Voted for {vote.candidateName || 'a candidate'} on {format(parseISO(vote.votedAt), 'MMMM d, yyyy \'at\' h:mm a')}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Voted
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={logout}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center space-x-2"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}