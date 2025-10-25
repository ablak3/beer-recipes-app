import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types';

interface AuthContextType {
  user: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
  const token = localStorage.getItem('token');

  if (token && token.split('.').length === 3) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser(decoded.username);
    } catch (err) {
      console.error('Failed to decode JWT:', err);
    }
  } else {
    console.warn('Invalid or missing token:', token);
  }
}, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode<JwtPayload>(token);
    setUser(decoded.username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
