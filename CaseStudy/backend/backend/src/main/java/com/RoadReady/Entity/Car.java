package com.RoadReady.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String make;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false)
    private int year;

    @Column(length = 255)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal dailyRate;

    @Column(nullable = false)
    private boolean availabilityStatus;

    @Column(length = 100)
    private String currentLocation;

    @Column(length = 50)
    private String licensePlate;

    @Column(nullable = false)
    private int seatingCapacity;

    @Column(nullable = false)
    private String transmissionType;

    @Column(nullable = false)
    private String fuelType;
}
