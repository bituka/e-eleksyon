package com.eeleksyon.service;

import com.eeleksyon.model.Election;
import com.eeleksyon.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ElectionService {

    @Autowired
    private ElectionRepository electionRepository;

    public Election create(Election election) {
        return electionRepository.save(election);
    }

    public Election update(Long id, Election election) {
        Election existing = electionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Election not found"));
        existing.setTitle(election.getTitle());
        existing.setDescription(election.getDescription());
        existing.setStartDate(election.getStartDate());
        existing.setEndDate(election.getEndDate());
        return electionRepository.save(existing);
    }

    public void delete(Long id) {
        electionRepository.deleteById(id);
    }

    public Election getById(Long id) {
        return electionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Election not found"));
    }

    public List<Election> getAll() {
        return electionRepository.findAll();
    }

    public List<Election> getByStatus(Election.Status status) {
        return electionRepository.findByStatus(status);
    }

    public List<Election> getActiveElections() {
        LocalDateTime now = LocalDateTime.now();
        return electionRepository.findByStartDateBeforeAndEndDateAfter(now, now);
    }
}