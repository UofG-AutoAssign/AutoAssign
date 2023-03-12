import { FC, useRef, useState, Fragment, useEffect } from "react";
import ManageTeamsTable from "../ManageTeamsTable";
import { toast } from "react-toastify";
import { Combobox, Transition } from "@headlessui/react";
import { managerType, teamAndDepartmentType } from "../../pages/HRManagePage";
import axios from "axios";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import authStore from "../../context/authStore";

export type departmentAndTeamListHRType = {
  departmentName: string;
  teamName: string;
  managerEmail: string;
  capacity: string;
  maxCapacity: string;
  teamMembers: {
    first_name: string;
    second_name: string;
    email: string;
  }[];
};

const TeamTable: FC<{ allManagerList: managerType[] }> = ({
  allManagerList,
}) => {
  const departmentInputRef = useRef<HTMLInputElement>(null);
  const maxCapacityInputRef = useRef<HTMLInputElement>(null);
  const teamNameInputRef = useRef<HTMLInputElement>(null);

  const [departmentAndTeamListHR, setDepartmentAndTeamListHR] = useState<{
    [rowId: number]: departmentAndTeamListHRType;
  }>({
    0: {
      departmentName: "Miles Department",
      teamName: "Java Developers",
      managerEmail: "Miles@milesking.com",
      capacity: "5",
      maxCapacity: "7",
      teamMembers: [
        {
          first_name: "Miles",
          second_name: "King",
          email: "Milesisscotland@king.com",
        },
        {
          first_name: "Fake Miles",
          second_name: "King",
          email: "miles.@wwewe.com",
        },
      ],
    },
    1: {
      departmentName: "Nora Department",
      teamName: "Python Developers",
      managerEmail: "Nora@nora.com",
      capacity: "2",
      maxCapacity: "10",
      teamMembers: [
        {
          first_name: "Naral",
          second_name: "Nora",
          email: "myemial@earostn.com",
        },
        {
          first_name: "Fake Nora",
          second_name: "Naral",
          email: "ilovemyparents@cap.com",
        },
      ],
    },
  });

  const addDepartment = (
    newDepartment: string,
    newManagerEmail: string,
    newCap: string
  ): void => {
    setDepartmentAndTeamListHR((prevData) => ({
      ...prevData,
      [curId]: {
        teamName: "My Team",
        departmentName: newDepartment,
        capacity: "Empty",
        managerEmail: newManagerEmail,
        maxCapacity: newCap,
        teamMembers: [
          {
            first_name: "Print",
            second_name: "McDonalds",
            email: "PrintMcDonals@ilovemyparents.co.au",
          },
          {
            first_name: "Hugo",
            second_name: "Friday",
            email: "pu$$yD3str0Y3R@ilovemyparents.co.jp",
          },
          {
            first_name: "Nora",
            second_name: "Chocolate Sweet Baby",
            email: "ilovethisproject@nocap.co.gn",
          },
        ],
      },
    }));

    setCurId((prev) => prev + 1);
  };

  const [curId, setCurId] = useState<number>(100);

  const [selectedManager, setSelectedManager] = useState<string>("");

  const DropdownManagerList = (): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredPeople =
      query === ""
        ? allManagerList
        : allManagerList.filter((manager) =>
            manager.email
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    return (
      <div className="relative min-w-[72px] w-full">
        <Combobox value={selectedManager} onChange={setSelectedManager}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
                displayValue={(manager) => (manager as any).email}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                V
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.map((manager) => (
                    <Combobox.Option
                      key={manager.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={manager}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {manager.email}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-blue-600"
                              }`}
                            >
                              ✅
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  };

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getAllTeamsAndDepartmentsForHR = async () => {
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/AllTeamAndDep/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedTeamList = data.data;
      console.log(fetchedTeamList);

      if (data.status === false) {
        toast.error("Failed to fetch departments and teams list");
        return;
      }

      // setDepartmentAndTeamListHR(fetchedTeamList);
    };


    if (effectRanOnFirstLoad.current === false) {
      getAllTeamsAndDepartmentsForHR();
    }

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);


  return (
    <div className="relative wrap w-full">
      <div className="relative flex flex-col overflow-x-visible rounded-sm shadow-lg wrap w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team & Department
              </th>
            </tr>
          </thead>
          <tbody className="">
            {Object.keys(departmentAndTeamListHR).map((rowId: string) => {
              return (
                <tr
                  className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
                  key={rowId}
                >
                  <ManageTeamsTable
                    departmentAndTeamListHR={
                      departmentAndTeamListHR[Number(rowId)]
                    }
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center gap-4 items-center w-full my-10">
        <input
          ref={departmentInputRef}
          type="text"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter New Department Name..."
          required
        ></input>
        <input
          ref={teamNameInputRef}
          type="text"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter New Team Name..."
          required
        ></input>
        <DropdownManagerList />
        
        <input
          ref={maxCapacityInputRef}
          type="number"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Max Team Capacity..."
          required
        ></input>
        <button
          type="button"
          className="my-10 gap-1000 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            if (
              departmentInputRef.current?.value === undefined ||
              !departmentInputRef.current?.value ||
              maxCapacityInputRef.current?.value === undefined ||
              !maxCapacityInputRef.current?.value ||
              teamNameInputRef.current?.value === undefined ||
              !teamNameInputRef.current?.value
            ) {
              toast.error("No empty input fields allowed");
              return;
            }
            addDepartment(
              departmentInputRef.current?.value,
              (selectedManager as any).email,
              maxCapacityInputRef.current?.value
            );
          }}
        >
          Add New Team
        </button>
      </div>
    </div>
  );
};

export default TeamTable;
