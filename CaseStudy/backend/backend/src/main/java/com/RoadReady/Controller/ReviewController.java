package com.RoadReady.Controller;

import com.RoadReady.DTO.ReviewRequest;
import com.RoadReady.DTO.ReviewResponse;
import com.RoadReady.Service.IReviewService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private IReviewService reviewService;

    @PostMapping("/add/{userId}")
    public ResponseEntity<ReviewResponse> addReview(@PathVariable Long userId, @RequestBody @Valid ReviewRequest reviewRequest) {
        try {
            ReviewResponse newReview = reviewService.addReview(reviewRequest, userId);
            return new ResponseEntity<>(newReview, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // e.g., user or car not found
        }
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long reviewId) {
        ReviewResponse review = reviewService.getReviewById(reviewId);
        if (review != null) {
            return new ResponseEntity<>(review, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByCarId(@PathVariable Long carId) {
        List<ReviewResponse> reviews = reviewService.getReviewsByCarId(carId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByUserId(@PathVariable Long userId) {
        List<ReviewResponse> reviews = reviewService.getReviewsByUserId(userId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    }
}
