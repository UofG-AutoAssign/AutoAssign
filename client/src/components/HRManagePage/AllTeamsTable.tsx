import { FC, useRef, useState, Fragment, useEffect } from "react";
import IndividualTeamTable from "./IndividualTeamTable";
import { toast } from "react-toastify";
import { Combobox, Transition } from "@headlessui/react";
import { departmentType, managerType } from "../../pages/HRManagePage";
import axios from "axios";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import authStore from "../../context/authStore";
import { AiFillSetting } from "react-icons/all";
import DropdownAutoComplete from "../general/DropdownAutoComplete";

export type departmentAndTeamListHRType = {
  departmentName: string;
  teamName: string;
  managerEmail: string;
  capacity: string;
  maxCapacity: string;
  teamMembers: {
    grad_id: number;
    grad_name: string;
    grad_email: string;
  }[];
};

const AllTeamsTable: FC<{ allManagerList: managerType[], departmentList: departmentType[]; }> = ({
  allManagerList, departmentList
}) => {
  const maxCapacityInputRef = useRef<HTMLInputElement>(null);
  const teamNameInputRef = useRef<HTMLInputElement>(null);

  const [departmentAndTeamListHR, setDepartmentAndTeamListHR] = useState<{
    [rowId: number]: departmentAndTeamListHRType;
  }>({
    0: {
      departmentName: "...",
      teamName: "...",
      managerEmail: "...",
      capacity: "...",
      maxCapacity: "...",
      teamMembers: [
        {
          grad_email: "...",
          grad_id: 999,
          grad_name: "...",
        },
      ],
    },
  });

  const handleCreateNewTeam = async (
    newTeamName: string,
    departmentId: number,
    managerId: number,
    maxCapacity: number,
  ): Promise<void> => {
    const postBody = {
      team_name: newTeamName,
      man_id: managerId,
      depart_id: departmentId,
      num_positions: maxCapacity
    }

    console.log(postBody);

    const { data } = await axios.post(
      `${environmentalVariables.backend}home/hr/CreateTeam/`,
      [postBody],
      {
        headers: {
          AUTHORIZATION: authStore.authToken,
        },
      }
    );

    console.log(data);

    if (data.status === true) {
      toast.success("New Team Saved to Database!")
      setTimeout(() => {
        location.reload(); // Force refresh page
      }, 1500);
    } else {
      toast.error(`Failed to Create New Team ${data.error[0].man_id}`)
    }

    return;
  };

  const [selectedManager, setSelectedManager] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

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
      <div className="relative min-w-[72px] w-full z-30">
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

  const DropdownDepartmentList = (): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredTeam =
      query === ""
        ? departmentList
        : departmentList.filter((dep) =>
            dep.depart_name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    return (
      <div className="relative min-w-[72px] w-full z-40">
        <Combobox value={selectedDepartment} onChange={setSelectedDepartment}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(team) => team as any}
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
                {filteredTeam.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredTeam.map((dep, idx) => (
                    <Combobox.Option
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={dep.depart_name}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {dep.depart_name}
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

      if (data.status === false) {
        toast.error("Failed to fetch departments and teams list");
        return;
      }
      // console.log(data);
      const fetchedTeamList = data.data;
      console.log(data)
      // @Todo get manager eamil, team capacity
      let newData = {};
      let idx = 0;

      fetchedTeamList.forEach(
        ({
          depart_id,
          depart_name,
          man_id,
          man_name,
          man_email,
          team_id,
          team_name,
          team_members,
          num_positions
        }: any) => {
          newData = {
            ...newData,
            [idx]: {
              teamName: team_name,
              departmentName: depart_name,
              capacity: team_members === "Null" ? 0 : team_members.length,
              managerEmail: `${man_name} / ${man_email}`,
              maxCapacity: num_positions,
              teamMembers: team_members === "Null" ? [] : team_members,
            },
          };
          idx += 1;
        }
      );

      setDepartmentAndTeamListHR(newData);
    };

    if (effectRanOnFirstLoad.current === false) {
      getAllTeamsAndDepartmentsForHR();
    }

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);

  return (
    <div className="relative wrap w-full px-5 py-3">
      <div className="relative flex flex-col overflow-x-visible rounded-sm shadow-lg wrap w-full ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team
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
                  <IndividualTeamTable
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
      <div className="flex flex-col justify-center gap-4 items-center w-full my-10 relative wrap shadow-2xl p-5 rounded-btn">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">

            <tr>
              <th scope="col" className="px-2 py-3 flex flex-row gap-3 text-2xl items-center">
              <AiFillSetting />
                Create New Team
              </th>
            </tr>
          </thead>
        </table>
        <div className="label-text w-full font-black text-black">
          Pick a Department
        </div>
        <DropdownDepartmentList />
        {/* <div className="z-50 w-full">
        <DropdownAutoComplete type="DepartmentOnly" selected={selectedDepartment} setSelected={setSelectedDepartment} itemList={departmentList}  />
        </div> */}
        <div className="label-text w-full font-black text-balck text-black">
          Enter New Team Name
        </div>
        <input
          ref={teamNameInputRef}
          type="text"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter New Team Name..."
          required
        ></input>
        <div className="label-text w-full font-black text-balck text-black">
          Pick a Manager
        </div>
        <DropdownManagerList />
        {/* <DropdownAutoComplete type="Manager" selected={selectedManager} setSelected={setSelectedManager} itemList={allManagerList}  />  */}

        <div className="label-text w-full font-black text-balck text-black">
          Enter Team&apos;s  Max Headcount
        </div>
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
            const depId = departmentList.find((dep) => dep.depart_name === selectedDepartment)?.id;

            if (
              selectedDepartment === "" || selectedManager === "" || depId === undefined ||
              maxCapacityInputRef.current?.value === undefined ||
              !maxCapacityInputRef.current?.value ||
              teamNameInputRef.current?.value === undefined ||
              !teamNameInputRef.current?.value
            ) {
              toast.error("No empty input fields allowed");
              return;
            }

            if (Number(maxCapacityInputRef.current?.value) < 1) {
              toast.error("Teams need at least 1 empty slot");
              return;
            }

            handleCreateNewTeam(
              teamNameInputRef.current?.value,
              depId,
              (selectedManager as any).id,
              Number(maxCapacityInputRef.current?.value)
            );
          }}
        >
          Add New Team
        </button>
      </div>
      
    </div>
  );
};

export default AllTeamsTable;
