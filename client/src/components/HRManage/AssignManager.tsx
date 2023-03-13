import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import { confirmGraduateToTeamModalId3 } from "../../constants/ModalIDs";
import authStore from "../../context/authStore";
import { managerType, teamAndDepartmentType } from "../../pages/HRManagePage";
import AssignManagerModal from "../modals/AssignManagerModal";

// Assigns a manager to a specific team/department
const AssignManager: FC<{
  allManagerList: managerType[];
  teamAndDepartmentList: teamAndDepartmentType[];
}> = ({ allManagerList, teamAndDepartmentList }) => {

  const [selectedManager, setSelectedManager] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const handleAssignManager = async (): Promise<boolean> => {
    try {
      const managerId = (selectedManager as any).id;
      const teamId = teamAndDepartmentList.find((team) => team.team_name === selectedTeam)?.team_id;
      console.log(managerId, teamId);

      if (!selectedManager || !selectedTeam || !managerId || !teamId) {
        toast.error("No empty input fields allowed")
        return false;
      }
      
      const { data } = await axios.put(
        `${environmentalVariables.backend}home/hr/AssignMan/`,
        {
          man_id: managerId,
          team_id: teamId,
        },
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );
      console.log(data);

      if (data.status === true) {
        toast.success("Manager successfully assigned!");
        return true;
      } else {
        toast.error(`Failed to assign manager: ${data.status}`);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to send request`);
      return false;
    }
  };

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
      <div className="relative min-w-[72px] w-full z-50">
        <Combobox value={selectedManager} onChange={setSelectedManager}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
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

  const DropdownTeamAndDepartmentList = (): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredTeam =
      query === ""
        ? teamAndDepartmentList
        : teamAndDepartmentList.filter((team) =>
            team.team_name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    return (
      <div className="relative min-w-[72px] w-full">
        <Combobox value={selectedTeam} onChange={setSelectedTeam}>
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
                  filteredTeam.map((team, idx) => (
                    <Combobox.Option
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={team.team_name}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {team.team_name}
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

    return (
      <div className="w-3/4 pr-5">
        <div className="mb-7 text-black dark:text-white">
          Type the manager's email and the specific team you want to move them
          to.
        </div>
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Manager email
              </label>
              <DropdownManagerList />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Team
              </label>
              <DropdownTeamAndDepartmentList />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor={confirmGraduateToTeamModalId3}
              className="btn my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Assign
            </label>

            <input
              type="checkbox"
              id={confirmGraduateToTeamModalId3}
              className="modal-toggle"
            />
            <AssignManagerModal handleAssignManager={handleAssignManager}/>
          </div>
        </form>
      </div>
    );
  };

export default AssignManager;