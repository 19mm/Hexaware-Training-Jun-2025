package com.RoadReady.Controller;

import com.RoadReady.DTO.AuthResponse;
import com.RoadReady.DTO.LoginRequest;
import com.RoadReady.DTO.RegisterRequest;
import com.RoadReady.Service.IAuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        boolean registrationSuccess = authService.registerNewUser(registerRequest);

        if (registrationSuccess) {
            return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Registration failed. Please check your input.", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.authenticateUser(loginRequest);

        if (authResponse != null && authResponse.getJwtToken() != null) {
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}