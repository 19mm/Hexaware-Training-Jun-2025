package com.RoadReady.Controller;

import com.RoadReady.DTO.PaymentRequest;
import com.RoadReady.DTO.PaymentResponse;
import com.RoadReady.Service.IPaymentService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private IPaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody @Valid PaymentRequest paymentRequest) {
        try {
            PaymentResponse newPayment = paymentService.processPayment(paymentRequest);
            return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
        } catch (RuntimeException e) {
        	return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable Long paymentId) {
        PaymentResponse payment = paymentService.getPaymentById(paymentId);
        if (payment != null) {
            return new ResponseEntity<>(payment, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<PaymentResponse>> getPaymentsByBookingId(@PathVariable Long bookingId) {
        List<PaymentResponse> payments = paymentService.getPaymentsByBookingId(bookingId);
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PaymentResponse>> getAllPayments() {
        List<PaymentResponse> payments = paymentService.getAllPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }
}
