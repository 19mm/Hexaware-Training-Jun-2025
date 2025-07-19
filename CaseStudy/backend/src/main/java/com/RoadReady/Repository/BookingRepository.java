package com.RoadReady.Repository;

import com.RoadReady.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByCarId(Long carId);

    @Query("SELECT b FROM Booking b WHERE b.car.id = :carId " +
           "AND b.status IN ('CONFIRMED', 'PENDING') " + 
           "AND (" +
           "    (b.pickupDateTime < :dropoffDateTime AND b.dropoffDateTime > :pickupDateTime)" +
           ")")
    List<Booking> findConflictingBookings(@Param("carId") Long carId,
                                          @Param("pickupDateTime") LocalDateTime pickupDateTime,
                                          @Param("dropoffDateTime") LocalDateTime dropoffDateTime);

    @Query("SELECT b FROM Booking b WHERE b.car.id = :carId " +
           "AND b.id != :excludeBookingId " + 
           "AND b.status IN ('CONFIRMED', 'PENDING') " +
           "AND (" +
           "    (b.pickupDateTime < :dropoffDateTime AND b.dropoffDateTime > :pickupDateTime)" +
           ")")
    List<Booking> findConflictingBookingsExcludingCurrent(@Param("carId") Long carId,
                                                          @Param("pickupDateTime") LocalDateTime pickupDateTime,
                                                          @Param("dropoffDateTime") LocalDateTime dropoffDateTime,
                                                          @Param("excludeBookingId") Long excludeBookingId);
}
