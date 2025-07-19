import AuthService from './AuthService';

const { authAxios } = AuthService;

const BOOKINGS_PATH = '/bookings';

const makeBooking = async (carId, pickupDateTime, dropoffDateTime, optionalExtras) => {
  const bookingRequest = {
    carId: carId,
    pickupDateTime: pickupDateTime,
    dropoffDateTime: dropoffDateTime,
    optionalExtras: optionalExtras,
  };
  const response = await authAxios.post(`${BOOKINGS_PATH}/make`, bookingRequest);
  return response.data;
};

const getMyBookings = async () => {
  const response = await authAxios.get(`${BOOKINGS_PATH}/my-bookings`);
  return response.data;
};

const getBookingsByUserId = async (userId) => {
  const response = await authAxios.get(`${BOOKINGS_PATH}/user/${userId}`);
  return response.data;
};

const cancelBooking = async (bookingId) => {
  const response = await authAxios.delete(`${BOOKINGS_PATH}/cancel/${bookingId}`);
  return response.data;
};

const getAllBookings = async () => {
  const response = await authAxios.get(`${BOOKINGS_PATH}/all`);
  return response.data;
};

const updateBookingStatus = async (bookingId, newStatus) => {
  const response = await authAxios.put(`${BOOKINGS_PATH}/updateStatus/${bookingId}?status=${newStatus}`);
  return response.data;
};

const BookingService = {
  makeBooking,
  getMyBookings,
  getBookingsByUserId,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
};

export default BookingService;