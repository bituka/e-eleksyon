package com.eeleksyon.service;

import com.eeleksyon.model.Candidate;
import com.eeleksyon.model.Election;
import com.eeleksyon.repository.CandidateRepository;
import com.eeleksyon.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ElectionRepository electionRepository;

    public Candidate create(Candidate candidate) {
        Election election = electionRepository.findById(candidate.getElection().getId())
                .orElseThrow(() -> new RuntimeException("Election not found"));
        candidate.setElection(election);
        return candidateRepository.save(candidate);
    }

    public Candidate update(Long id, Candidate candidate) {
        Candidate existing = candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        if (candidate.getElection() != null && candidate.getElection().getId() != null) {
            Election election = electionRepository.findById(candidate.getElection().getId())
                    .orElseThrow(() -> new RuntimeException("Election not found"));
            existing.setElection(election);
        }
        existing.setName(candidate.getName());
        existing.setBio(candidate.getBio());
        existing.setPartyAffiliation(candidate.getPartyAffiliation());
        existing.setImageUrl(candidate.getImageUrl());
        return candidateRepository.save(existing);
    }

    public void delete(Long id) {
        candidateRepository.deleteById(id);
    }

    public Candidate getById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    public List<Candidate> getByElection(Long electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));
        return candidateRepository.findByElection(election);
    }
}