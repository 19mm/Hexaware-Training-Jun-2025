package com.RoadReady.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.RoadReady.Entity.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long>{

	Optional<Car> findByLicensePlate(String licensePlate);

}
