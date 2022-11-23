import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';

import { ColorModeContext, useMode } from './theme';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './Pages/Dashboard/Dashboard';
import User from './Pages/User/UserList';
import UserForm from './Pages/User/UserForm';
import UserUpdate from './Pages/User/UserUpdate';
import Login from './Pages/Auth/Login';
import { getLoginStatus } from './redux/Auth/authService';
import { SET_LOGIN } from './redux/Auth/authSlice';
import NotFound from './Pages/404/NotFound';

axios.defaults.withCredentials = true;

const App = () => {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }

    loginStatus();
  }, [dispatch]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <Sidebar isCollapsed={isCollapsed} />
            <main className="content">
              <Topbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
              <ToastContainer theme="dark" position="top-right" />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<User />} />
                <Route path="/users/user_form" element={<UserForm />} />
                <Route path="/users/user_update/:id" element={<UserUpdate />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
