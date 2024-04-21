import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      (location?.pathname?.includes('login') ||
        location?.pathname?.includes('signup')) &&
      user
    ) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    console.log('data in login', data);
    data?.user?.role === 'user' && navigate('/dashboard');
    data?.user?.role === 'admin' && navigate('/admin-dashboard');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
