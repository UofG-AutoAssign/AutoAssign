import { FC } from "react";
import ForgotPassCard from "../components/ForgotPassCard";
import Navbar from "../components/Navbar";

const ForgotPassPage: FC = () => {
  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div className="flex flex-col md:flex-row justify-between bg-white dark:bg-gray-800 min-h-screen py-12">
        <div className="w-full bg-loginBlue basis-1/2 rounded-r-3xl flex flex-col justify-center py-5">
          <div className="bg-loginTeal w-3/4 h-3/4 rounded-3xl mx-auto p-5 gap-5 flex flex-col">
            <p className="text-blue-800 text-5xl font-semibold">
              Forgot Password
            </p>
            <p className="text-black text-xl">
              Enter your email, and a link will be sent to you to reset your
              password
            </p>
          </div>
        </div>
        <div className="w-full h-screen basis-1/2 min-h-screen p-5">
          <div className="bg-gray-200 basis-1/2 rounded-3xl w-3/4 mx-auto p-5">
            <ForgotPassCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
