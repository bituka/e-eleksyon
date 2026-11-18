package com.eeleksyon.repository;

import com.eeleksyon.model.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
    List<Election> findByStatus(Election.Status status);
    List<Election> findByStartDateBeforeAndEndDateAfter(LocalDateTime start, LocalDateTime end);
    List<Election> findByStatusIn(List<Election.Status> statuses);
}