package com.RoadReady.Controller;

import com.RoadReady.DTO.UserResponse; 
import com.RoadReady.Service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private IUserService userService; 
    
    @GetMapping("/users/all")
    public ResponseEntity<List<UserResponse>> getAllUsersForAdmin() {
        List<UserResponse> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{userId}")
    public ResponseEntity<Void> deleteUserByAdmin(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }
}
