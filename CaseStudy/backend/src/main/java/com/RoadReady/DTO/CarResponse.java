package com.RoadReady.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarResponse {

    private Long id; 
    private String make;
    private String model;
    private String type;
    private int year;
    private String description;
    private String imageUrl;
    private BigDecimal dailyRate;
    private boolean availabilityStatus;
    private String currentLocation;
    private String licensePlate;
    private int seatingCapacity;
    private String transmissionType;
    private String fuelType;
}
