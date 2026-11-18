package com.eeleksyon.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class VoteRequest {
    @NotNull
    private Long candidateId;

    @NotNull
    private Long electionId;
}