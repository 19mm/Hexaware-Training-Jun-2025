package com.RoadReady.Service;

import com.RoadReady.DTO.ReviewRequest;
import com.RoadReady.DTO.ReviewResponse;
import java.util.List;

public interface IReviewService {

    ReviewResponse addReview(ReviewRequest reviewRequest, Long userId);
    ReviewResponse getReviewById(Long reviewId);
    List<ReviewResponse> getReviewsByCarId(Long carId);
    List<ReviewResponse> getReviewsByUserId(Long userId);
    void deleteReview(Long reviewId);
}
