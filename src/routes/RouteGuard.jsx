import { useAuth } from "../hooks/AuthProvider";
import { login } from "./routes";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard = () => {
  const { authed } = useAuth();
  return authed ? <Outlet /> : <Navigate to={login} />;
};
