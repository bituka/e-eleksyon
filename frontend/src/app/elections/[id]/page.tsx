'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Election, Candidate, ElectionResult } from '@/types';
import api from '@/lib/api';
import { Vote, Calendar, Clock, CheckCircle, XCircle, Loader2, ArrowLeft, BarChart2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ElectionWithCandidates extends Election {
  candidates: Candidate[];
}

export default function ElectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [election, setElection] = useState<ElectionWithCandidates | null>(null);
  const [results, setResults] = useState<ElectionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const electionId = params.id as string;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchElection();
      checkHasVoted();
    }
  }, [user, electionId]);

  const fetchElection = async () => {
    try {
      setLoading(true);
      const response = await api.get<ElectionWithCandidates>(`/elections/${electionId}`);
      setElection(response.data);
    } catch (err: any) {
      setError('Failed to load election');
    } finally {
      setLoading(false);
    }
  };

  const checkHasVoted = async () => {
    try {
      const response = await api.get<boolean>(`/votes/election/${electionId}/has-voted`);
      setHasVoted(response.data);
      if (response.data) {
        fetchResults();
      }
    } catch (err) {
      // Ignore error
    }
  };

  const fetchResults = async () => {
    try {
      const response = await api.get<ElectionResult>(`/votes/election/${electionId}/results`);
      setResults(response.data);
      setShowResults(true);
    } catch (err) {
      // Ignore error
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setError('');
    setVoting(true);
    try {
      await api.post('/votes', { candidateId: selectedCandidate, electionId: parseInt(electionId) });
      setHasVoted(true);
      setSelectedCandidate(null);
      fetchResults();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to cast vote');
    } finally {
      setVoting(false);
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

  const canVote = election?.status === 'ACTIVE' && !hasVoted && !loading;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user || !election) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/elections" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Elections
        </Link>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{election.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(election.status)} flex items-center space-x-1`}>
                  {getStatusIcon(election.status)}
                  <span>{election.status}</span>
                </span>
              </div>
            </div>

            {election.description && (
              <p className="text-gray-600 mb-6">{election.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Starts: {format(parseISO(election.startDate), 'MMMM d, yyyy \'at\' h:mm a')}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>Ends: {format(parseISO(election.endDate), 'MMMM d, yyyy \'at\' h:mm a')}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {showResults ? 'Results' : 'Candidates'}
            </h2>

            {showResults && results ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">
                    Total votes cast: <span className="font-semibold text-gray-900">{results.totalVotes}</span>
                  </p>
                </div>
                {results.candidates.map((candidate) => (
                  <div key={candidate.candidateId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{candidate.candidateName}</h3>
                        {candidate.partyAffiliation && (
                          <p className="text-sm text-gray-500">{candidate.partyAffiliation}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-600">{candidate.voteCount}</p>
                        <p className="text-sm text-gray-500">{candidate.percentage}%</p>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded"
                        style={{ width: `${candidate.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {election.candidates?.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => canVote && setSelectedCandidate(candidate.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCandidate === candidate.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!canVote ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedCandidate === candidate.id
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedCandidate === candidate.id && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        {candidate.partyAffiliation && (
                          <p className="text-sm text-gray-500">{candidate.partyAffiliation}</p>
                        )}
                        {candidate.bio && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{candidate.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {canVote && !showResults && election.candidates && election.candidates.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleVote}
                  disabled={voting || !selectedCandidate}
                  className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {voting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Vote className="h-5 w-5" />
                      <span>Cast Vote</span>
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Your vote is anonymous and cannot be changed once submitted.
                </p>
              </div>
            )}

            {hasVoted && !showResults && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowResults(true)}
                  className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center space-x-2"
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>View Results</span>
                </button>
              </div>
            )}

            {(!canVote && !hasVoted) && (
              <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500">
                {election.status === 'UPCOMING' && <p>Voting has not started yet.</p>}
                {election.status === 'COMPLETED' && <p>This election has ended.</p>}
                {election.status === 'CANCELLED' && <p>This election has been cancelled.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}