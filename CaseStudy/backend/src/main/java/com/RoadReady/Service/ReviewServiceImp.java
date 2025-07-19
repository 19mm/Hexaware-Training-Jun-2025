package com.RoadReady.Service;

import com.RoadReady.DTO.ReviewRequest;
import com.RoadReady.DTO.ReviewResponse;
import com.RoadReady.Entity.Car;
import com.RoadReady.Entity.Review;
import com.RoadReady.Entity.User;
import com.RoadReady.Exception.ResourceNotFoundException; 
import com.RoadReady.Repository.CarRepository;
import com.RoadReady.Repository.ReviewRepository;
import com.RoadReady.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImp implements IReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Override
    public ReviewResponse addReview(ReviewRequest reviewRequest, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Car car = carRepository.findById(reviewRequest.getCarId())
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID: " + reviewRequest.getCarId()));

        Review review = Review.builder()
                .user(user)
                .car(car)
                .rating(reviewRequest.getRating())
                .comment(reviewRequest.getComment())
                .reviewDate(LocalDateTime.now())
                .build();

        Review savedReview = reviewRepository.save(review);
        return convertToReviewResponse(savedReview);
    }

    @Override
    public ReviewResponse getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .map(this::convertToReviewResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with ID: " + reviewId));
    }

    @Override
    public List<ReviewResponse> getReviewsByCarId(Long carId) {
        if (!carRepository.existsById(carId)) {
            throw new ResourceNotFoundException("Car not found with ID: " + carId);
        }
        return reviewRepository.findByCarId(carId).stream()
                .map(this::convertToReviewResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponse> getReviewsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        return reviewRepository.findByUserId(userId).stream()
                .map(this::convertToReviewResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new ResourceNotFoundException("Review not found with ID: " + reviewId);
        }
        reviewRepository.deleteById(reviewId);
    }

    private ReviewResponse convertToReviewResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .carId(review.getCar().getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .reviewDate(review.getReviewDate())
                .build();
    }
}
