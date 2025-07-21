package com.RoadReady.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RoadReady.Entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	List<Payment> findByBookingId(Long bookingId);
}
