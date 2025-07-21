package com.RoadReady.Service; 

import com.RoadReady.DTO.UserProfileUpdate;
import com.RoadReady.DTO.UserResponse;
import com.RoadReady.Entity.User;
import com.RoadReady.Exception.ResourceNotFoundException; 
import com.RoadReady.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResponse getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(this::convertToUserResponse)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
    }

    @Override
    public UserResponse updateUserProfile(Long userId, UserProfileUpdate userProfileUpdate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        user.setFirstName(userProfileUpdate.getFirstName());
        user.setLastName(userProfileUpdate.getLastName());
        user.setPhoneNumber(userProfileUpdate.getPhoneNumber());
       
        User updatedUser = userRepository.save(user);
        return convertToUserResponse(updatedUser);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        userRepository.deleteById(userId);
    }

    private UserResponse convertToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .roles(user.getRoles()) 
                .build();
    }
}
