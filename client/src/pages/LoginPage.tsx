import { FC, useEffect } from "react";
import LoginCard from "../components/LoginCard";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginPage: FC = () => {
  return (
      <div>
        <nav className="sticky top-0 z-50">
          <Navbar hideLogoutButton={true} hideAccountButton={true}/>
        </nav>
        <div className="flex flex-col md:flex-row justify-between bg-white dark:bg-gray-700 min-h-screen py-12 transition-all delay-100">
          <div className="w-full bg-loginBlue basis-1/2 rounded-r-3xl flex flex-col justify-center shadow-lg py-5">
            <div className="bg-loginTeal w-3/4 h-3/4 rounded-3xl mx-auto p-5 gap-5 flex flex-col">
              <p className="text-blue-800 text-5xl font-semibold">Login</p>
              <p className="text-black text-xl">
                In order to proceed, please login using your user credentials
              </p>
            </div>
          </div>
          <div className="w-full h-screen basis-1/2 min-h-screen m-5">
            <div className="bg-gray-200 dark:bg-gray-400 basis-1/2 rounded-3xl w-3/4 mx-auto p-5 transition-all delay-150">
              <LoginCard />
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
