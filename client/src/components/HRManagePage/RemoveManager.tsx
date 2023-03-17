import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";
import authStore from "../../context/authStore";
import { managerType } from "../../pages/HRManagePage";
import AssignRemoveModal from "../general/AssignRemoveModal";
import DropdownAutoComplete from "../general/DropdownAutoComplete";

// Permanently delete a manager account
const RemoveManager: FC<{ allManagerList: managerType[] }> = ({ allManagerList }) => {
  const [selectedManager, setSelectedManager] = useState<string>("");

  const handleRemoveManager = async (): Promise<void> => {
    try {
      const manId = (selectedManager as any).id;
      console.log(manId);

      if (!selectedManager || !manId) {
        toast.error("No empty input fields allowed")
      }

      const { data } = await axios.post(
        `${environmentalVariables.backend}home/hr/DeleteMan/`,
        {
          id: manId,
        },
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );
      console.log(data);

      if (data.status === true) {
        toast.success("Manager successfully deleted!");

        setTimeout(() => {
          location.reload();
        }, 1500)
      } else {
        toast.error(`Failed to delete manager: ${data.status}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to send deletion request`);
    }
  };

  return (
    <div className="w-3/4 pr-5 ">
      <div className="mb-7 text-black dark:text-white">
        Type the managers email and delete their account permanently.
      </div>
      <form>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Manager email
            </label>
          </div>
          <DropdownAutoComplete type="Manager" selected={selectedManager} setSelected={setSelectedManager} itemList={allManagerList}  /> 
          <div className="flex flex-col items-center">
            <label
              htmlFor={confirmGraduateToTeamModalId2}
              className="btn my-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Delete
            </label>
            <input
              type="checkbox"
              id={confirmGraduateToTeamModalId2}
              className="modal-toggle"
            />
            <AssignRemoveModal handleSubmission={handleRemoveManager} modalType="RemoveManager" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RemoveManager;
