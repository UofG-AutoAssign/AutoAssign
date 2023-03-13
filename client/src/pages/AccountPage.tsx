import { FC, useEffect, useRef, useState } from "react";
import AvatarBar from "../components/AvatarBar";
import Navbar from "../components/Navbar";
import AccountTable from "../components/AccountTable";
import axios from "axios";
import authStore from "../context/authStore";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AccountPage: FC = () => {
  const [currentTab, setCurrentTab] = useState<"Settings" | "Password">(
    "Settings"
  );
  const [userFirstName, setUserFirstName] = useState("...");
  const [userLastName, setUserLastName] = useState("...");
  const [userEmail, setUserEmail] = useState("...");
  const [userYear, setUserYear] = useState<number | string>("...");
  const routerNavigator = useNavigate();

  // Conditionally display the component depending on the active tab
  const DisplayComponent = (): JSX.Element => {
    const data = [
      userFirstName,
      userLastName,
      userEmail,      
    ]

    if (userYear) data.push(String(userYear));

    if (currentTab === "Settings")
      return (
        <AccountTable
        data={data}
        />
      );
    else {
      return <PasswordSetting />;
    }
  };

  const confirmGraduateToTeamModalId2: string = "confirm-graduate2";

  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null);

  const handleChangePassword = async () => {
    // No empty fields allowed
    if (
      !currentPasswordRef.current?.value ||
      !newPasswordRef.current?.value ||
      !confirmNewPasswordRef.current?.value
    ) {
      toast.error("No empty fields allowed");
      return;
    }

    // Check for new password confirmation
    if (
      newPasswordRef.current?.value !== confirmNewPasswordRef.current?.value
    ) {
      toast.error("Unmatching new passwords");
      return;
    }

    console.log("Passed all 3 tests");

    axios
      .put(
        `${environmentalVariables.backend}home/ChangePassword/`,
        {
          pwd: currentPasswordRef.current?.value,
          pwd1: newPasswordRef.current?.value,
          pwd2: confirmNewPasswordRef.current?.value,
        },
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);

        if (data.status === true) {
          toast.success("Password sucessfully changed!");

          setTimeout(() => {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userType");
            sessionStorage.removeItem("username");
            routerNavigator("/");
          }, 1000);

          return;
        }

        toast.error("Failed to change password");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PasswordSetting = (): JSX.Element => {
    return (
      <div className="w-full pr-5">
        <div className="mb-7 text-black dark:text-white">
          Input your current and your new password twice.
        </div>
        <form>
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="current_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your current password
              </label>
              <input
                ref={currentPasswordRef}
                type="text"
                id="current_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Current Password"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="new_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your new password
              </label>
              <input
                ref={newPasswordRef}
                type="text"
                id="new_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Password"
                required
              ></input>
            </div>

            <div>
              <label
                htmlFor="confirm_new_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm your new password
              </label>
              <input
                ref={confirmNewPasswordRef}
                type="text"
                id="confirm_new_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm New Password"
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
            {ConfirmChangePasswordModal()}
          </div>
        </form>
      </div>
    );
  };

  // Displays pop-up if user is sure of changing their password
  const ConfirmChangePasswordModal = (): JSX.Element => {
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
                onClick={() => handleChangePassword()}
              >
                Yes, I'm sure
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    const getUserInfo = async () => {
      let userTypeQuery = "";
      console.log("authStore user type: " + authStore.userType);
      if (authStore.userType === "Graduate") {
        userTypeQuery = "grad";
      } else if (authStore.userType === "Manager") {
        userTypeQuery = "man";
      } else if (authStore.userType === "Hr") {
        userTypeQuery = "hr";
      }
      

      axios
        .get(`${environmentalVariables.backend}home/${userTypeQuery}`, {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        })
        .then((response) => {
          const data = response.data.data;

          sessionStorage.setItem("username", data.first_name);
          setUserFirstName(data.first_name);
          setUserLastName(data.second_name);
          setUserEmail(data.email);
          setUserYear(data.year);
        });
    };

    getUserInfo();

    return () => {};
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <AvatarBar firstName={userFirstName} lastName={userLastName} />
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
        <div className="w-3/4 "><DisplayComponent /></div>
      </section>
    </div>
  );
};

export default AccountPage;
