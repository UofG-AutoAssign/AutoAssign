import React from "react";
import AvatarBar from "../components/AvatarBar";
import LoginCard from "../components/LoginCard";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

interface Props {}

const AccountPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div className="flex flex-row justify-between bg-white min-h-screen py-12">
        <div className="w-full bg-loginBlue basis-1/2 rounded-r-3xl flex flex-col justify-center">
          <div className="bg-loginTeal w-3/4 h-3/4 rounded-3xl mx-auto p-5 gap-5 flex flex-col">
            <p className="text-blue-800 text-5xl font-semibold">Login</p>
            <p className="text-black text-xl">In order to proceed, please login using your user credentials</p>
          </div>
        </div>
        <div className="w-full h-screen bg-white basis-1/2 min-h-screen">
          <div className="bg-gray-200 basis-1/2 rounded-3xl w-3/4 mx-auto p-5">
            <LoginCard />
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default AccountPage;
