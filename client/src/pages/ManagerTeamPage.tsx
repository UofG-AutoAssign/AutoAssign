import Navbar from "../components/Navbar";
import { FC, useEffect, useState } from "react";
import { TechnologyDropdown } from "./GraduateTeamPage";
import { HiOutlineTrash } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemType } from "../constants/Interfaces";
import { initialComponentManager } from "../constants/Types";

const ManagerTeamPage: FC<{ initialState: initialComponentManager }> = ({
  initialState,
}) => {
  const [currentTab, setCurrentTab] =
    useState<initialComponentManager>(initialState);

  const navigate = useNavigate();
  let location = useLocation();

  const [mockTeamList, setMockTeamList] = useState<
    {
      name: string;
      email: string;
    }[]
  >([
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

  const deleteItem = (delete_id: number): void => {
    let newList: ItemType[] = [...techList];

    newList = newList.filter((item) => {
      return item.id !== delete_id;
    });
    // console.log(newList);
    setTechList(newList);
  };

  const addItem = (): void => {
    let newList: ItemType[] = [...techList];

    newList.push({ id: curId, name: "hi" });
    // console.log(newList);
    setTechList(newList);
    setCurId((prev) => prev + 1);
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
                    className="flex flex-row justify-between px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    <TechnologyDropdown />
                    <HiOutlineTrash
                      className="text-3xl text-red-500 duration-150 hover:text-red-700 hover:scale-150 my-auto mx-5 hover:cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800">
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
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <input
          onChange={(e) => setSliderValue(e.target.value)}
          id="minmax-range"
          type="range"
          min="0"
          max="100"
          step="25"
          defaultValue={sliderValue}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        ></input>
        <div className="flex flex-col justify-between w-full px-2 text-xs bg-white dark:bg-gray-800">
          <div className="flex flex-row justify-between w-full ">
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

  useEffect(() => {
    const query = location.pathname.split("/").at(-1);

    if (query === "view_team") setCurrentTab("Your Team");
    else if (query === "team_preference") setCurrentTab("Team Preference");
    else setCurrentTab("Your Team");

    () => {};
  }, [location]);

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="hi-text dark:text-white">Pick Your Team Preference</div>
        {currentTab !== "Your Team" && (
          <div className="flex flex-row items-center justify-center gap-5">
            <div className="hi-text dark:text-white text-xl">
              Choose the what technologies your team would use.
            </div>
            <button
              type="button"
              className="my-4 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
            >
              Save
            </button>
          </div>
        )}
      </div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl h-fit">
          <button
            onClick={() => {
              navigate("/manager/team/view_team");
            }}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Your Team
          </button>
          <button
            onClick={() => {
              navigate("/manager/team/team_preference");
            }}
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
