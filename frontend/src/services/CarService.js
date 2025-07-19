import axios from 'axios';
import AuthService from './AuthService'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9090/api';
const CAR_API_URL = `${API_BASE_URL}/cars`;

const searchCars = async (make, model, type, location) => {
  try {
    const params = new URLSearchParams();
    if (make) params.append('make', make);
    if (model) params.append('model', model);
    if (type) params.append('type', type);
    if (location) params.append('location', location);

    const response = await AuthService.authAxios.get(`${CAR_API_URL}/search`, { params });
    return response.data;
  } catch (error) {
    console.error('CarService searchCars error:', error);
    throw error;
  }
};

const getCarById = async (carId) => {
  try {
    const response = await AuthService.authAxios.get(`${CAR_API_URL}/${carId}`);
    return response.data;
  } catch (error) {
    console.error(`CarService getCarById for ID ${carId} error:`, error);
    throw error;
  }
};

const getAllCars = async () => {
  try {
    const response = await AuthService.authAxios.get(`${CAR_API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('CarService getAllCars error:', error);
    throw error;
  }
};

const addCar = async (carData) => {
  try {
    const response = await AuthService.authAxios.post(`${CAR_API_URL}/add`, carData);
    return response.data;
  } catch (error) {
    console.error('CarService addCar error:', error);
    throw error;
  }
};

const updateCar = async (carId, carData) => {
  try {
    const response = await AuthService.authAxios.put(`${CAR_API_URL}/update/${carId}`, carData);
    return response.data;
  } catch (error) {
    console.error('CarService updateCar error:', error);
    throw error;
  }
};

const deleteCar = async (carId) => {
  try {
    const response = await AuthService.authAxios.delete(`${CAR_API_URL}/delete/${carId}`);
    return response.data;
  } catch (error) {
    console.error('CarService deleteCar error:', error);
    throw error;
  }
};

const CarService = {
  searchCars,
  getCarById,
  getAllCars,
  addCar, 
  updateCar,
  deleteCar, 
};

export default CarService;
