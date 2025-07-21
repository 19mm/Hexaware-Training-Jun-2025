package com.RoadReady.DTO; 

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {

    @NotNull(message = "Car ID is required")
    private Long carId; 

    @NotNull(message = "Pickup date and time is required")
    @FutureOrPresent(message = "Pickup date and time must be in the present or future")
    private LocalDateTime pickupDateTime;

    @NotNull(message = "Dropoff date and time is required")
    @Future(message = "Dropoff date and time must be in the future")
    private LocalDateTime dropoffDateTime;

    @Size(max = 255, message = "Optional extras cannot exceed 255 characters")
    private String optionalExtras; 
}
