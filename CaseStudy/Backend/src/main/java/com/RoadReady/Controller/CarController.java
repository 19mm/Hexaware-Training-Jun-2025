package com.RoadReady.Controller;

import com.RoadReady.DTO.CarRequest;
import com.RoadReady.DTO.CarResponse;
import com.RoadReady.Service.ICarService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private ICarService carService;

    @PostMapping("/add")
    public ResponseEntity<CarResponse> addCar(@RequestBody @Valid CarRequest carRequest) {
        CarResponse newCar = carService.addCar(carRequest);
        return new ResponseEntity<>(newCar, HttpStatus.CREATED);
    }

    @PutMapping("/update/{carId}")
    public ResponseEntity<CarResponse> updateCar(@PathVariable Long carId, @RequestBody CarRequest carRequest) {
        CarResponse updatedCar = carService.updateCar(carId, carRequest);
        if (updatedCar != null) {
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{carId}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long carId) {
        carService.deleteCar(carId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{carId}")
    public ResponseEntity<CarResponse> getCarById(@PathVariable Long carId) {
        CarResponse car = carService.getCarById(carId);
        if (car != null) {
            return new ResponseEntity<>(car, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CarResponse>> getAllCars() {
        List<CarResponse> cars = carService.getAllCars();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<CarResponse>> searchCars(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String location) {
        List<CarResponse> cars = carService.searchCars(make, model, type, location);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }
}
