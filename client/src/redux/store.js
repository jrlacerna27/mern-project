import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/Auth/authSlice';
import userReducer from '../redux/Users/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
