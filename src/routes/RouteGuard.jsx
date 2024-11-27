import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { login } from "./routes";
import { Navigate } from "react-router-dom";

export const RouteGuard = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to={login} />;
};
