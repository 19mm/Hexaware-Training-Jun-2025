package com.RoadReady.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.CONFLICT) // Indicates a conflict with existing bookings for the specified time/car
public class BookingConflictException extends RuntimeException {

    public BookingConflictException() {
        super("Booking conflict: The car is not available for the selected dates/times.");
    }

    public BookingConflictException(String message) {
        super(message);
    }

    public BookingConflictException(String message, Throwable cause) {
        super(message, cause);
    }
}
