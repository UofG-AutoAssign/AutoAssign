import { FC } from "react";
import LoginCard from "../components/LoginCard";
import Navbar from "../components/Navbar";

const AccountPage: FC = () => {
  return (
      <div>
        <nav className="sticky top-0 z-50">
          <Navbar />
        </nav>
        <div className="flex flex-col md:flex-row justify-between bg-white dark:bg-gray-400 min-h-screen py-12 transition-all delay-100 ">
          <div className="w-full bg-loginBlue basis-1/2 rounded-r-3xl flex flex-col justify-center shadow-lg">
            <div className="bg-loginTeal w-3/4 h-3/4 rounded-3xl mx-auto p-5 gap-5 flex flex-col">
              <p className="text-blue-800 text-5xl font-semibold">Login</p>
              <p className="text-black text-xl">
                In order to proceed, please login using your user credentials
              </p>
            </div>
          </div>
          <div className="w-full h-screen basis-1/2 min-h-screen">
            <div className="bg-gray-200 basis-1/2 rounded-3xl w-3/4 mx-auto p-5 transition-all delay-150">
              <LoginCard />
            </div>
          </div>
        </div>
      </div>
  );
};

export default AccountPage;
