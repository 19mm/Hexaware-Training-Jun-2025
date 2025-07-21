package com.RoadReady.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {

    private Long id;
    private Long userId; 
    private Long carId; 
    private int rating;
    private String comment;
    private LocalDateTime reviewDate; 
}
