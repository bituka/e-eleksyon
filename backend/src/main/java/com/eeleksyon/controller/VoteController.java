package com.eeleksyon.controller;

import com.eeleksyon.dto.ElectionResultDTO;
import com.eeleksyon.dto.VoteRequest;
import com.eeleksyon.model.User;
import com.eeleksyon.model.Vote;
import com.eeleksyon.security.UserDetailsServiceImpl;
import com.eeleksyon.service.VoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping
    public ResponseEntity<?> castVote(@Valid @RequestBody VoteRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User voter = (User) auth.getPrincipal();

        Vote vote = voteService.castVote(voter, request.getCandidateId(), request.getElectionId());
        return ResponseEntity.ok(vote);
    }

    @GetMapping("/election/{electionId}/results")
    public ResponseEntity<ElectionResultDTO> getResults(@PathVariable Long electionId) {
        return ResponseEntity.ok(voteService.getResults(electionId));
    }

    @GetMapping("/election/{electionId}/has-voted")
    public ResponseEntity<Boolean> hasVoted(@PathVariable Long electionId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User voter = (User) auth.getPrincipal();
        return ResponseEntity.ok(voteService.hasVoted(voter, electionId));
    }
}