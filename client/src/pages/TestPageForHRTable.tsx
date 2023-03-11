import { FC, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const TestPageForHRTable: FC = () => {
  const Table = (): JSX.Element => {
    const departmentInputRef = useRef(null);

    const addDepartment = (newDepartment: any) => {
      // add new department to state
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

    return (
      <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap w-3/4">
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
          <tbody>
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
        </table>
      </div>
    );
  };

  return (
    <div className="text-7xl flex flex-col justify-center h-screen w-full items-center text-black dark:text-white font-medium">
      <div>Test</div>
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
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <Table></Table>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg   bg-gray-500 px-4 py-2 text-left text-sm font-medium  text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Department 2</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5  text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <Table></Table>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
};
export default TestPageForHRTable;
