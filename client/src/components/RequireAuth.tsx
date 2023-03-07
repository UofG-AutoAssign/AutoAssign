import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Outlet, Navigate, useNavigate } from "react-router-dom";

const RequireAuth: FC = () => {
  const { authToken, userType } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const userTypeMatchesUrl = (): boolean => {
    const query = location.pathname.split("/").at(1)?.toLowerCase();

    if (query === "account" && userType) return true;

    if (query !== userType.toLowerCase()) {
        console.log("bruh what u doing here");
        navigate("/unauthorized");
    }
    return true;
  };

  // @Todo use JWT to autheticate

  return userTypeMatchesUrl() === true ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default RequireAuth;
