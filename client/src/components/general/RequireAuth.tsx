import { FC, useEffect, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";

const RequireAuth: FC = () => {
  const { authToken, userType } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const mapUserTypeToAuthUrl: {
    [key: string]: string;
  } = {
    Hr: "home/check/hr/",
    Graduate: "home/check/grad/",
    Manager: "home/check/man/",
  };

  const userTypeMatchesUrl = (): boolean => {
    const query = location.pathname.split("/").at(1)?.toLowerCase();

    if (query === "account" && userType) return true;

    if (query !== userType.toLowerCase()) {
      console.log("bruh what u doing here");
      navigate("/unauthorized");
    }
    return true;
  };

  const useTokenAuthWhenAPrivateRouteIsLoaded = useRef<boolean>(false);

  useEffect(() => {
    const authorizeWithTokenOnPageLoad = async () => {
      await axios
        .get(
          `${environmentalVariables.backend}${mapUserTypeToAuthUrl[userType]}`,
          {
            headers: {
              AUTHORIZATION: authToken,
            },
          }
        )
        .then(({ data }) => {
          if (data.status === false) {
            navigate("/unauthorized");
          }
        })
        .catch((error) => {
          console.warn(error);
          navigate("/unauthorized");
        });
    };

    if (useTokenAuthWhenAPrivateRouteIsLoaded.current === false) {
      authorizeWithTokenOnPageLoad();
    }

    return () => {
      useTokenAuthWhenAPrivateRouteIsLoaded.current = true;
    };
  }, []);

  return userTypeMatchesUrl() === true ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default RequireAuth;
