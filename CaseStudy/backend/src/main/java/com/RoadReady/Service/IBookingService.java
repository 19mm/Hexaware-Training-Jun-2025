package com.RoadReady.Service;

import com.RoadReady.DTO.BookingRequest;
import com.RoadReady.DTO.BookingResponse;
import java.util.List;

public interface IBookingService {

    BookingResponse makeBooking(BookingRequest bookingRequest, Long userId);
    BookingResponse updateBooking(Long bookingId, BookingRequest bookingRequest);
    void cancelBooking(Long bookingId);
    BookingResponse getBookingById(Long bookingId);
    List<BookingResponse> getAllBookings();
    List<BookingResponse> getBookingsByUserId(Long userId);
    List<BookingResponse> getBookingsByCarId(Long carId);
    BookingResponse updateBookingStatus(Long bookingId, String newStatus);
}