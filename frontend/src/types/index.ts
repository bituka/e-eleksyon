export interface User {
  id: number;
  email: string;
  fullName: string;
  role: 'VOTER' | 'ADMIN';
}

export interface Election {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  candidates?: Candidate[];
}

export interface ElectionRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Candidate {
  id: number;
  name: string;
  bio: string;
  partyAffiliation: string;
  imageUrl: string;
  electionId: number;
  election?: {
    id: number;
    title: string;
  };
}

export interface CandidateRequest {
  name: string;
  bio: string;
  partyAffiliation: string;
  imageUrl: string;
  electionId: number;
}

export interface Vote {
  id: number;
  voterId: number;
  candidateId: number;
  electionId: number;
  votedAt: string;
}

export interface ElectionResult {
  electionId: number;
  electionTitle: string;
  electionStatus: string;
  totalVotes: number;
  candidates: CandidateResult[];
}

export interface CandidateResult {
  candidateId: number;
  candidateName: string;
  partyAffiliation: string;
  voteCount: number;
  percentage: number;
}

export interface AuthResponse {
  token: string;
  type?: string;
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface ApiError {
  message: string;
  status: number;
}