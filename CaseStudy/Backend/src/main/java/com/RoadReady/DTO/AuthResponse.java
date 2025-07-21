package com.RoadReady.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import com.RoadReady.Entity.Role;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String jwtToken;
    private Long userId;
    private String email;
    private Set<Role> roles;
}