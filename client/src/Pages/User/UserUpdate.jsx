import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { validateEmail } from '../../redux/Auth/authService';
import {
  getAllUsers,
  getUser,
  selectIsLoading,
  selectUser,
  updateUser,
} from '../../redux/Users/userSlice';

const UserUpdate = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  const [userData, setUserData] = useState(user);

  console.log(userData);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setUserData({ ...user, [name]: value });
  };

  return (
    <Box m="20px">
      {isLoading && <Loader />}

      <Header title="User Update" subtitle="Manage User" />

      <Box backgroundColor={colors.primary[400]} borderRadius="5px" p="25px">
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <TextField
                id="id"
                name="id"
                label="ID"
                autoComplete="id"
                color="secondary"
                required
                autoFocus
                sx={{ width: '22rem' }}
                // value={_id || ''}
              />
            </Grid>
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
                value={userData?.name || ''}
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
                value={userData?.email || ''}
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
                value={userData?.contact_no || ''}
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
                value={userData?.user_type || ''}
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
            Update
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

export default UserUpdate;
