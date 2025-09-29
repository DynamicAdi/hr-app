
import { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../utils/api';

type AuthContextType = {
  user: any;
  loading: boolean;
  error: any;
  login: ({ email, password }: { email: string; password: string }) => Promise<{ success: boolean; message?: string | null }>;
  logout: () => void;
  rigester: ({ email, password, name, phone }: { email: string; password: string, name: string, phone: string }) => Promise<{ success: boolean; message?: string | null }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState(null); // null means unauthenticated
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // optional: track login errors

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }: {email: string, password: string}) => {
    setError(null); // clear previous errors
    try {
      const response = await api.post('/auth/login', { email, password });

      const { token, user } = response.data;

      // Save token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      return { success: true };
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, message: error };
    }
  };

    const rigester = async ({ email, password, name, phone }: {email: string, password: string, name: string, phone: string}) => {
    setError(null); // clear previous errors
    try {
      const response = await api.post('/auth/signup', { email, password, name , phone });

      const { token, user } = response.data;

      // Save token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      return { success: true };
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, message: error };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, rigester }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
