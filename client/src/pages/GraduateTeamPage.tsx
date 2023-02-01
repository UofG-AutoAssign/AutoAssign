import Navbar from "../components/Navbar";
import { FC, useState } from "react";
import PickTable from "../components/PickTable";
import Select from "react-select";
export interface ManagerTableType {
  name: string;
  email: string;
}

export const experience_options = [
  { value: 3, label: "Proficient" },
  { value: 2, label: "Intermediate" },
  { value: 1, label: "Basic" },
  { value: 0, label: "None" },
];

export const interest_options = [
  { value: 3, label: "Very Interested" },
  { value: 2, label: "Interested" },
  { value: 1, label: "Somewhat Interested" },
  { value: 0, label: "Not Interested" },
];

export const tech_options = [
  { value: "full_stack_development", label: "Full Stack Development" },
  { value: "ui_ux_development", label: "UI/UX Development" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "cyber_security", label: "Cyber Security" },
];

export const MyExperience = (): JSX.Element => (
  <Select
    className="relative w-3/4 h-10 text-black"
    options={experience_options}
  />
);
export const MyInterest = (): JSX.Element => (
  <Select
    className="relative w-3/4 h-10 text-black"
    options={interest_options}
  />
);
export const MyTech = (): JSX.Element => (
  <Select className="relative w-3/4 h-10 text-black" options={tech_options} />
);

export interface ItemType {
  id: number;
  name: string;
}

const GraduateTeamPage: FC = () => {
  const [currentTab, setCurrentTab] = useState<
    "Your Team" | "Preference Form" | "Roles"
  >("Your Team");

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

  const [techList, setTechList] = useState<ItemType[]>([
    { id: 0, name: "Full-Stack Development" },
  ]);

  const teamTable = (): JSX.Element => {
    return (
      <div className="relative flex overflow-x-visible shadow-lg wrap rounded-lg">
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

  const preferenceTable = (): JSX.Element => {
    return (
      <div className="w-full bg-white rounded-2xl font-medium">
        <PickTable />
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

  const technologiesTable = (): JSX.Element => {
    return (
      <div>
        <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Technology
                </th>
              </tr>
            </thead>
            <tbody>
              {techList.map((item) => (
                <tr
                  className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="flex flex-row justify-between px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  ></th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const displayComponent = (): JSX.Element => {
    if (currentTab === "Your Team") {
      return teamTable();
    }

    else if (currentTab === "Preference Form") {
      return preferenceTable();
    }

    else {
      return technologiesTable();
    }
  }

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
        <div className="hi-text dark:text-white">My Team</div>
      </nav>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl h-fit">
          <button
            onClick={() => setCurrentTab("Your Team")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Your Team
          </button>
          <button
            onClick={() => setCurrentTab("Preference Form")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Preference Form
          </button>
          <button
            onClick={() => setCurrentTab("Roles")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Roles
          </button>
        </div>

        <div className="w-3/4 pr-5">
          {displayComponent()}
        </div>
      </section>
    </div>
  );
};

export default GraduateTeamPage;
