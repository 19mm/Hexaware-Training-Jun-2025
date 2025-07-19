package com.RoadReady.Service;

import com.RoadReady.DTO.UserProfileUpdate;
import com.RoadReady.DTO.UserResponse; 

import java.util.List;

public interface IUserService {

    UserResponse getUserById(Long userId);
    UserResponse updateUserProfile(Long userId, UserProfileUpdate userProfileUpdate);
    List<UserResponse> getAllUsers(); 
    void deleteUser(Long userId);
}
