package com.eeleksyon.controller;

import com.eeleksyon.dto.CandidateRequest;
import com.eeleksyon.model.Candidate;
import com.eeleksyon.model.Election;
import com.eeleksyon.service.CandidateService;
import com.eeleksyon.service.ElectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private ElectionService electionService;

    @GetMapping("/election/{electionId}")
    public ResponseEntity<List<Candidate>> getCandidatesByElection(@PathVariable Long electionId) {
        return ResponseEntity.ok(candidateService.getByElection(electionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidate(@PathVariable Long id) {
        return ResponseEntity.ok(candidateService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Candidate> createCandidate(@Valid @RequestBody CandidateRequest request) {
        Election election = electionService.getById(request.getElectionId());
        Candidate candidate = new Candidate();
        candidate.setElection(election);
        candidate.setName(request.getName());
        candidate.setBio(request.getBio());
        candidate.setPartyAffiliation(request.getPartyAffiliation());
        candidate.setImageUrl(request.getImageUrl());
        return ResponseEntity.ok(candidateService.create(candidate));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @Valid @RequestBody CandidateRequest request) {
        Election election = electionService.getById(request.getElectionId());
        Candidate candidate = new Candidate();
        candidate.setElection(election);
        candidate.setName(request.getName());
        candidate.setBio(request.getBio());
        candidate.setPartyAffiliation(request.getPartyAffiliation());
        candidate.setImageUrl(request.getImageUrl());
        return ResponseEntity.ok(candidateService.update(id, candidate));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        candidateService.delete(id);
        return ResponseEntity.ok().build();
    }
}