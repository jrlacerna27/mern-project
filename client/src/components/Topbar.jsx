import React, { useContext } from 'react';
import { Box, IconButton, useTheme, Typography, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ColorModeContext, tokens } from '../theme';
import { logoutUser } from '../redux/Auth/authService';
import { selectName, SET_LOGIN } from '../redux/Auth/authSlice';

const Topbar = ({ setIsCollapsed, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const handleLogout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate('/');
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} backgroundColor={colors.primary[400]}>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography sx={{ marginLeft: '10px' }}>{name}</Typography>
      </Box>

      {/* SEARCH BAR */}
      {/* <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex" alignItems="center">
        <Link to="/">
          <Button variant="outlined" sx={{ color: '#e1e2fe', marginRight: '10px' }}>
            Login
          </Button>
        </Link>

        <Button variant="outlined" sx={{ color: '#e1e2fe' }} onClick={handleLogout}>
          Logout
        </Button>

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
