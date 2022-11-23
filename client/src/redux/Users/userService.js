import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/users`;

// Get All Users
const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create User
const createUser = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Update User
const updateUser = async (id, formData) => {
  const response = await axios.patch(`${API_URL}/${id}`, formData);
  return response.data;
};

// Get User Data
const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const userService = {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
};

export default userService;
