package com.eeleksyon.service;

import com.eeleksyon.dto.ElectionResultDTO;
import com.eeleksyon.model.*;
import com.eeleksyon.repository.CandidateRepository;
import com.eeleksyon.repository.ElectionRepository;
import com.eeleksyon.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ElectionRepository electionRepository;

    @Transactional
    public Vote castVote(User voter, Long candidateId, Long electionId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        if (!candidate.getElection().getId().equals(electionId)) {
            throw new RuntimeException("Candidate does not belong to this election");
        }

        if (election.getStatus() != Election.Status.ACTIVE) {
            throw new RuntimeException("Election is not active");
        }

        if (voteRepository.existsByVoterAndElection(voter, election)) {
            throw new RuntimeException("You have already voted in this election");
        }

        Vote vote = new Vote();
        vote.setVoter(voter);
        vote.setCandidate(candidate);
        vote.setElection(election);
        vote.setVotedAt(LocalDateTime.now());

        return voteRepository.save(vote);
    }

    public ElectionResultDTO getResults(Long electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        List<Candidate> candidates = candidateRepository.findByElectionId(electionId);
        List<Vote> votes = voteRepository.findByElection(election);

        long totalVotes = votes.size();

        List<ElectionResultDTO.CandidateResultDTO> candidateResults = candidates.stream()
                .map(c -> {
                    long voteCount = voteRepository.countByCandidate(c);
                    double percentage = totalVotes > 0 ? (double) voteCount / totalVotes * 100 : 0;
                    ElectionResultDTO.CandidateResultDTO result = new ElectionResultDTO.CandidateResultDTO();
                    result.setCandidateId(c.getId());
                    result.setCandidateName(c.getName());
                    result.setPartyAffiliation(c.getPartyAffiliation());
                    result.setVoteCount(voteCount);
                    result.setPercentage(Math.round(percentage * 100.0) / 100.0);
                    return result;
                })
                .collect(Collectors.toList());

        ElectionResultDTO result = new ElectionResultDTO();
        result.setElectionId(election.getId());
        result.setElectionTitle(election.getTitle());
        result.setElectionStatus(election.getStatus().name());
        result.setCandidates(candidateResults);
        result.setTotalVotes(totalVotes);

        return result;
    }

    public boolean hasVoted(User voter, Long electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));
        return voteRepository.existsByVoterAndElection(voter, election);
    }
}