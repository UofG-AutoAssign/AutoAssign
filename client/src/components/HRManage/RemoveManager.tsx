import { FC } from "react";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";
import RemoveManagerModal from "../modals/RemoveManagerModal";

// Permanently delete a manager account
const RemoveManager: FC = () => {
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
          <input
            type="text"
            id="first_name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="manager@email.com                         "
            required
          ></input>
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
            <RemoveManagerModal />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RemoveManager;
