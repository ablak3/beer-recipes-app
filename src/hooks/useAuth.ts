import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  console.log('useAuth Rendered');
  const { user, login, logout } = useContext(AuthContext);
  return { user, login, logout };
};
