package com.RoadReady.Service;

import com.RoadReady.DTO.BookingRequest;
import com.RoadReady.DTO.BookingResponse;
import com.RoadReady.Entity.Booking;
import com.RoadReady.Entity.BookingStatus;
import com.RoadReady.Entity.Car;
import com.RoadReady.Entity.User;
import com.RoadReady.Exception.BookingConflictException;
import com.RoadReady.Exception.CarUnavailableException;
import com.RoadReady.Exception.InvalidInputException;
import com.RoadReady.Exception.ResourceNotFoundException;
import com.RoadReady.Repository.BookingRepository;
import com.RoadReady.Repository.CarRepository;
import com.RoadReady.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImp implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Override
    public BookingResponse makeBooking(BookingRequest bookingRequest, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Car car = carRepository.findById(bookingRequest.getCarId())
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID: " + bookingRequest.getCarId()));

        LocalDateTime pickupDateTime = bookingRequest.getPickupDateTime();
        LocalDateTime dropoffDateTime = bookingRequest.getDropoffDateTime();

        if (pickupDateTime.isAfter(dropoffDateTime) || pickupDateTime.isEqual(dropoffDateTime)) {
            throw new InvalidInputException("Drop-off time must be strictly after pickup time.");
        }
        if (pickupDateTime.isBefore(LocalDateTime.now().minusMinutes(5))) {
            throw new InvalidInputException("Pickup time cannot be in the past.");
        }
        if (!car.isAvailabilityStatus()) {
            throw new CarUnavailableException("Car with ID " + car.getId() + " is currently unavailable.");
        }

        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
                car.getId(), pickupDateTime, dropoffDateTime);
        if (!conflictingBookings.isEmpty()) {
            throw new BookingConflictException("The car is already booked for the requested time.");
        }

        long days;
        if (pickupDateTime.toLocalDate().isEqual(dropoffDateTime.toLocalDate())) {
            days = 1;
        } else {
            days = ChronoUnit.DAYS.between(pickupDateTime.toLocalDate(), dropoffDateTime.toLocalDate()) + 1;
        }

        if (car.getDailyRate() == null) {
            throw new InvalidInputException("Car daily rate is not set for car ID: " + car.getId());
        }
        
        BigDecimal totalAmount = car.getDailyRate().multiply(BigDecimal.valueOf(days));

        Booking booking = Booking.builder()
                .user(user)
                .car(car)
                .pickupDateTime(pickupDateTime)
                .dropoffDateTime(dropoffDateTime)
                .optionalExtras(bookingRequest.getOptionalExtras())
                .bookingDate(LocalDateTime.now())
                .status(BookingStatus.PENDING) 
                .totalAmount(totalAmount)
                .build();

        Booking savedBooking = bookingRepository.save(booking);
        return convertToBookingResponse(savedBooking);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        if (booking.getStatus() == BookingStatus.CANCELLED || booking.getStatus() == BookingStatus.COMPLETED) {
            throw new InvalidInputException("Booking cannot be cancelled.");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    @Override
    public BookingResponse updateBookingStatus(Long bookingId, String newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        
        BookingStatus statusEnum = BookingStatus.valueOf(newStatus.toUpperCase());
        booking.setStatus(statusEnum);
        
        Booking updatedBooking = bookingRepository.save(booking);
        return convertToBookingResponse(updatedBooking);
    }

    @Override
    public BookingResponse getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .map(this::convertToBookingResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToBookingResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getBookingsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        return bookingRepository.findByUserId(userId).stream()
                .map(this::convertToBookingResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BookingResponse> getBookingsByCarId(Long carId) {
          if (!carRepository.existsById(carId)) {
            throw new ResourceNotFoundException("Car not found with ID: " + carId);
        }
        return bookingRepository.findByCarId(carId).stream()
                .map(this::convertToBookingResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public BookingResponse updateBooking(Long bookingId, BookingRequest bookingRequest) {
        throw new UnsupportedOperationException("Update booking functionality is not yet implemented.");
    }

    private BookingResponse convertToBookingResponse(Booking booking) {
        Long userId = (booking.getUser() != null) ? booking.getUser().getId() : null;
        Long carId = (booking.getCar() != null) ? booking.getCar().getId() : null;

        return BookingResponse.builder()
                .id(booking.getId())
                .userId(userId)
                .carId(carId)
                .pickupDateTime(booking.getPickupDateTime())
                .dropoffDateTime(booking.getDropoffDateTime())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus())
                .optionalExtras(booking.getOptionalExtras())
                .bookingDate(booking.getBookingDate())
                .build();
    }
}