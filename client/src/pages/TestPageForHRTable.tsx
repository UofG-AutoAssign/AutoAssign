import { FC, useRef, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Table = (): JSX.Element => {
  const departmentInputRef = useRef<HTMLInputElement>(null);
  const MilesInputRef = useRef<HTMLInputElement>(null);
  const CapInputRef = useRef<HTMLInputElement>(null);

  const addDepartment = (
    newDepartment: string,
    newManagerEmail: string,
    newCap: string
  ) => {
    console.log(newDepartment, newManagerEmail, newCap)
    // add new department to state
    let newList = [...departmentAndTeamList];

    newList.push({
      department: newDepartment,
      managerEmail: newManagerEmail,
      Cap: newCap,
      teamList: [
        "Department 4 - Team 1",
        "Department 4 - Team 2",
        "Department 4 - Team 3",
        "Department 4 - Team 4",
      ],
      id: curId,
    });
    setDepartmentAndTeamList(newList);
    setCurId((prev) => prev + 1);
  };

  const [departmentAndTeamList, setDepartmentAndTeamList] = useState([
    {
      department: "Team 1- Jack",
      managerEmail: "Jack@yahoo.com",
      Cap: "1/7",
      teamList: ["Naral"],
      id: 1,
    },
    {
      department: "Team 1- Binhao",
      managerEmail: "Binhao💀💀💀@yahoo.com",
      Cap: "0/7",
      teamList: ["Binhao", "Binhao", "Binhao", "Binhao"],
      id: 2,
    },
    {
      department: "Team 1- Nora",
      managerEmail: "Nora🤓🤓🤓@yahoo.com",
      Cap: "0/7",
      teamList: ["Prith", "Prith", "Prith", "Prith"],
      id: 3,
    },
  ]);

  const [curId, setCurId] = useState<number>(departmentAndTeamList.length + 1);

  const addDepartment2 = (newDepartmentName: string): void => {
    let newList = [...departmentAndTeamList];

    newList.push({
      department: newDepartmentName,
      managerEmail: "Hugo👌👌👌@skype.com",
      Cap: "ssssss",
      teamList: [
        "Department 4 - Team 1",
        "Department 4 - Team 2",
        "Department 4 - Team 3",
        "Department 4 - Team 4",
      ],
      id: curId,
    });
    setDepartmentAndTeamList(newList);
    setCurId((prev) => prev + 1);
  };

  return (
    <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Team number
            </th>
            <th scope="col" className="px-6 py-3">
              Manager Email
            </th>
            <th scope="col" className="px-6 py-3">
              Capacity
            </th>
          </tr>
        </thead>
        <tbody className="mx-auto ">
          {departmentAndTeamList.map(
            ({ department, managerEmail, Cap, teamList, id }, idx) => (
              <Disclosure key={id}>
                {({ open }) => (
                  <>
                    <tr className="w-full bg-white border-b dark:bg-gray-600  dark:border-gray-700 text-black">
                      <td
                        scope="row"
                        className="flex flex-row px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white"
                      >
                        <Disclosure.Button className="flex items-center">
                          <span>{department}</span>
                          {/* <ChevronIcon className={`ml-1 h-4 w-4 transform ${open ? '-rotate-180' : ''}`} /> */}
                        </Disclosure.Button>
                      </td>
                      <td className="px-6 py-4">{managerEmail}</td>

                      <td className="px-6 py-4">{Cap}</td>
                    </tr>
                    {/*                     <Disclosure.Panel>
                      <table className="bg-gray-300 dark:bg-gray-500 w-full flex flex-col items-center align-middle">
                        {teamList.map((team) => (
                          <tr key={team}>
                            <td className="text-black dark:text-white">
                              {team}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </Disclosure.Panel> */}
                  </>
                )}
              </Disclosure>
            )
          )}
        </tbody>
        <div className="flex flex-col justify-center items-center bg-red-500 w-full">
          <input
            ref={departmentInputRef}
            type="text"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter New Department Name..."
            required
          ></input>

          <input
            ref={MilesInputRef}
            type="text"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter New Department Name..."
            required
          ></input>

          <input
            ref={CapInputRef}
            type="text"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter New Department Name..."
            required
          ></input>

          <button
            type="button"
            className="my-10 gap-1000 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              if (
                departmentInputRef.current?.value === undefined ||
                !departmentInputRef.current?.value ||
                MilesInputRef.current?.value === undefined ||
                !MilesInputRef.current?.value ||
                CapInputRef.current?.value == undefined ||
                !CapInputRef.current?.value
              )
                return;
              addDepartment(
                departmentInputRef.current?.value,
                MilesInputRef.current?.value,
                CapInputRef.current?.value
              );
            }}
          >
            Add New Row
          </button>
        </div>
      </table>

      <div className="flex flex-col items-center bg-white dark:bg-gray-800">
        <form>
          <label
            form="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const NotFoundPage: FC = () => {
  return (
    <div className="text-7xl flex flex-col justify-center h-screen w-full items-center text-black dark:text-white font-medium">
      <div>Test-Nora</div>
      <div>Manage Teams</div>

      <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap w-3/4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Teams and Departments
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="w-full px-4 pt-16">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-loginBlue px-4 py-2 text-left text-sm font-medium  text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-100 focus-visible:ring-opacity-75">
                  <span>Department 1</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5   text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 mx-auto">
                  <div className="">
                    <Table />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
