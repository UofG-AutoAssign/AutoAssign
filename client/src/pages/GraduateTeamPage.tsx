import Navbar from "../components/Navbar";
import { FC, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import PreferenceFormTable from "../components/PreferenceFormTable";
import { ItemInterface } from "../constants/Interfaces";
import { initialComponentGraduate } from "../constants/Types";
import { ManagerTableInterface } from "../constants/Interfaces";
import {
  experienceOptions,
  interestOptions,
} from "../constants/Options";
import axios from "axios";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import authStore from "../context/authStore";
import { toast } from "react-toastify";

const GraduateTeamPage: FC<{ initialComponent: initialComponentGraduate }> = ({
  initialComponent,
}) => {
  const [currentTab, setCurrentTab] =
    useState<initialComponentGraduate>(initialComponent);

  // List of team members
  const [teammateList, setTeammateList] = useState<ManagerTableInterface[]>([
    { name: "...", email: "..." },
  ]);

  // Displays the table for the graduate to view their team
  const YourTeamTable = (): JSX.Element => {
    return (
      <div className="relative flex overflow-x-visible shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team Members
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {teammateList.map(({ name, email }, idx) => (
              <tr
                className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={idx}
              >
                <th
                  scope="row"
                  className="flex flex-row px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {name}
                </th>
                <td className="px-6 py-4">{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Displays the Preference Form Table as well as a save button
  const PreferenceTable = (): JSX.Element => {
    return (
      <div className="w-full bg-white rounded-2xl font-medium">
        <PreferenceFormTable />
      </div>
    );
  };

  // Display page corresponding to the active tab
  const DisplayComponent = (): JSX.Element => {
    if (currentTab === "Your Team") return <YourTeamTable />;
    else return <PreferenceTable />;
  };

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const query = location.pathname.split("/").at(-1);

    if (query === "view_team") setCurrentTab("Your Team");
    else setCurrentTab("Preference Form");

    return () => { };
  }, [location]);

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getTeammateList = async () => {
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/grad/team/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      if (data.code !== 200) {
        toast.error("[Team members] " + data.error);
        return;
      }

      const fetchedTeamList = data.data;
      console.log(data, fetchedTeamList);

      let newTeammateList: ManagerTableInterface[] = [];

      fetchedTeamList.forEach(({ email, first_name, second_name }: any) => {
        newTeammateList.push({ email, name: `${first_name} ${second_name}` })
      });

      setTeammateList(newTeammateList)

      if (data.status === false) toast.error(data.error)

    };

    if (effectRanOnFirstLoad.current === false) getTeammateList();

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
        <div className="hi-text dark:text-white">{currentTab === "Preference Form" ? "Skills Preference Form" : "My Team"}</div>
      </nav>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl h-fit">
          <button
            onClick={() => navigate("/graduate/team/view_team")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Your Team
          </button>
          <button
            onClick={() => navigate("/graduate/team/preference_form")}
            type="button"
            className="w-full border-white border-b-2 rounded-br-2xl text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Preference Form
          </button>
        </div>

        <div className="w-3/4 pr-5">
          <DisplayComponent />
        </div>
      </section>
    </div>
  );
};

export default GraduateTeamPage;
