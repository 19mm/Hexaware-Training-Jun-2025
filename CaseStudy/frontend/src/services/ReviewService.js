import AuthService from './AuthService'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9090/api';
const REVIEW_API_URL = `${API_BASE_URL}/reviews`;

const addReview = async (carId, rating, comment, userId) => {
  try {
    const reviewRequest = {
      carId: carId,
      rating: rating,
      comment: comment,
    };
    const response = await AuthService.authAxios.post(`${REVIEW_API_URL}/add/${userId}`, reviewRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getReviewsByCarId = async (carId) => {
  try {
    const response = await AuthService.authAxios.get(`${REVIEW_API_URL}/car/${carId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getReviewsByUserId = async (userId) => {
  try {
    const response = await AuthService.authAxios.get(`${REVIEW_API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteReview = async (reviewId) => {
  try {
    const response = await AuthService.authAxios.delete(`${REVIEW_API_URL}/delete/${reviewId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ReviewService = {
  addReview,
  getReviewsByCarId,
  getReviewsByUserId,
  deleteReview,
};

export default ReviewService;