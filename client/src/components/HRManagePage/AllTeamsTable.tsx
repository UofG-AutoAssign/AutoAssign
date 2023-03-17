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
              <th scope="col" className="px-2 py-3 flex flex-row gap-3 text-2xl items-center dark:text-white">
              <AiFillSetting />
                Create New Team
              </th>
            </tr>
          </thead>
        </table>
        <div className="label-text w-full font-black text-black dark:text-white">
          Pick a Department
        </div>
        <div className="z-50 w-full">
          <DropdownAutoComplete type="DepartmentOnly" selected={selectedDepartment} setSelected={setSelectedDepartment} itemList={departmentList}  />
        </div>
        <div className="label-text w-full font-black text-balck text-black dark:text-white">
          Enter New Team Name
        </div>
        <input
          ref={teamNameInputRef}
          type="text"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter New Team Name..."
          required
        ></input>
        <div className="label-text w-full font-black text-balck text-black dark:text-white">
          Pick a Manager
        </div>
        <div className="z-40 w-full">
          <DropdownAutoComplete type="Manager" selected={selectedManager} setSelected={setSelectedManager} itemList={allManagerList}  /> 
        </div>
        <div className="label-text w-full font-black text-balck text-black dark:text-white">
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
            const depId = (selectedDepartment as any).id

            if (
              selectedDepartment === "" || selectedManager === "" || depId === undefined ||
              maxCapacityInputRef.current?.value === undefined ||
              !maxCapacityInputRef.current?.value ||
              teamNameInputRef.current?.value === undefined ||
              !teamNameInputRef.current?.value
            ) {
              console.log(depId)
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
