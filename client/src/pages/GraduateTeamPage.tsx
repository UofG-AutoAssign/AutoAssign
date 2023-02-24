import Navbar from "../components/Navbar";
import { FC, useEffect, useState } from "react";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import PreferenceFormTable from "../components/PreferenceFormTable";
import { ItemType } from "../constants/Interfaces";
import { initialComponentGraduate } from "../constants/Types";
import { ManagerTableType } from "../constants/Interfaces";
import { experienceOptions, interestOptions, techOptions } from "../constants/Options";

export const ExperienceDropdown = (): JSX.Element => (
  <Select
    className="min-w-[200px] relative w-full h-10 text-black"
    options={experienceOptions}
  />
);
export const InterestDropdown = (): JSX.Element => (
  <Select
    className="min-w-[200px] relative w-full h-10 text-black"
    options={interestOptions}
  />
);
export const TechnologyDropdown = (): JSX.Element => (
  <Select className="min-w-[200px] relative w-full h-10 text-black" options={techOptions} />
);

const GraduateTeamPage: FC<{ initialComponent: initialComponentGraduate }> = ({ initialComponent }) => {
  const [currentTab, setCurrentTab] = useState<
    initialComponentGraduate
  >(initialComponent);

  // List of team members
  const [mockTeamList, setMockTeamList] = useState<ManagerTableType[]>([
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
  ]);

  // Constant data for sending to backend
  const [techList, setTechList] = useState<ItemType[]>([
    { id: 0, name: "Full-Stack Development" },
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
            {mockTeamList.map(({ name, email }, idx) => (
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
        <div className="flex flex-row justify-center bg-white dark:bg-gray-800">
          <button
            type="button"
            className="my-5 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  // Display page corresponding to the active tab
  const DisplayComponent = (): JSX.Element => {
    if (currentTab === "Your Team") return <YourTeamTable />
    else return <PreferenceTable />
  }

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const query = location.pathname.split("/").at(-1);

    if (query === "view_team") setCurrentTab("Your Team")
    else setCurrentTab("Preference Form");

    () => {}
  }, [location])

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
        <div className="hi-text dark:text-white">My Team</div>
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
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
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
