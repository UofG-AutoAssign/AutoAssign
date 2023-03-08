import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";
import authStore from "../../context/authStore";
import { gradType } from "../../pages/HRManagePage";
import RemoveGraduateModal from "../modals/RemoveGraduateModal";

// Permanently delete a graduate account
const RemoveGraduate: FC<{
  allGradList: gradType[];
}> = ({ allGradList }) => {

  const [selectedGrad, setSelectedGrad] = useState<string>("");
  const [allYearTwoGrads, setAllYearTwoGrads] = useState<gradType[]>([])

  const handleRemoveGrad = async (): Promise<boolean> => {
    try {
      const gradId = (selectedGrad as any).id;
      console.log(gradId);

      if (!selectedGrad || !gradId) {
        toast.error("No empty input fields allowed")
        return false;
      }

      const { data } = await axios.post(
        `${environmentalVariables.backend}home/hr/DeleteGrad/`,
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
        toast.success("Graduate successfully deleted!");
        return true;
      } else {
        toast.error(`Failed to delete graduate: ${data.status}`);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to send deletion request`);
      return false;
    }
  };

  const handleRemoveAllYearTwoGrads = async (): Promise<boolean> => {
    try {
      const { data } = await axios.post(
        `${environmentalVariables.backend}home/hr/DeleteYearTwo/`,
        {
          check_num: 1
        },
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );
      console.log(data);

      if (data.status === true) {
        toast.success("All year 2 graduate(s) successfully deleted!");
        return true;
      } else {
        toast.error(`Failed to delete all year 2 graduate(s): ${data.detail}`);
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed to send deletion request`);
      return false;
    }
  };

  const DropdownGradList = (): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredPeople =
      query === ""
        ? allGradList
        : allGradList.filter((grad) =>
            grad.email
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    return (
      <div className="relative min-w-[72px] w-full z-50">
        <Combobox value={selectedGrad} onChange={setSelectedGrad}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(grad) => (grad as any).email}
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
                  filteredPeople.map((grad) => (
                    <Combobox.Option
                      key={grad.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={grad}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {grad.email}
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

  const GraduateTable = ({
    graduateList,
  }: {
    graduateList: string[];
  }): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredPeople =
      query === ""
        ? graduateList
        : graduateList.filter((graduateName) => {
            return graduateName.toLowerCase().includes(query.toLowerCase());
          });

    return (
      <div className="bg-white dark:bg-gray-800 overflow-x-auto relative shadow-md sm:rounded-lg h-96 w-96 overflow-y-scroll">
        <input
          className="w-full border-none my-2 pl-5 pr-10 font-semibold text-left text-sm leading-5 text-black dark:text-white focus:ring-0 bg-gray-100 dark:bg-gray-700"
          type={"text"}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={"Search Names"}
        />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
          <tbody>
            {graduateList.length === 0 ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-400 whitespace-nowrap dark:text-white"
                >
                  Empty
                </th>
                <td className="py-4 px-6 text-right"></td>
              </tr>
            ) : (
              filteredPeople.map((managerName) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {managerName}
                    </th>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getAllYearTwoGradList = async () => {
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/AllYearTwoGrad/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedYearTwoGradList = data.data;
      console.log(fetchedYearTwoGradList);
      setAllYearTwoGrads(fetchedYearTwoGradList);
    };

    if (effectRanOnFirstLoad.current === false) {
      getAllYearTwoGradList();
    }
  
    return () => {
      effectRanOnFirstLoad.current = true;
    }
  }, [])
  

  return (
    <div className="w-3/4 pr-5">
      <div className="mb-7 text-black dark:text-white">
        Type the graduates email and delete their account permanently.
      </div>
      <form>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Graduate email
            </label>
          </div>
          <DropdownGradList />
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
            <RemoveGraduateModal handleRemoveGrad={handleRemoveGrad}/>

            <div className="my-5 p-5 w-full border-2 border-red-800 bg-red-500 bg-opacity-50 basis-1/2 rounded-3xl flex flex-col justify-center shadow-lg py-5">
              <div className="hi-text dark:text-white text-xl mb-5">All Year 2 Graduates</div>
              <GraduateTable graduateList={allYearTwoGrads.map((grad) => `${grad.first_name} ${grad.second_name}`)}/>
              <button
                onClick={() => handleRemoveAllYearTwoGrads()}
                type="button"
                className="opacity-100 my-8 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
              >
                Remove All Year 2 Graduates
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RemoveGraduate;
