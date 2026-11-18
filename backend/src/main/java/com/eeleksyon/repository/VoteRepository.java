package com.eeleksyon.repository;

import com.eeleksyon.model.User;
import com.eeleksyon.model.Election;
import com.eeleksyon.model.Candidate;
import com.eeleksyon.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByVoterAndElection(User voter, Election election);
    List<Vote> findByElection(Election election);
    List<Vote> findByCandidate(Candidate candidate);
    long countByCandidate(Candidate candidate);
    boolean existsByVoterAndElection(User voter, Election election);
}