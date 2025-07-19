package com.RoadReady.Controller;

import com.RoadReady.DTO.BookingRequest;
import com.RoadReady.DTO.BookingResponse;
import com.RoadReady.Security.UserDetailsImpl;
import com.RoadReady.Service.IBookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // Keep if other methods use it
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private IBookingService bookingService;

    @PostMapping("/make")
    public ResponseEntity<BookingResponse> makeBooking(@RequestBody @Valid BookingRequest bookingRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        BookingResponse newBooking = bookingService.makeBooking(bookingRequest, userId);
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> getMyBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        List<BookingResponse> bookings = bookingService.getBookingsByUserId(userId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

      @DeleteMapping("/cancel/{bookingId}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookingResponse> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserId(@PathVariable Long userId) {
        List<BookingResponse> bookings = bookingService.getBookingsByUserId(userId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @PutMapping("/updateStatus/{bookingId}")
    public ResponseEntity<BookingResponse> updateBookingStatus(@PathVariable Long bookingId, @RequestParam("status") String newStatus) {
        BookingResponse updatedBooking = bookingService.updateBookingStatus(bookingId, newStatus);
        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
    }
}