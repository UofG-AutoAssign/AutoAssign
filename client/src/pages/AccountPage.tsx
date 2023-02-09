import { FC, useState } from "react";
import AvatarBar from "../components/AvatarBar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const AccountPage: FC = () => {
  const [currentTab, setCurrentTab] = useState<"Settings" | "Password">(
    "Settings"
  );

  const displayComponent = (): JSX.Element => {
    if (currentTab === "Password") return PasswordSetting();
    else {
      return (<Table data={["Firstname: ", "Surname", "Email", "Year"]} action={"edit"}  />)
    }
  };

  const confirmGraduateToTeamModalId2: string = "confirm-graduate2";
  const PasswordSetting = (): JSX.Element => {
    return (
      <div className="w-full pr-5">
        <div className="mb-7 text-black dark:text-white">
          Input your current and your new password twice.
        </div>
        <form>
          {/* <div className="grid gap-6 mb-6 md:grid-cols-2"> */}
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your current password
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. 123Xxxxx"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your new password
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. 123Xxxxx"
                required
              ></input>
            </div>

            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm your new password
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. 123Xxxxx"
                required
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor={confirmGraduateToTeamModalId2}
              className="btn my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </label>

            <input
              type="checkbox"
              id={confirmGraduateToTeamModalId2}
              className="modal-toggle"
            />
            {/* <button
              type="button"
              className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Assign
            </button> */}
            {reassureModal2()}
          </div>
        </form>
      </div>
    );
  };

  const reassureModal2 = (): JSX.Element => {
    function classNames(...classes: any) {
      return classes.filter(Boolean).join(" ");
    }

    return (
      <>
        <div className="modal z-50 overflow-y-auto">
          <div className="modal-box flex flex-col bg-white dark:bg-gray-600">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Are you Sure?{" "}
            </h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="py-4 text-black dark:text-white">
                  Are you sure that you want to change password ?{" "}
                </span>
              </label>
            </div>

            <div className="modal-action">
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-gray-200 text-black shadow-lg"
              >
                Cancel
              </label>
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-blue-800 text-white"
              >
                Yes, I'm sure
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <AvatarBar />
      </div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl h-fit">

          <button
            onClick={() => setCurrentTab("Settings")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Contact Details
          </button>

          <button
            onClick={() => setCurrentTab("Password")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Change Password
          </button>
        </div>
        <div className="w-3/4 ">
          
          {displayComponent()}
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
