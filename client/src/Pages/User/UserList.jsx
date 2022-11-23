import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Tooltip } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { tokens } from '../../theme';
import Header from '../../components/Header';
import { getAllUsers, selectIsLoading } from '../../redux/Users/userSlice';
import Loader from '../../components/Loader';
import useRedirectLoggedOutUser from '../../customeHooks/useRedirectLoggedOutUser';
import { Link } from 'react-router-dom';

const UserList = () => {
  useRedirectLoggedOutUser('/');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box m="20px">
      {isLoading && <Loader />}

      <Header title="User List" subtitle="Manage Users" />

      <Box
        m="30px 0 0 0"
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiTableHead-root': {
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiTableBody-root': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiTableCell-root': {
            borderBottom: 'none',
          },
        }}
      >
        <TableContainer component={Paper}>
          <Box m="20px" display="flex" alignItems="center" justifyContent="space-between">
            {/* SEARCH BAR */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={colors.primary[400]}
              borderRadius="3px"
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Link to="/users/user_form">
                <Button variant="contained" sx={{ backgroundColor: '#3e4396', '&:hover': 'red' }}>
                  Add New User
                </Button>
              </Link>
            </Box>
          </Box>
          {!isLoading && users.length === 0 ? (
            <Box m="20px" display="flex">
              <Typography>No Users Found.</Typography>
            </Box>
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Contact No</TableCell>
                  <TableCell align="center">User Type</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user._id} hover={true}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.contact_no}</TableCell>
                    <TableCell align="center">{user.user_type}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit" placement="top">
                        <Link to={`/users/user_update/${user._id}`}>
                          <IconButton size="small">
                            <Edit color="info" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="View" placement="top">
                        <IconButton size="small">
                          <Visibility color="success" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <IconButton size="small">
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserList;
