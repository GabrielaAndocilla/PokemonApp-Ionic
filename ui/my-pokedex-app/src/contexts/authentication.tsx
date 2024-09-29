import axios from 'axios';
import { ReactNode, createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { User } from '../models/User';

interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: User | undefined;
  token: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => token !== ''
  );
  const [userInfo, setUserInfo] = useLocalStorage('user', undefined);
  console.log({ isAuthenticated });
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { status, data } = await axios.post(
        `http://localhost:8081/api/login`,
        {
          email,
          password,
        }
      );
      console.log({ status });
      if (status !== 200) return false;
      setIsAuthenticated(true);
      setUserInfo(data.user);
      setToken(data.token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await axios.post(
      `http://localhost:8081/api/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsAuthenticated(false);
    setUserInfo(undefined);
    removeToken();
    setIsAuthenticated(false);
  };

  const context: AuthContextType = {
    isAuthenticated,
    token,
    userInfo,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
