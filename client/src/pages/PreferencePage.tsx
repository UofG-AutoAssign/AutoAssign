
import Navbar from "../components/Navbar";
import { FC } from "react";
import Select from "react-select";
import PickTable from "../components/PickTable";
import { Routes, Route, useNavigate } from "react-router-dom";

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
  <Select className="relative w-3/4 h-10 text-black" options={experience_options} />
);
export const MyInterest = (): JSX.Element => (
  <Select className="relative w-3/4 h-10 text-black" options={interest_options} />
);
export const MyTech = (): JSX.Element => (
  <Select className="relative w-3/4 h-10 text-black" options={tech_options} />
);

export interface ItemType {
  id: number;
  name: string;
}

const PreferencePage: FC = () => {
  const navigate = useNavigate();

  const navigateToTeam = () => {
    navigate("/GraduateTeamPage");
  };

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="hi-text dark:text-white">
          Team Preference Form
        </div>
      </div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl">
          <button
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Team Preference Form
          </button>
          <button
            onClick={() => navigateToTeam()}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Your Team
          </button>
          <button
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Roles
          </button>
        </div>
        <div className="w-3/4 pr-5">
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
        </div>
      </section>
    </div>
  );
};

export default PreferencePage;
