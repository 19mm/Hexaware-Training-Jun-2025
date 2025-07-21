package com.RoadReady.Service;

import com.RoadReady.DTO.PaymentRequest;
import com.RoadReady.DTO.PaymentResponse;
import com.RoadReady.Entity.Booking;
import com.RoadReady.Entity.Payment;
import com.RoadReady.Entity.PaymentStatus;
import com.RoadReady.Exception.ResourceNotFoundException; 
import com.RoadReady.Exception.InvalidInputException; 
import com.RoadReady.Repository.BookingRepository;
import com.RoadReady.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImp implements IPaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public PaymentResponse processPayment(PaymentRequest paymentRequest) {
        Booking booking = bookingRepository.findById(paymentRequest.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + paymentRequest.getBookingId()));

        if (paymentRequest.getAmount().compareTo(booking.getTotalAmount()) != 0) {
            throw new InvalidInputException("Payment amount (" + paymentRequest.getAmount() + ") does not match booking total amount (" + booking.getTotalAmount() + ").");
        }

        Payment payment = Payment.builder()
                .booking(booking)
                .amount(paymentRequest.getAmount())
                .paymentMethod(paymentRequest.getPaymentMethod())
                .paymentDate(LocalDateTime.now())
                .transactionId("TRX-" + System.currentTimeMillis())
                .status(PaymentStatus.SUCCESS) 
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        return convertToPaymentResponse(savedPayment);
    }

    @Override
    public PaymentResponse getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .map(this::convertToPaymentResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + paymentId));
    }

    @Override
    public List<PaymentResponse> getPaymentsByBookingId(Long bookingId) {
        if (!bookingRepository.existsById(bookingId)) {
            throw new ResourceNotFoundException("Booking not found with ID: " + bookingId);
        }
        return paymentRepository.findByBookingId(bookingId).stream()
                .map(this::convertToPaymentResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::convertToPaymentResponse)
                .collect(Collectors.toList());
    }

    private PaymentResponse convertToPaymentResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .bookingId(payment.getBooking().getId())
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                .paymentMethod(payment.getPaymentMethod())
                .transactionId(payment.getTransactionId())
                .status(payment.getStatus())
                .build();
    }
}
