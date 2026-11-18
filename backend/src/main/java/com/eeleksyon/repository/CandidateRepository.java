package com.eeleksyon.repository;

import com.eeleksyon.model.Candidate;
import com.eeleksyon.model.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByElection(Election election);
    List<Candidate> findByElectionId(Long electionId);
}