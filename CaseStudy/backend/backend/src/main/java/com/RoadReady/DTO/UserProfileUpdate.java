package com.RoadReady.DTO; 

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileUpdate {

    @Size(max = 50, message = "First name cannot exceed 50 characters")
    private String firstName; 

    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    private String lastName; 

    @Size(max = 20, message = "Phone number cannot exceed 20 characters")
    @Pattern(regexp = "^$|[0-9]{10,15}", message = "Phone number must be between 10 and 15 digits or empty")
    private String phoneNumber; 
}
