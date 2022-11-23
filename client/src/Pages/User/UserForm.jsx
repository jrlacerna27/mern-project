import React, { useState } from 'react';
import { Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { validateEmail } from '../../redux/Auth/authService';
import { createUser, selectIsLoading } from '../../redux/Users/userSlice';

const initialSate = {
  name: '',
  email: '',
  password: '',
  contact_no: '',
  user_type: '',
};

const UserForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const isLoading = useSelector(selectIsLoading);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState(initialSate);
  const { name, email, password, contact_no, user_type } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !contact_no || !user_type) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userForm = {
      name,
      email,
      password,
      contact_no,
      user_type,
    };

    setIsLoading(true);
    try {
      await dispatch(createUser(userForm));

      navigate('/user');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClear = () => {
    setUserData({ name: '', email: '', password: '', contact_no: '', user_type: '' });
  };

  return (
    <Box m="20px">
      {isLoading && <Loader />}

      <Header title="User Form" subtitle="Add User" />

      <Box backgroundColor={colors.primary[400]} borderRadius="5px" p="25px">
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <TextField
                id="name"
                name="name"
                label="Name"
                autoComplete="name"
                color="secondary"
                required
                autoFocus
                sx={{ width: '22rem' }}
                onChange={handleInputChange}
                value={name}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                type="email"
                color="secondary"
                required
                autoFocus
                sx={{ width: '22rem' }}
                onChange={handleInputChange}
                value={email}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="password"
                name="password"
                label="Password"
                autoComplete="password"
                type="password"
                color="secondary"
                required
                autoFocus
                sx={{ width: '22rem' }}
                onChange={handleInputChange}
                value={password}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="contact_no"
                name="contact_no"
                label="Contact No"
                autoComplete="contact_no"
                color="secondary"
                required
                autoFocus
                sx={{ width: '22rem' }}
                onChange={handleInputChange}
                value={contact_no}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="user_type"
                name="user_type"
                label="User Type"
                autoComplete="user_type"
                color="secondary"
                required
                autoFocus
                sx={{ width: '22rem' }}
                onChange={handleInputChange}
                value={user_type}
              />
            </Grid>
          </Grid>
          {/* <Grid container>
          <Grid item sx={{ marginTop: '20px' }}>
            <Button variant="contained" component="label" color="secondary">
              Upload
              <input hidden name="image" type="file" onChange={(e) => handleImageChange(e)} />
            </Button>
          </Grid>
        </Grid> */}
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, mr: 2 }} color="secondary">
            Submit
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2, mr: 2, backgroundColor: colors.redAccent[500] }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Link to="/users">
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: colors.blueAccent[500] }}
            >
              Cancel
            </Button>
          </Link>
        </form>
      </Box>
    </Box>
  );
};

export default UserForm;
