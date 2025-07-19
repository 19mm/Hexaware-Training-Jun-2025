package com.RoadReady.DTO; 

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarRequest {

    @NotBlank(message = "Make is required")
    @Size(max = 50, message = "Make cannot exceed 50 characters")
    private String make;

    @NotBlank(message = "Model is required")
    @Size(max = 50, message = "Model cannot exceed 50 characters")
    private String model;

    @NotBlank(message = "Type is required")
    @Size(max = 50, message = "Type cannot exceed 50 characters")
    private String type; 

    @Min(value = 1900, message = "Year must be after 1900")
    @NotNull(message = "Year is required")
    private Integer year;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;

    private String imageUrl;

    @NotNull(message = "Daily rate is required")
    @DecimalMin(value = "0.01", message = "Daily rate must be greater than 0")
    private BigDecimal dailyRate;

    @NotNull(message = "Availability status is required")
    private Boolean availabilityStatus; 

    @NotBlank(message = "Current location is required")
    @Size(max = 100, message = "Current location cannot exceed 100 characters")
    private String currentLocation;

    @NotBlank(message = "License plate is required")
    @Size(min = 5, max = 20, message = "License plate must be between 5 and 20 characters")
    private String licensePlate;

    @Min(value = 1, message = "Seating capacity must be at least 1")
    @NotNull(message = "Seating capacity is required")
    private Integer seatingCapacity;

    @NotBlank(message = "Transmission type is required")
    @Size(max = 50, message = "Transmission type cannot exceed 50 characters")
    private String transmissionType; 

    @NotBlank(message = "Fuel type is required")
    @Size(max = 50, message = "Fuel type cannot exceed 50 characters")
    private String fuelType; 
}
