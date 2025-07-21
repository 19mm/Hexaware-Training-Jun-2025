package com.RoadReady.Service;

import com.RoadReady.DTO.PaymentRequest;
import com.RoadReady.DTO.PaymentResponse;
import java.util.List;

public interface IPaymentService {

    PaymentResponse processPayment(PaymentRequest paymentRequest);
    PaymentResponse getPaymentById(Long paymentId);
    List<PaymentResponse> getPaymentsByBookingId(Long bookingId);
    List<PaymentResponse> getAllPayments();
}
