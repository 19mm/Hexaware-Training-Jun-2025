package com.RoadReady.Service;

import com.RoadReady.DTO.AuthResponse;
import com.RoadReady.DTO.LoginRequest;
import com.RoadReady.DTO.RegisterRequest;

public interface IAuthService {

    boolean registerNewUser(RegisterRequest registerRequest);
    AuthResponse authenticateUser(LoginRequest loginRequest);
}