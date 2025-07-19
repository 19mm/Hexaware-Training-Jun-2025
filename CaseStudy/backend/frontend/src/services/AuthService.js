import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9090/api';
const AUTH_API_URL = `${API_BASE_URL}/auth`;

const register = async (firstName, lastName, email, password, phoneNumber) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, {
      email,
      password,
    });

    if (response.data.jwtToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getAuthToken = () => {
  const user = getCurrentUser();
  return user ? user.jwtToken : null;
};

const authAxios = axios.create({
  baseURL: API_BASE_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAuthToken,
  authAxios,
};

export default AuthService;