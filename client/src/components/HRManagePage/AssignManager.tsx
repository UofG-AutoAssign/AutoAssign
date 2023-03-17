import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import { confirmGraduateToTeamModalId3 } from "../../constants/ModalIDs";
import authStore from "../../context/authStore";
import { managerType, teamAndDepartmentType } from "../../pages/HRManagePage";
import AssignRemoveModal from "../general/AssignRemoveModal";
import DropdownAutoComplete from "../general/DropdownAutoComplete";

// Assigns a manager to a specific team/department
const AssignManager: FC<{
  allManagerList: managerType[];
  teamAndDepartmentList: teamAndDepartmentType[];
}> = ({ allManagerList, teamAndDepartmentList }) => {

  const [selectedManager, setSelectedManager] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const handleAssignManager = async (): Promise<void> => {
    try {
      const managerId = (selectedManager as any).id;
      const teamId = (selectedTeam as any).team_id;
      console.log(managerId, teamId);

      if (!selectedManager || !selectedTeam || !managerId || !teamId) {
        toast.error("No empty input fields allowed")
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
        
        setTimeout(() => {
          location.reload();
        }, 1500)
      } else {
        toast.error(`Failed to assign manager: ${data.status}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to send request`);
    }
  };

    return (
      <div className="w-3/4 pr-5">
        <div className="mb-7 text-black dark:text-white">
          Type the manager&apos;s email and the specific team you want to move them
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
              <DropdownAutoComplete type="Manager" selected={selectedManager} setSelected={setSelectedManager} itemList={allManagerList}  /> 
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Team
              </label>
              <DropdownAutoComplete type="TeamAndDepartment" selected={selectedTeam} setSelected={setSelectedTeam} itemList={teamAndDepartmentList}  />
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
            <AssignRemoveModal handleSubmission={handleAssignManager} modalType="AssignManager"/>
          </div>
        </form>
      </div>
    );
  };

export default AssignManager;