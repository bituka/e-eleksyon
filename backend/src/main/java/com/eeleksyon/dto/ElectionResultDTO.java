package com.eeleksyon.dto;

import lombok.Data;
import java.util.List;

@Data
public class ElectionResultDTO {
    private Long electionId;
    private String electionTitle;
    private String electionStatus;
    private List<CandidateResultDTO> candidates;
    private long totalVotes;

    @Data
    public static class CandidateResultDTO {
        private Long candidateId;
        private String candidateName;
        private String partyAffiliation;
        private long voteCount;
        private double percentage;
    }
}