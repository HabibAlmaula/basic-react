import { useState, useEffect, createContext, useContext } from "react";
import {
  getAccessToken,
  getUserLogged,
  login as networkLogin,
  putAccessToken,
} from "../utils/network-data";
import { home, login as loginRoute } from "../routes/routes";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authed, setAuthed] = useState(!!getAccessToken());

  useEffect(() => {
    const initializeAuth = async () => {
      if (authed) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setUser(data);
        }
      }

      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async ({ email, password }) => {
    const { error, data, message } = await networkLogin({ email, password });

    if (!error) {
      putAccessToken(data.accessToken);
      setAuthed(true);

      // Get user data after successful login
      const userResult = await getUserLogged();
      if (!userResult.error) {
        setUser(userResult.data);
      }
      navigate(home);
      return { success: true };
    }

    return { success: false, message: message };
  };

  const logout = () => {
    putAccessToken(null);
    setUser(null);
    setAuthed(false);
    navigate(loginRoute);
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, authed, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
