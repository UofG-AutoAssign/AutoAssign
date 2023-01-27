import { observer } from "mobx-react";
import React, { FC } from "react";
import AvatarBar from "../components/AvatarBar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import themeStore from "../context/themeStore";

const AccountPage: FC = observer(() => {
  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-400">
        <nav className="sticky top-0 z-50">
          <Navbar />
        </nav>
        <div>
          <AvatarBar />
        </div>
        <section className="flex flex-row gap-5 py-5">
          <div className="w-1/4 bg-loginBlue rounded-r-2xl">
            <button
              type="button"
              className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
            >
              Contact Details
            </button>
            <button
              type="button"
              className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
            >
              User Settings
            </button>
            <button
              type="button"
              className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
            >
              Change Password
            </button>
          </div>
          <div className="w-3/4 pr-5">
            <Table />
          </div>
        </section>
      </div>
    </div>
  );
});

export default AccountPage;
