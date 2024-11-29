import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useEffect } from "react";
import { home } from "./routes";

export const AuthGuard = ({ children }) => {
    const { authed } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (authed) {
        navigate(home);
      }
    }, [authed, navigate]);
  
    return !authed ? children : null;
  };