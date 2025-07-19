import AuthService from './AuthService'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9090/api';
const USER_API_URL = `${API_BASE_URL}/users`; 
const ADMIN_API_URL = `${API_BASE_URL}/admin/users`; 

const getUserById = async (userId) => {
  try {
    const response = await AuthService.authAxios.get(`${USER_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (userId, firstName, lastName, phoneNumber) => {
  try {
    const updateRequest = {
      firstName,
      lastName,
      phoneNumber,
    };
    const response = await AuthService.authAxios.put(`${USER_API_URL}/profile/${userId}`, updateRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const response = await AuthService.authAxios.get(`${ADMIN_API_URL}/all`); // Or USER_API_URL/all if backend uses that
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await AuthService.authAxios.delete(`${ADMIN_API_URL}/delete/${userId}`); 
    return response.data; 
  } catch (error) {
    throw error;
  }
};

const updateUserRoles = async (userId, roles) => {
  try {
    const updateRequest = {
      userId: userId,
      roles: roles 
    };
    const response = await AuthService.authAxios.put(`${ADMIN_API_URL}/roles`, updateRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const UserService = {
  getUserById,
  updateUserProfile,
  getAllUsers,      
  deleteUser,      
  updateUserRoles,  
};

export default UserService;