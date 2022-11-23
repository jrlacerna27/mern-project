import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import userService from './userService';

// Get All Users
export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, thunkAPI) => {
  try {
    return await userService.getAllUsers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Create User
export const createUser = createAsyncThunk('users/createUser', async (formData, thunkAPI) => {
  try {
    return await userService.createUser(formData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// Update User
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await userService.updateUser(id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get User
export const getUser = createAsyncThunk('users/getUser', async (id, thunkAPI) => {
  try {
    return await userService.getUser(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users.push(action.payload);
        toast.success('User successfully added');
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('User successfully updated');
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userInfo = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectIsLoading = (state) => state.user.isLoading;
export const selectUser = (state) => state.user.userInfo;

export default userSlice.reducer;
