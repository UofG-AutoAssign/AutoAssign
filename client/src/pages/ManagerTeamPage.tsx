import Navbar from "../components/Navbar";
import React, { useRef, useState } from "react";
import PickTable from "../components/PickTable";
import { ItemType, MyExperience, MyInterest, MyTech, tech_options } from "./PreferencePage";
import { HiOutlineTrash } from "react-icons/hi";

export interface ManagerTableType {
  name: string;
  email: string;
}

const ManagerTeamPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"Your Team" | "Team Settings">(
    "Your Team"
  );

  const [mockTeamList, setMockTeamList] = useState<ManagerTableType[]>([
    { name: "Jack", email: "Jack@yahoo.com" },
    { name: "Jack", email: "Jack@yahoo.com" },
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

  const [curId, setCurId] = useState<number>(1);

  const deleteItem = (delete_id: number) => {
    let newList: ItemType[] = [...techList];

    newList = newList.filter((item) => {
      return item.id !== delete_id;
    });
    console.log(newList);
    setTechList(newList);
  };

  const addItem = () => {
    let newList: ItemType[] = [...techList];

    newList.push({id:curId, name: "hi"});
    console.log(newList);
    setTechList(newList);
    setCurId((prev) => prev + 1)
  };

  const [sliderValue, setSliderValue] = useState("50");

  const teamTable = (): JSX.Element => {
    return (
      <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap">
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

  const settingsTable = (): JSX.Element => {
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
                  >
                    <MyTech />
                    <button className="text-xl text-red-500 duration-150 hover:text-red-700 hover:scale-150" onClick={() => deleteItem(item.id)}>
                      <HiOutlineTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="mb-10 hover:scale-110 transition-all duration-150 my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => addItem()}
          >
            Add New Row
          </button>
        </div>
      </div>
    );
  };

  const preferenceSlider = (): JSX.Element => {
    return (
      <div>
        <input
          onChange={(e) => console.log(e.target.value)}
          id="minmax-range"
          type="range"
          min="0"
          max="100"
          step="25"
          defaultValue={sliderValue}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        ></input>
        <div className="flex flex-col justify-between w-full px-2 text-xs text-black bg-white">
          <div className="flex flex-row justify-between w-full">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex flex-row justify-between w-full">
            <span>Prioritise Skill</span>
            <span>Prioritise Enthusiasm</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="py-5 text-5xl text-center text-blue-900">
          Pick Your Team Preference
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <div className="text-black">
            Choose the what technologies your team would use.
          </div>
          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
          >
            Save
          </button>
        </div>
      </div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl">
          <button
            onClick={() => setCurrentTab("Your Team")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Your Team
          </button>
          <button
            onClick={() => setCurrentTab("Team Settings")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Team Settings
          </button>
        </div>

        <div className="w-3/4 pr-5">
          <div className="bg-white rounded-2xl">
            {currentTab === "Your Team" ? (
              teamTable()
            ) : (
              <div className="">
                {settingsTable()}
                {preferenceSlider()}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagerTeamPage;
