package com.RoadReady.Service;

import com.RoadReady.DTO.CarRequest;
import com.RoadReady.DTO.CarResponse;
import com.RoadReady.Entity.Car;
import com.RoadReady.Exception.ResourceNotFoundException; 
import com.RoadReady.Exception.DuplicateResourceException; 
import com.RoadReady.Repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarServiceImp implements ICarService {

    @Autowired
    private CarRepository carRepository;

    @Override
    public CarResponse addCar(CarRequest carRequest) {
        if (carRepository.findByLicensePlate(carRequest.getLicensePlate()).isPresent()) {
            throw new DuplicateResourceException("Car with license plate '" + carRequest.getLicensePlate() + "' already exists.");
        }

        Car car = Car.builder()
                .make(carRequest.getMake())
                .model(carRequest.getModel())
                .type(carRequest.getType())
                .year(carRequest.getYear())
                .description(carRequest.getDescription())
                .imageUrl(carRequest.getImageUrl())
                .dailyRate(carRequest.getDailyRate())
                .availabilityStatus(carRequest.getAvailabilityStatus())
                .currentLocation(carRequest.getCurrentLocation())
                .licensePlate(carRequest.getLicensePlate())
                .seatingCapacity(carRequest.getSeatingCapacity())
                .transmissionType(carRequest.getTransmissionType())
                .fuelType(carRequest.getFuelType())
                .build();
        Car savedCar = carRepository.save(car);
        return convertToCarResponse(savedCar);
    }

    @Override
    public CarResponse updateCar(Long carId, CarRequest carRequest) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID: " + carId));

        Optional<Car> existingCarWithSameLicensePlate = carRepository.findByLicensePlate(carRequest.getLicensePlate());
        if (existingCarWithSameLicensePlate.isPresent() && !existingCarWithSameLicensePlate.get().getId().equals(carId)) {
            throw new DuplicateResourceException("Another car already has license plate '" + carRequest.getLicensePlate() + "'.");
        }

        car.setMake(carRequest.getMake());
        car.setModel(carRequest.getModel());
        car.setType(carRequest.getType());
        car.setYear(carRequest.getYear());
        car.setDescription(carRequest.getDescription());
        car.setImageUrl(carRequest.getImageUrl());
        car.setDailyRate(carRequest.getDailyRate());
        car.setAvailabilityStatus(carRequest.getAvailabilityStatus());
        car.setCurrentLocation(carRequest.getCurrentLocation());
        car.setLicensePlate(carRequest.getLicensePlate());
        car.setSeatingCapacity(carRequest.getSeatingCapacity());
        car.setTransmissionType(carRequest.getTransmissionType());
        car.setFuelType(carRequest.getFuelType());
        Car updatedCar = carRepository.save(car);
        return convertToCarResponse(updatedCar);
    }

    @Override
    public void deleteCar(Long carId) {
        if (!carRepository.existsById(carId)) {
            throw new ResourceNotFoundException("Car not found with ID: " + carId);
        }
        carRepository.deleteById(carId);
    }

    @Override
    public CarResponse getCarById(Long carId) {
        return carRepository.findById(carId)
                .map(this::convertToCarResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID: " + carId));
    }

    @Override
    public List<CarResponse> getAllCars() {
        return carRepository.findAll().stream()
                .map(this::convertToCarResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<CarResponse> searchCars(String make, String model, String type, String location) {
        return carRepository.findAll().stream()
                .map(this::convertToCarResponse)
                .collect(Collectors.toList());
    }

    private CarResponse convertToCarResponse(Car car) {
        return CarResponse.builder()
                .id(car.getId())
                .make(car.getMake())
                .model(car.getModel())
                .type(car.getType())
                .year(car.getYear())
                .description(car.getDescription())
                .imageUrl(car.getImageUrl())
                .dailyRate(car.getDailyRate())
                .availabilityStatus(car.isAvailabilityStatus())
                .currentLocation(car.getCurrentLocation())
                .licensePlate(car.getLicensePlate())
                .seatingCapacity(car.getSeatingCapacity())
                .transmissionType(car.getTransmissionType())
                .fuelType(car.getFuelType())
                .build();
    }
}
