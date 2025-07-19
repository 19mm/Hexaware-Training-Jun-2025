package com.RoadReady.DTO;

import com.RoadReady.Entity.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {

    private Long id;
    private Long userId; 
    private Long carId;  
    private LocalDateTime pickupDateTime;
    private LocalDateTime dropoffDateTime;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private String optionalExtras;
    private LocalDateTime bookingDate;
}
