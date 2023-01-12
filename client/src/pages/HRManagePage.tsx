import { assign } from "mobx/dist/internal";
import React, { useState } from "react";
import AvatarBar from "../components/AvatarBar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const HRManagePage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<
    | "Teams"
    | "Assign Graduate"
    | "Remove Graduate"
    | "Assign Manager"
    | "Remove Manager"
  >("Teams");

  const assignManager = (): JSX.Element => {
    return (<div className="w-3/4 pr-5">
    <div className="mb-7 ">
      Type the graduates email and the specific team you want to move them
      to.
    </div>
    <form>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Graduate email
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="graduate@email.com"
            required
          ></input>
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Team & Department
          </label>
          <input
            type="text"
            id="last_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g. Cyber Security"
            required
          ></input>
        </div>
        
      </div>
      <div className="flex flex-col items-center">
          <button
            type="button"
            className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Assign
          </button>
        </div>
    </form>
  </div>)
  }

  const removeManager = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5 ">
        <div className="mb-7 ">
        Type the managers email and delete their account permanently.
        </div>
          <form>
            <div className="flex flex-col justify-center items-center">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Manager email
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="manager@email.com                         "
                required
              ></input>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="my-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
    );
  };
  const removeGraduate = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5 ">
        <div className="mb-7 ">
        Type the graduates email and delete their account permanently.
        </div>
          <form>
            <div className="flex flex-col justify-center items-center">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Graduate email
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="graduate@email.com                         "
                required
              ></input>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="my-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
    );

  };

  const assignGraduate = (): JSX.Element => {
    return (  
      <div className="w-3/4 pr-5">
          
          <div className="mb-7 ">
            Type the graduates email and the specific team you want to move them to.
          </div>
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Graduate email</label>
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="graduate@email.com" required></input>
            </div>
            <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team & Department</label>
                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Cyber Security" required></input>
            </div>
            
            </div>
            <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Assign
                </button>
              </div>
        </form>
        </div>
    );

  };

  const displayComponent = (): JSX.Element => {
    if (currentTab === "Teams") {
      return <div>yooo</div>
    }
    if (currentTab === "Assign Graduate") {
      return assignGraduate();
    }
    if (currentTab === "Remove Graduate") {
      return removeGraduate();
    }
    if (currentTab === "Assign Manager") {
      return assignManager();
    }
    if (currentTab === "Remove Manager") {
      return removeManager();
    }
    return <div>yooo</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div className="text-5xl text-center text-blue-900 py-5">
        {currentTab}
      </div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl">
          <button
            onClick={() => setCurrentTab("Teams")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Manage Teams
          </button>
          <button
            onClick={() => setCurrentTab("Assign Graduate")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Assign Graduate
          </button>
          <button
            onClick={() => setCurrentTab("Remove Graduate")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Remove Graduate
          </button>
          <button
            onClick={() => setCurrentTab("Assign Manager")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Assign Manager
          </button>
          <button
            onClick={() => setCurrentTab("Remove Manager")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Remove Manager
          </button>
        </div>
        {displayComponent()}
      </section>
    </div>
  );
};

export default HRManagePage;
