import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";
import authStore from "../../context/authStore";
import { managerType } from "../../pages/HRManagePage";
import RemoveManagerModal from "../modals/RemoveManagerModal";

// Permanently delete a manager account
const RemoveManager: FC<{ allManagerList: managerType[] }> = ({ allManagerList }) => {
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

  const handleRemoveManager = async (): Promise<void> => {
    try {
      const gradId = (selectedManager as any).id;
      console.log(gradId);

      if (!selectedManager || !gradId) {
        toast.error("No empty input fields allowed")
      }

      const { data } = await axios.post(
        `${environmentalVariables.backend}home/hr/DeleteMan/`,
        {
          id: gradId,
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
          <DropdownManagerList />
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
            <RemoveManagerModal handleRemoveManager={handleRemoveManager}/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RemoveManager;
