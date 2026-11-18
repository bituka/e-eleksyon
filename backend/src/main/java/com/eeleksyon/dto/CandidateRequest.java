package com.eeleksyon.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CandidateRequest {
    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 2000)
    private String bio;

    @Size(max = 100)
    private String partyAffiliation;

    private String imageUrl;

    @NotNull
    private Long electionId;
}