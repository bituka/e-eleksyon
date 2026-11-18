'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Election, Candidate } from '@/types';
import api from '@/lib/api';
import { Vote, Calendar, Clock, CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ElectionWithCandidates extends Election {
  candidates: Candidate[];
}

export default function ElectionsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [elections, setElections] = useState<ElectionWithCandidates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchElections();
    }
  }, [user]);

  const fetchElections = async () => {
    try {
      setLoading(true);
      const response = await api.get<ElectionWithCandidates[]>('/elections');
      setElections(response.data);
    } catch (err: any) {
      setError('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'UPCOMING': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="h-4 w-4" />;
      case 'UPCOMING': return <Clock className="h-4 w-4" />;
      case 'COMPLETED': return <CheckCircle className="h-4 w-4" />;
      case 'CANCELLED': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Elections</h1>
            <p className="mt-1 text-gray-600">Browse and participate in active elections</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : elections.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Vote className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No elections found</h3>
            <p className="text-gray-500">Check back later for new elections.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.map((election) => (
              <Link
                key={election.id}
                href={`/elections/${election.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{election.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{election.description || 'No description available'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(election.status)} flex items-center space-x-1`}>
                    {getStatusIcon(election.status)}
                    <span>{election.status}</span>
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Starts: {format(parseISO(election.startDate), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Ends: {format(parseISO(election.endDate), 'MMM d, yyyy h:mm a')}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500 mb-3">
                    {election.candidates?.length || 0} candidate{election.candidates?.length !== 1 ? 's' : ''} running
                  </p>
                  {election.status === 'ACTIVE' && (
                    <div className="flex items-center justify-center text-primary-600 font-medium text-sm">
                      <Vote className="h-4 w-4 mr-1" />
                      <span>Vote Now</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  )}
                  {election.status === 'COMPLETED' && (
                    <div className="flex items-center justify-center text-green-600 font-medium text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>View Results</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}