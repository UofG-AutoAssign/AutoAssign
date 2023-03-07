import { FC, useEffect, useState, useCallback, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Select from "react-select";
import axios from "axios";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import authStore from "../context/authStore";
import { interestOptions } from "../constants/Options";
import { toast } from "react-toastify";

export type selectedDataType = {
  selectedTechnology: {
    value: number;
    label: string;
  };
  selectedExperience: number;
  selectedInterest: number;
};

const PreferenceFormTable: FC = () => {
  // Map of selected skills, experience, and interest for each row
  const [selectedData, setSelectedData] = useState<{
    [rowId: number]: selectedDataType;
  }>({
    0: {
      selectedExperience: 0,
      selectedInterest: 0,
      selectedTechnology: {
        value: 0,
        label: "...",
      },
    },
  });

  // List of available skills to de displayed in a drop down
  const [allSkills, setAllSkills] = useState<any[]>([
    { value: 1, label: "Python" },
  ]);

  const [curRowId, setCurRowId] = useState<number>(100);

  const deleteItem = (deletedId: number): void => {
    setSelectedData((prevState) => {
      const newState = { ...prevState };
      delete newState[deletedId];
      return newState;
    });
  };

  const addItem = (): void => {
    // Add a new row with a unique ID and no selected skill
    setSelectedData((prevState) => {
      return {
        ...prevState,
        [curRowId]: {
          selectedExperience: 0,
          selectedInterest: 0,
          selectedTechnology: {
            value: 0,
            label: "...",
          },
        },
      };
    });

    setCurRowId((prevRowId) => prevRowId + 1);
  };

  const TechnologyDropdown = ({
    selectedTechnology,
    rowId,
  }: {
    selectedTechnology: {
      value: number;
      label: string;
    };
    rowId: string;
  }): JSX.Element => {
    const handleSelectChange = (
      value: any,
      property: string,
      rowId: number
    ) => {
      setSelectedData((prevData) => ({
        ...prevData,
        [rowId]: {
          ...prevData[rowId],
          [property]: value,
        },
      }));
    };

    return (
      <Select
        className="min-w-[200px] relative w-full h-10 text-black"
        value={selectedTechnology}
        onChange={(value) =>
          handleSelectChange(value, "selectedTechnology", Number(rowId))
        }
        options={allSkills}
      />
    );
  };

  const ExperienceDropdown = ({}: {}) => {
    return (
      <Select
        className="min-w-[200px] relative w-full h-10 text-black"
        // value={selectedTechnology}
        // onChange={(value) =>
        //   handleSelectChange(value, "selectedTechnology", Number(rowId))
        // }
        options={interestOptions}
      />
    );
  };

  const InterestDropdown = () => {
    return <div>yo</div>;
  };

  const handleFormSubmission = async (): Promise<boolean> => {
    // @Todo replace the mock data
    const { data } = await axios.post(
      `${environmentalVariables.backend}home/grad/form/`,
      [
        { interest: 1, experience: 2, skill_id: 16, graduate: 1 },
        { interest: 2, experience: 3, skill_id: 2, graduate: 1 },
        { interest: 4, experience: 1, skill_id: 3, graduate: 1 },
        { interest: 4, experience: 5, skill_id: 4, graduate: 1 },
        { interest: 4, experience: 2, skill_id: 5, graduate: 1 },
      ],
      {
        headers: {
          AUTHORIZATION: authStore.authToken,
        },
      }
    );

    console.log(data);

    if (data.status === true) {
      toast.success("Form saved to database!")
      return true;
    } else {
      toast.error("Form failed to deliver...")
      return false;
    }
  };

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getAllSkills = async () => {
      axios
        .get(`${environmentalVariables.backend}home/skill/`, {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        })
        .then((response) => {
          const data = response.data.data;

          let newAllSkills: any[] = [];

          data.forEach(({ id, skill_name }: any) => {
            newAllSkills.push({ value: id, label: skill_name });
          });

          setAllSkills(newAllSkills);
        });
    };

    const getFormList = async () => {
      axios
        .get(`${environmentalVariables.backend}home/grad/form/`, {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        })
        .then((response) => {
          const data = response.data.data.form_information;
          console.log(data);

          if (data === undefined) {
            toast.error("Data undefined");
            return;
          }

          data.forEach(
            (
              { Form_id, Skill_id, skill_name, Interest, Experience }: any,
              idx: number
            ) => {
              setSelectedData((prevSelectedData) => ({
                ...prevSelectedData,
                [idx]: {
                  selectedExperience: Experience,
                  selectedInterest: Interest,
                  selectedTechnology: {
                    value: Skill_id,
                    label: skill_name,
                  },
                },
              }));
            }
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    };

    if (effectRanOnFirstLoad.current === false) {
      getAllSkills();
      getFormList();
    }

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);

  return (
    <div className="">
      <div className="overflow-x-visible relative shadow-lg rounded-sm flex wrap">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Technology
              </th>
              <th scope="col" className="py-3 px-6">
                Experience
              </th>
              <th scope="col" className="py-3 px-6">
                Interest
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(selectedData).map((rowId: string) => {
              const {
                selectedExperience,
                selectedInterest,
                selectedTechnology,
              } = selectedData[Number(rowId)];

              return (
                <tr
                  className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black dark:text-white"
                  key={rowId}
                >
                  <td className="w-full flex flex-row font-medium py-4 px-6">
                    <TechnologyDropdown
                      selectedTechnology={selectedTechnology}
                      rowId={rowId}
                    />
                    <HiOutlineTrash
                      className="ml-6 text-3xl text-red-500 duration-150 hover:text-red-700 hover:scale-125 my-auto hover:cursor-pointer"
                      onClick={() => deleteItem(Number(rowId))}
                    />
                  </td>
                  <td className="w-1/3 py-4 px-6">
                    <ExperienceDropdown />
                  </td>
                  <td className="w-1/3 py-4 px-6">
                    <InterestDropdown />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center bg-white dark:bg-gray-800">
        <button
          type="button"
          className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => addItem()}
        >
          Add New Row
        </button>
      </div>
      <div className="flex flex-row justify-center bg-white dark:bg-gray-800">
        <button
          type="button"
          className="my-5 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
          onClick={() => {
           handleFormSubmission();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PreferenceFormTable;
