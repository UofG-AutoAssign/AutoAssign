import { FC, useState } from "react";
import {
  TechnologyDropdown,
  ExperienceDropdown,
  InterestDropdown,
} from "../pages/GraduateTeamPage";
import { HiOutlineTrash } from "react-icons/hi";
import { ItemType } from "../constants/Interfaces";

const PreferenceFormTable: FC = () => {
  // @Todo prevent duplicate technology picks
  const [mockData, setMockData] = useState<ItemType[]>([
    { id: 0, name: "Full-Stack Development" },
  ]);

  const [curId, setCurId] = useState<number>(1);

  const deleteItem = (delete_id: number): void => {
    let newList: ItemType[] = [...mockData];

    newList = newList.filter((item) => {
      return item.id !== delete_id;
    });
    setMockData(newList);
  };

  const addItem = (): void => {
    let newList: ItemType[] = [...mockData];

    newList.push({ id: curId, name: "hi" });
    setMockData(newList);
    setCurId((prev) => prev + 1);
  };

  return (
    <div className="">
      <div className="overflow-x-visible relative shadow-lg rounded-sm flex wrap">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Technology
              </th>
              <th scope="col" className="py-3 px-6">
                Experience
              </th>
              <th scope="col" className="py-3 px-6">
                Interest
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <tr
                className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
                key={item.id}
              >
                <td className="w-full flex flex-row font-medium py-4 px-6">
                  <TechnologyDropdown />
                  <HiOutlineTrash
                    className="ml-6 text-3xl text-red-500 duration-150 hover:text-red-700 hover:scale-125 my-auto hover:cursor-pointer"
                    onClick={() => deleteItem(item.id)}
                  />
                </td>
                <td className="w-1/3 py-4 px-6">
                  <ExperienceDropdown />
                </td>
                <td className="w-1/3 py-4 px-6">
                  <InterestDropdown />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center bg-white dark:bg-gray-800">
        <button
          type="button"
          className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => addItem()}
        >
          Add New Row
        </button>
      </div>
    </div>
  );
};

export default PreferenceFormTable;
