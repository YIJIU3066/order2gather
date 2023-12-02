import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const BASE_URL =
    window.location.origin === 'http://localhost:3000'
      ? 'http://localhost:8080'
      : window.location.origin;

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem('accessToken')
      ? jwtDecode(JSON.parse(localStorage.getItem('accessToken')))
      : null
  );
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('accessToken')
      ? true
      : false
  );

  const navigate = useNavigate();

  const loginUser = async (access_token) => {
    let response = null;
    try {
      response = await axios({
        url: BASE_URL + '/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          accessToken: access_token,
        }),
      });

      if (response.status === 200) {
        setAccessToken(response.data.jwt);
        setUser(jwtDecode(response.data.jwt));
        setIsLoggedIn(true);
        localStorage.setItem('accessToken', JSON.stringify(response.data.jwt));
        return 'success';
      } else {
        return response.data.message;
      }
    } catch (error) {
      return error;
    }
  };

  const logoutUser = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const contextData = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    loginUser,
    logoutUser,
    isLoggedIn,
  };

  useEffect(() => {
    if (accessToken) {
      setUser(jwtDecode(accessToken));
    }
    setLoading(false);
  }, [accessToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
