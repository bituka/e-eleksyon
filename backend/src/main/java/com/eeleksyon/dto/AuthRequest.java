package com.eeleksyon.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}