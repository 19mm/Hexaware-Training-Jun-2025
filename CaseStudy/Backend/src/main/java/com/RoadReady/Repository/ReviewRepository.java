package com.RoadReady.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RoadReady.Entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	 List<Review> findByCarId(Long carId);

	 List<Review> findByUserId(Long userId);
}
