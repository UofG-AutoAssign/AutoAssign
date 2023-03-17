import { FC, useEffect, useState, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Select from "react-select";
import axios from "axios";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import authStore from "../../context/authStore";
import { experienceOptions, interestOptions } from "../../constants/Options";
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
      selectedExperience: -1,
      selectedInterest: -1,
      selectedTechnology: {
        value: -1,
        label: "...",
      },
    },
  });

  // List of available skills to de displayed in a drop down
  const [allSkills, setAllSkills] = useState<any[]>([
    { value: 1, label: "Python" },
  ]);

  const [graduateIdForSubmission, setGraduateIdForSubmission] = useState<number>(-1)

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
          selectedExperience: -1,
          selectedInterest: -1,
          selectedTechnology: {
            value: -1,
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

  const ExperienceDropdown = ({
    selectedExperience,
    rowId,
  }: {
    selectedExperience: number;
    rowId: string;
  }): JSX.Element => {
    const handleSelectChange = (
      value: any,
      property: string,
      rowId: number
    ) => {
      console.log(value);

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
        value={selectedExperience}
        onChange={(value) =>
          handleSelectChange(value, "selectedExperience", Number(rowId))
        }
        options={experienceOptions}
      />
    );
  };

  const InterestDropdown = ({
    selectedInterest,
    rowId,
  }: {
    selectedInterest: number;
    rowId: string;
  }): JSX.Element => {
    const handleSelectChange = (
      value: any,
      property: string,
      rowId: number
    ) => {
      console.log(value);

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
        value={selectedInterest}
        onChange={(value) =>
          handleSelectChange(value, "selectedInterest", Number(rowId))
        }
        options={interestOptions}
      />
    );
  };

  const handleFormSubmission = async (): Promise<boolean> => {
    const postBody: {
      experience: number;
      interest: number;
      skill_id: number;
      graduate: number;
    }[] = []

    const seenTechnologies: number[] = []

    for (const rowId in selectedData) {
      const {
        selectedExperience,
        selectedInterest,
        selectedTechnology,
      } = selectedData[Number(rowId)];

      // Prevent empty fields
      if (selectedExperience === -1 || selectedInterest === -1 || selectedTechnology.label === "..." || selectedTechnology.value === -1) {
        toast.error("Make sure all fields are filled in");
        return false;
      }

      // Prevent duplicates
      if (seenTechnologies.includes(selectedTechnology.value)) {
        toast.error("No duplicate technologies are allowed");
        return false;
      }
      seenTechnologies.push(selectedTechnology.value);

      postBody.push({
        experience: (selectedExperience as any).value,
        interest: (selectedInterest as any).value,
        skill_id: selectedTechnology.value,
        graduate: graduateIdForSubmission
      })
      
    }

    console.log(postBody);

    const { data } = await axios.post(
      `${environmentalVariables.backend}home/grad/form/`,
      postBody,
      {
        headers: {
          AUTHORIZATION: authStore.authToken,
        },
      }
    );

    console.log(data);

    if (data.status === true) {
      toast.success("Form saved to database!");
      return true;
    } else {
      toast.error("Form failed to deliver...");
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

          const newAllSkills: any[] = [];

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
          const graduateId = response.data.data.grad_id;
          // console.log(data, graduateId);

          if (data === undefined) {
            toast.error("Data undefined");
            return;
          }

          setGraduateIdForSubmission(graduateId);

          data.forEach(
            (
              { Form_id, Skill_id, skill_name, Interest, Experience }: any,
              idx: number
            ) => {
              // console.log(Interest, Experience);
              // console.log(interestOptions[Interest], experienceOptions[Experience]);
              

              setSelectedData((prevSelectedData) => ({
                ...prevSelectedData,
                [idx]: {
                  selectedExperience: experienceOptions[experienceOptions.length - Experience - 1],
                  selectedInterest: interestOptions[interestOptions.length - Interest - 1],
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
      console.log("fetched")
      effectRanOnFirstLoad.current = true;
    }

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl font-medium">
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
                    <ExperienceDropdown
                      rowId={rowId}
                      selectedExperience={selectedExperience}
                    />
                  </td>
                  <td className="w-1/3 py-4 px-6">
                    <InterestDropdown
                      rowId={rowId}
                      selectedInterest={selectedInterest}
                    />
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
