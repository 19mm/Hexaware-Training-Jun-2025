package com.RoadReady.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CarUnavailableException extends RuntimeException {

    public CarUnavailableException() {
        super("The requested car is currently unavailable for booking.");
    }

    public CarUnavailableException(String message) {
        super(message);
    }

    public CarUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
