import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Initialize auth state from cookie on mount
  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
      // Optionally decode token or fetch user data
      // setUser(decodedUserData);
    }
  }, []);

  // Login function to set token and user
  const login = (newToken, userData) => {
    Cookies.set('token', newToken, { 
      expires: 7, // Cookie expires in 7 days
      secure: true, 
      sameSite: 'Strict' 
    });
    setToken(newToken);
    setUser(userData);
  };

  // Logout function to clear token and user
  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);
  };

  // Context value
  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};