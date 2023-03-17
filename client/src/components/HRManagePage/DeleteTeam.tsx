import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";
import authStore from "../../context/authStore";
import { teamAndDepartmentType } from "../../pages/HRManagePage";
import AssignRemoveModal from "../general/AssignRemoveModal";
import DropdownAutoComplete from "../general/DropdownAutoComplete";

// Assigns a graduate to a specific team/department
const DeleteTeam: FC<{ teamAndDepartmentList: teamAndDepartmentType[]; }> = ({ teamAndDepartmentList }) => {

    const [selectedTeam, setSelectedTeam] = useState<string>("");

    const handleDeleteTeam = async (): Promise<void> => {
        try {
          const teamId = (selectedTeam as any).team_id;
          console.log(teamId);
    
          if (!selectedTeam || !selectedTeam || !teamId) {
            toast.error("No empty input fields allowed")
          }
          
          const { data } = await axios.post(
            `${environmentalVariables.backend}home/hr/DeleteTeam/`,
            {
              Team_id: teamId
            },
            {
              headers: {
                AUTHORIZATION: authStore.authToken,
              },
            }
          );
          console.log(data);
    
          if (data.status === true) {
            toast.success("Team successfully deleted!");

            setTimeout(() => {
              location.reload();
            }, 1500)
          } else {
            toast.error(`Failed to delete team: ${data.status}`);
          }
        } catch (error) {
          console.log(error);
          toast.error(`Failed to send request`);
        }
      };

    return (
      <div className="w-3/4 pr-5">
        <div className="mb-7 text-black dark:text-white">
          Use the dropdown to select the Team to delete and would unassign all graduates and the manager. 
        </div>
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-1">
            
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
              htmlFor={confirmGraduateToTeamModalId2}
              className="btn my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Delete
            </label>

            <input
              type="checkbox"
              id={confirmGraduateToTeamModalId2}
              className="modal-toggle"
            />
            <AssignRemoveModal handleSubmission={handleDeleteTeam} modalType="DeleteTeam" />
          </div>
        </form>
      </div>
    );
  };

export default DeleteTeam;