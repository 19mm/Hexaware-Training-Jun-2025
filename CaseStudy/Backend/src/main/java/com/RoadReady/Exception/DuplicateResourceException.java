package com.RoadReady.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.CONFLICT) 
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException() {
        super("Resource already exists with the provided unique identifier.");
    }

    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String message, Throwable cause) {
        super(message, cause);
    }
}
