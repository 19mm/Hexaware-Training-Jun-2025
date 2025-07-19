package com.RoadReady.Service;

import com.RoadReady.DTO.CarRequest;
import com.RoadReady.DTO.CarResponse;
import java.util.List;

public interface ICarService {

    CarResponse addCar(CarRequest carRequest);
    CarResponse updateCar(Long carId, CarRequest carRequest);
    void deleteCar(Long carId);
    CarResponse getCarById(Long carId);
    List<CarResponse> getAllCars();
    List<CarResponse> searchCars(String make, String model, String type, String location);
}
