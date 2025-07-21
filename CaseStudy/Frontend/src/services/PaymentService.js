import AuthService from './AuthService';

const { authAxios } = AuthService;

const PAYMENTS_PATH = '/payments';

const processPayment = async (bookingId, amount, paymentMethod) => {
  try {
    const paymentRequest = {
      bookingId: bookingId,
      amount: amount,
      paymentMethod: paymentMethod,
    };
    const response = await authAxios.post(`${PAYMENTS_PATH}/process`, paymentRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPaymentById = async (paymentId) => {
  try {
    const response = await authAxios.get(`${PAYMENTS_PATH}/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPaymentsByBookingId = async (bookingId) => {
  try {
    const response = await authAxios.get(`${PAYMENTS_PATH}/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllPayments = async () => {
  try {
    const response = await authAxios.get(`${PAYMENTS_PATH}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const PaymentService = {
  processPayment,
  getPaymentById,
  getPaymentsByBookingId,
  getAllPayments,
};

export default PaymentService;