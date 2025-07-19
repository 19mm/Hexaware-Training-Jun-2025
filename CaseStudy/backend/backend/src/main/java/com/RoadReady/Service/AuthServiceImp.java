package com.RoadReady.Service;

import com.RoadReady.DTO.AuthResponse;
import com.RoadReady.DTO.LoginRequest;
import com.RoadReady.DTO.RegisterRequest;
import com.RoadReady.Entity.Role;
import com.RoadReady.Entity.User;
import com.RoadReady.Exception.DuplicateResourceException;
import com.RoadReady.Repository.UserRepository;
import com.RoadReady.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors; 

@SuppressWarnings("unused")
@Service
public class AuthServiceImp implements IAuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired 
    private JwtUtil jwtUtil;

    @Override
    public boolean registerNewUser(RegisterRequest registerRequest) {
        Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new DuplicateResourceException("User with email " + registerRequest.getEmail() + " already exists.");
        }

        User newUser = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phoneNumber(registerRequest.getPhoneNumber())
                .roles(Collections.singleton(Role.CUSTOMER))
                .build();

        userRepository.save(newUser);
        return true;
    }

    @Override
    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User userDetails = userRepository.findByEmail(authentication.getName())
                                        .orElseThrow(() -> new RuntimeException("User not found after successful authentication."));

        String jwt = jwtUtil.generateToken(userDetails.getEmail());

        Set<Role> rolesSet = userDetails.getRoles();
        
        return AuthResponse.builder()
                .jwtToken(jwt)
                .userId(userDetails.getId())
                .email(userDetails.getEmail())
                .roles(rolesSet) 
                .build();
    }
}