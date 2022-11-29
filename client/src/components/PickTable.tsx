import React, { useState } from "react";
import {MyTech,
  MyExperience,
  MyInterest,
  ItemType,
} from "../pages/PreferencePage";
import { ReactSortable } from "react-sortablejs";

const PickTable: React.FC = () => {
  // @Todo prevent duplicate technology picks
  const [mockData, setMockData] = useState<ItemType[]>([
    { id: 0, name: "Full-Stack Development" },
  ]);

  const [curId, setCurId] = useState<number>(1);

  const deleteItem = (delete_id: number) => {
    let newList: ItemType[] = [...mockData];

    newList = newList.filter((item) => {
      return item.id !== delete_id;
    });
    console.log(newList);
    setMockData(newList);
  };

  const addItem = () => {
    let newList: ItemType[] = [...mockData];

    newList.push({id:curId, name: "hi"});
    console.log(newList);
    setMockData(newList);
    setCurId((prev) => prev + 1)
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
                className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item.id}
              >
                <th
                  scope="row"
                  className="flex flex-row py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <MyTech />
                  <button className="w-1/4" onClick={() => deleteItem(item.id)}>
                    delete
                  </button>
                </th>
                <td className="py-4 px-6">
                  <MyExperience />
                </td>
                <td className="py-4 px-6">
                  <MyInterest />
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center">
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

export default PickTable;
