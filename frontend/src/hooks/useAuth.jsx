import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('Fuera de alcanze');
  }

  const handleLogout = () => {
    context.setAuth({
      logged: false,
      token: null,
      document: null,
      role: null,
    });
    navigate('/');
  };

  return { ...context, handleLogout };
}
