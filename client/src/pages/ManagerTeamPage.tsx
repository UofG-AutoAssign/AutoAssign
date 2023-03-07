import Navbar from "../components/Navbar";
import { FC, useEffect, useRef, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemInterface } from "../constants/Interfaces";
import { initialComponentManager } from "../constants/Types";
import axios from "axios";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import authStore, { returnType } from "../context/authStore";
import Select from "react-select";
import { toast } from "react-toastify";
import { selectedDataType } from "../components/PreferenceFormTable";

const ManagerTeamPage: FC<{ initialState: initialComponentManager }> = ({
  initialState,
}) => {
  const [currentTab, setCurrentTab] =
    useState<initialComponentManager>(initialState);

  const navigate = useNavigate();
  let location = useLocation();

  const [subordinateList, setSubordinateList] = useState<
    {
      name: string;
      email: string;
    }[]
  >([{ name: "...", email: "..." }]);

  // List of available skills to de displayed in a drop down
  const [allSkills, setAllSkills] = useState<any[]>([
    { value: 1, label: "Python" },
  ]);

  const [selectedData, setSelectedData] = useState<{
    [rowId: number]: {
      value: number;
      label: string;
    };
  }>({
    0: {
      value: 0,
      label: "...",
    },
  });

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
          value: 0,
          label: "...",
        },
      };
    });

    setCurRowId((prevRowId) => prevRowId + 1);
  };

  const [sliderValue, setSliderValue] = useState<string>("50");

  const TeamTable = (): JSX.Element => {
    return (
      <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team Members
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {subordinateList.map(({ name, email }, idx) => (
              <tr
                className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={idx}
              >
                <th
                  scope="row"
                  className="flex flex-row px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {name}
                </th>
                <td className="px-6 py-4">{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
          [property]: value
        },
      }));
    };

    return (
      <Select
        className="min-w-[200px] relative w-full h-10 text-black"
        value={selectedTechnology}
        onChange={(value) => {          
          handleSelectChange(value, "selectedTechnology", Number(rowId))
        }
      }
        options={allSkills}
      />
    );
  };

  const SettingsTable = (): JSX.Element => {
    return (
      <div>
        <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Technology
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(selectedData).map((rowId: string) => {
                const selectedTechnology = selectedData[Number(rowId)];

                return (
                  <tr
                    className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={rowId}
                  >
                    <th
                      scope="row"
                      className="flex flex-row justify-between px-6 py-4 font-medium text-black whitespace-nowrap"
                    >
                      <TechnologyDropdown
                        rowId={rowId}
                        selectedTechnology={selectedTechnology}
                      />
                      <HiOutlineTrash
                        className="text-3xl text-red-500 duration-150 hover:text-red-700 hover:scale-150 my-auto mx-5 hover:cursor-pointer"
                        onClick={() => deleteItem(Number(rowId))}
                      />
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center bg-white dark:bg-gray-800">
          <button
            type="button"
            className="mb-10 hover:scale-110 transition-all duration-150 my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => addItem()}
          >
            Add New Row
          </button>
        </div>
      </div>
    );
  };

  const PreferenceSlider = (): JSX.Element => {
    return (
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <input
          onChange={(e) => setSliderValue(e.target.value)}
          id="minmax-range"
          type="range"
          min="0"
          max="100"
          step="25"
          defaultValue={sliderValue}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        ></input>
        <div className="flex flex-col justify-between w-full px-2 text-xs bg-white dark:bg-gray-800">
          <div className="flex flex-row justify-between w-full ">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
          <div className="flex flex-row justify-between w-full">
            <span>Prioritise Skill</span>
            <span>Prioritise Enthusiasm</span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const query = location.pathname.split("/").at(-1);

    if (query === "view_team") setCurrentTab("Your Team");
    else if (query === "team_preference") setCurrentTab("Team Preference");
    else setCurrentTab("Your Team");

    () => {};
  }, [location]);

  const handleTeamPreferenceSave = async (): Promise<boolean> => {
    const sliderValueMap: {
      [key: string]: number;
    } = {
      "0": 0,
      "25": 0.25,
      "50": 0.5,
      "75": 0.75,
      "100": 1,
    };

    // @Todo replace this with real data
    const { data } = await axios.put(
      `${environmentalVariables.backend}home/man/Team/UpdateSetting/`,
      {
        ratio: sliderValueMap[sliderValue],
        skill: [1, 7, 12, 5],
      },
      {
        headers: {
          AUTHORIZATION: authStore.authToken,
        },
      }
    );

    console.log(data);

    return data.status;
  };

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getSubordinateInfo = async () => {
      axios
        .get(`${environmentalVariables.backend}home/man/Team`, {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        })
        .then((response) => {
          const subordinateList = response.data.data;
          
          let newSubordinateList: any[] = [];

          subordinateList.forEach((member: any) => {
            newSubordinateList.push({
              name: `${member.first_name} ${member.second_name}`,
              email: member.email,
            });
          });

          setSubordinateList(newSubordinateList);
        });
    };

    const getTeamPreferenceInfo = async () => {
      axios
        .get(`${environmentalVariables.backend}home/man/Team/setting/`, {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        })
        .then((response) => {
          const { team_name, ratio, skill_information } = response.data.data;
          console.log(team_name, ratio, skill_information);

          // @Todo display team name

          if (ratio !== null) {
            if (ratio === 0) setSliderValue("0");
            if (ratio === 1) setSliderValue("25");
            if (ratio === 2) setSliderValue("50");
            if (ratio === 3) setSliderValue("75");
            if (ratio === 4) setSliderValue("100");
          }

          console.log(skill_information);

          // @Todo fix this
          skill_information.forEach(
            ({ Form_id, Skill_id, skill_name }: any, idx: number) => {
              setSelectedData((prevSelectedData) => ({
                ...prevSelectedData,
                [curRowId]: {
                  value: Skill_id,
                  label: skill_name,
                },
              }));

              setCurRowId((prevRowId) => prevRowId + 1);
            }
          );
        });
    };

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

    if (effectRanOnFirstLoad.current === false) {
      getSubordinateInfo();
      getTeamPreferenceInfo();
      getAllSkills();
    }

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="hi-text dark:text-white">Your Team</div>
        {currentTab !== "Your Team" && (
          <div className="flex flex-row items-center justify-center gap-5">
            <div className="hi-text dark:text-white text-xl">
              Choose the what technologies your team would use.
            </div>
            <button
              type="button"
              className="my-4 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
              onClick={() => {
                handleTeamPreferenceSave()
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl h-fit">
          <button
            onClick={() => {
              navigate("/manager/team/view_team");
            }}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Your Team
          </button>
          <button
            onClick={() => {
              navigate("/manager/team/team_preference");
            }}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Team Settings
          </button>
        </div>

        <div className="w-3/4 pr-5">
          <div className="bg-white rounded-2xl">
            {currentTab === "Your Team" ? (
              <TeamTable />
            ) : (
              <div className="">
                <SettingsTable />
                <PreferenceSlider />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagerTeamPage;
