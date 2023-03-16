import { FC, useEffect, useRef, useState } from "react";
import AvatarBar from "../components/AvatarBar";
import Navbar from "../components/Navbar";
import AccountTable from "../components/AccountPage/AccountTable";
import axios from "axios";
import authStore from "../context/authStore";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import ChangePasswordTable from "../components/AccountPage/ChangePasswordTable";

const AccountPage: FC = () => {
  const [currentTab, setCurrentTab] = useState<"Settings" | "Password">(
    "Settings"
  );

  // These variables are passed into account table
  const [userFirstName, setUserFirstName] = useState("...");
  const [userLastName, setUserLastName] = useState("...");
  const [userEmail, setUserEmail] = useState("...");
  const [userYear, setUserYear] = useState<number | string>("...");
  

  // Conditionally display the component depending on the active tab
  const DisplayComponent = (): JSX.Element => {
    const data = [userFirstName, userLastName, userEmail];

    if (userYear) data.push(String(userYear));

    if (currentTab === "Settings") return <AccountTable data={data} />;
    else {
      return <ChangePasswordTable />;
    }
  };

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getUserInfo = async () => {
      let userTypeQuery = "";
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

    if (effectRanOnFirstLoad.current === false) {
      getUserInfo();
    }

    return () => {
      effectRanOnFirstLoad.current = true;
    };
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
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Contact Details
          </button>

          <button
            onClick={() => setCurrentTab("Password")}
            type="button"
            className="w-full border-white border-b-2 rounded-br-2xl text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Change Password
          </button>
        </div>
        <div className="w-3/4 ">
          <DisplayComponent />
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
