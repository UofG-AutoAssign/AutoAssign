import { FC, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import { toast } from "react-toastify";

const RequireAuth: FC = () => {
  const { authToken, userType } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const mapUserTypeToAuthUrl: {
    [key: string]: string
  } = {
    "Hr": "home/CheckHr/",
    "Graduate": "home/CheckMan/",
    "Manager": "home/CheckGrad/"
  }

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
  const useTokenAuthWhenAPrivateRouteIsLoaded = useRef<boolean>(false);

  useEffect(() => {
    const authorizeWithTokenOnPageLoad = async () => {
      await axios.get(
        `${environmentalVariables.backend}${mapUserTypeToAuthUrl[userType]}`,
        {
          headers: {
            AUTHORIZATION: authToken,
          },
        }
      ).then(({ data }) => {
        if (data.status !== 200) {
          navigate("/unauthorized")
        }

      })
      .catch((error) => toast.error(error))
    }

    if (useTokenAuthWhenAPrivateRouteIsLoaded.current === false) {
      authorizeWithTokenOnPageLoad();

      console.log("AUTH CHECK WITH TOKEN")
    }
  
    return () => {
      useTokenAuthWhenAPrivateRouteIsLoaded.current = true;
    }
  }, [])
  

  return (userTypeMatchesUrl() === true) ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default RequireAuth;
