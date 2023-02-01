import Navbar from "../components/Navbar";
import { FC, useState } from "react";
import { ItemType } from "./PreferencePage";
import { useNavigate } from "react-router-dom";
export interface ManagerTableType {
  name: string;
  email: string;
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

    newList.push({ id: curId, name: "hi" });
    console.log(newList);
    setTechList(newList);
    setCurId((prev) => prev + 1);
  };

  const [sliderValue, setSliderValue] = useState("50");

  const navigate = useNavigate();

  const navigateToPreference = () => {
    navigate("/Preference_page");
  };

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
            onClick={() => navigateToPreference()}
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
          {currentTab === "Your Team" ? (
            teamTable()
          ) : (
            <div className="">{technologiesTable()}</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GraduateTeamPage;
