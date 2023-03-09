import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateEmailField from "../components/CreateGraduateEmailField";
import AssignGraduate from "../components/HRManage/AssignGraduate";
import AssignManager from "../components/HRManage/AssignManager";
import DeleteTeam from "../components/HRManage/DeleteTeam";
import RemoveGraduate from "../components/HRManage/RemoveGraduate";
import RemoveManager from "../components/HRManage/RemoveManager";
import UnassignedGraduateTable from "../components/HRManage/UnassignedGraduatesTable";
import Navbar from "../components/Navbar";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import { confirmGraduateToTeamModalId2 } from "../constants/ModalIDs";
import { initialComponentHR } from "../constants/Types";
import authStore from "../context/authStore";


export type gradType = {
  id: number;
  email: string;
  first_name: string;
  second_name: string;
};

export type teamAndDepartmentType = {
  team_name: string;
  team_id: number;
  team_information: {
    Dep_name: string;
    dep_id: number;
    first_name: string;
    man_email: string;
    man_id: number;
    second_name: string;
  };
};

export type managerType = gradType;

const HRManagePage: FC<{ initialState: initialComponentHR }> = ({
  initialState,
}) => {
  const [currentTab, setCurrentTab] =
    useState<initialComponentHR>(initialState);

  const [managerList, setManagerList] = useState<managerType[]>([
    { email: "...", first_name: "...", id: 0, second_name: "..." },
  ]);

  const [allGradList, setAllGradList] = useState<gradType[]>([
    { email: "...", first_name: "...", id: 0, second_name: "..." },
  ]);

  const [teamAndDepartmentList, setTeamAndDepartmentList] = useState<
    teamAndDepartmentType[]
  >([
    {
      team_name: "...",
      team_id: 0,
      team_information: {
        dep_id: 0,
        Dep_name: "...",
        first_name: "...",
        man_email: "...",
        man_id: 0,
        second_name: "...",
      },
    },
  ]);

  const [yearOneGrads, setYearOneGrads] = useState<string[]>([
    "bob@barclays.com",
    "jack@barclays.com",
    "johnathon@barclays.com",
    "hana@barclays.com",
    "chris@barclays.com",
    "johny@barclays.com",
    "michael@barclays.com",
    "thompson@barclays.com",
    "joey@barclays.com",
  ]);
  const [yearTwoGrads, setYearTwoGrads] = useState<string[]>([
    "sam@barclays.com",
    "dequan@barclays.com",
  ]);

  // Swaps the graduate to the other year table
  const swapYear = (gradEmail: string, currentYear: number): void => {
    if (currentYear === 1) {
      let yearOneDummy = [...yearOneGrads].filter((grad) => grad !== gradEmail);
      setYearOneGrads(yearOneDummy);

      let yearTwoDummy = [...yearTwoGrads];
      yearTwoDummy.push(gradEmail);
      setYearTwoGrads(yearTwoDummy);
    } else if (currentYear === 2) {
      let yearTwoDummy = [...yearTwoGrads].filter((grad) => grad !== gradEmail);
      setYearTwoGrads(yearTwoDummy);

      let yearOneDummy = [...yearOneGrads];
      yearOneDummy.push(gradEmail);
      setYearOneGrads(yearOneDummy);
    } else {
      console.warn("You should not be here");
    }
  };

  // add all year 1s to year 2s
  const shiftYear = (): void => {
    let yearTwoDummy = [...yearTwoGrads];
    for (let idx = 0; idx < yearOneGrads.length; idx++) {
      yearTwoDummy.push(yearOneGrads[idx]);
    }
    setYearTwoGrads(yearTwoDummy);

    //remove all year 1s
    setYearOneGrads([]);
  };

  // Displays the managers team members
  const TeamTable = (): JSX.Element => {
    return (
      <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap w-3/4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team & Department
              </th>
              <th scope="col" className="px-6 py-3">
                Manager Email
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
              {
                team_department: "Team 1 - Cyber Security",
                manager_email: "Jack@yahoo.com",
              },
            ].map(({ team_department, manager_email }, idx) => (
              <tr
                className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={idx}
              >
                <th
                  scope="row"
                  className="flex flex-row px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {team_department}
                </th>
                <td className="px-6 py-4">{manager_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Creates a table of graduates in a specific year
  const GradListTable = ({
    gradList,
    yearNumber,
  }: {
    gradList: string[];
    yearNumber: number;
  }): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredPeople =
      query === ""
        ? gradList
        : gradList.filter((gradName) => {
          return gradName.toLowerCase().includes(query.toLowerCase());
        });

    return (
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg h-96 w-96 overflow-y-scroll">
        <input
          className="w-full border-none my-2 pl-5 pr-10 font-semibold text-left text-sm leading-5 text-black dark:text-white focus:ring-0 bg-gray-100 dark:bg-gray-700"
          type={"text"}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={"Search Names"}
        />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
          <tbody>
            {gradList.length === 0 ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-400 whitespace-nowrap dark:text-white"
                >
                  Empty
                </th>
                <td className="py-4 px-6 text-right">
                  <a
                    href="#"
                    className="invisible font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    swap
                  </a>
                </td>
              </tr>
            ) : (
              filteredPeople.map((gradName) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {gradName}
                    </th>
                    <td className="py-4 px-6 text-right">
                      <div
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => swapYear(gradName, yearNumber)}
                      >
                        swap
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const ManagerListTable = ({
    managerList,
  }: {
    managerList: string[];
  }): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredPeople =
      query === ""
        ? managerList
        : managerList.filter((managerName) => {
          return managerName.toLowerCase().includes(query.toLowerCase());
        });

    return (
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg h-96 w-96 overflow-y-scroll">
        <input
          className="w-full border-none my-2 pl-5 pr-10 font-semibold text-left text-sm leading-5 text-black dark:text-white focus:ring-0 bg-gray-100 dark:bg-gray-700"
          type={"text"}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={"Search Names"}
        />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
          <tbody>
            {managerList.length === 0 ? (
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

  // Displays the year 1 and 2 graduates in tables, a button to shift all years, and save
  const CreateAccount = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5 flex flex-col items-center">
        <label
          htmlFor="Type the graduate emails to create their account"
          className="w-full block mb-2 text-gray-900 dark:text-white"
        >
          Type the graduate email(s) to create their account
        </label>
        <CreateEmailField createEmailFor="Graduates" />
        <div className="flex flex-col lg:flex-row gap-5 px-10">
          <div>
            Year 1
            <GradListTable gradList={yearOneGrads} yearNumber={1} />
          </div>
          <div>
            Year 2
            <GradListTable gradList={yearTwoGrads} yearNumber={2} />
          </div>
        </div>
        <div className="py-8">
          <button
            type="button"
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
            onClick={shiftYear}
          >
            Shift Year 1 Grads to Year 2 Grads
          </button>
        </div>
        <button
          type="button"
          className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
        >
          Save
        </button>
      </div>
    );
  };

  const CreateManagerAccount = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5 flex flex-col items-center">
        <label
          htmlFor="Type the manager emails to create their account"
          className="w-full block mb-2 text-gray-900 dark:text-white"
        >
          Type the managers email(s) to create their account
        </label>
        <CreateEmailField createEmailFor="Managers" />
        <div className="flex flex-col lg:flex-row gap-5 px-10">
          <div>
            Managers
            <ManagerListTable managerList={managerList.map((manager) => manager.email)} />
          </div>
        </div>
      </div>
    );
  };

  const AutoAssign = (): JSX.Element => {

    const [gradsCreated, setGradsCreated] = useState<number>(10);
    const [teamCapacity, setTeamCapacity] = useState<number>(2);

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }

    function openModal() {
      setIsOpen(true)
    }

    const handleAutoAssign = async (): Promise<boolean> => {
      try {

        if (teamCapacity < gradsCreated) {
          toast.warning("Not enough capacity")
          return false;
        }
        // @Todo run assignment algorithm
        const { data } = await axios.post(
          `${environmentalVariables.backend}home/hr/REPLACE_LATER`,
          {
            headers: {
              AUTHORIZATION: authStore.authToken,
            },
          }
        );
        console.log(data);

        if (data.status === true) {
          toast.success("Teams successfully assigned!");
          return true;
        } else {
          toast.error(`Failed assign graduates: ${data.status}`);
          return false;
        }
      } catch (error) {
        console.log(error);
        toast.error(`Failed to send request`);
        return false;
      }
    };

    return (
      <div className="w-3/4 pr-5 flex flex-col items-center">
        <div className="py-8 flex flex-row justify-between">
          <div className="flex flex-col  w-96">
            <label
              htmlFor="Total Team Capacity : "
              className="w-full block mb-2 text-gray-900 dark:text-white"
            >
              Total Grads Created : {gradsCreated}
            </label>

            <label
              htmlFor="Total Team Capacity : "
              className="w-full block mb-2 text-gray-900 dark:text-white"
            >
              Total Team Capacity : {teamCapacity}
            </label>
          </div>
          <div className="flex flex-col w-96">
            <button
              type="button"
              //htmlFor={confirmGraduateToTeamModalId2}
              onClick={openModal}
              className={`text-white ${teamCapacity >= gradsCreated ? 'bg-green-500' : 'bg-red-500'} ${teamCapacity >= gradsCreated ? 'hover:bg-green-800' : 'hover:bg-red-800'} focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150 w-96`}
            //disabled={teamCapacity >= gradsCreated ? false : true}
            >
              AUTO ASSIGN

            </button>
            {/* <AutoAssignModal handleAutoAssign={handleAutoAssign} /> */}
            <label className="break-words text-center dark:text-white" >{teamCapacity >= gradsCreated ? 'Ready To assign' : 'Warning! team capacity is too low, graduates will be left unassigned'} </label>

          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Assign Teams?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {teamCapacity >= gradsCreated ? 'Are you sure you want to assign teams? This action can not be reversed.' : 'team capacity is too low, some graduates will be left unassigned.  This action cannot be undone'}

                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className={`inline-flex justify-center rounded-md border border-transparent  ${teamCapacity >= gradsCreated ? "bg-blue-600" : "bg-red-500"}  px-4 py-2 text-sm font-medium text-white ${teamCapacity >= gradsCreated ? "hover:bg-blue-200" : "hover:bg-red-800"} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                          onClick={() => {
                            handleAutoAssign();
                            setIsOpen(false);
                          }}
                        >
                          {teamCapacity >= gradsCreated ? "Assign Teams" : "Assign Anyway"}
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 px-10">
          <div>
            Unassigned Graduates
            <UnassignedGraduateTable graduateList={yearOneGrads} />
          </div>
          <div>
            Unassigned Managers
            <ManagerListTable managerList={managerList.map((manager) => manager.email)} />
          </div>
        </div>

      </div >

    );
  };

  const DisplayComponent = (): JSX.Element => {
    if (currentTab === "Teams") {
      return <TeamTable />;
    }
    if (currentTab === "Delete Team") {
      return <DeleteTeam teamAndDepartmentList={teamAndDepartmentList} />;
    }
    if (currentTab === "Assign Graduate") {
      return (
        <AssignGraduate
          allGradList={allGradList}
          teamAndDepartmentList={teamAndDepartmentList}
        />
      );
    }
    if (currentTab === "Remove Graduate") {
      return <RemoveGraduate allGradList={allGradList} />;
    }
    if (currentTab === "Assign Manager") {
      return (
        <AssignManager
          allManagerList={managerList}
          teamAndDepartmentList={teamAndDepartmentList}
        />
      );
    }
    if (currentTab === "Remove Manager") {
      return <RemoveManager allManagerList={managerList} />;
    }
    if (currentTab === "Create Graduate Account") {
      return <CreateAccount />;
    }
    if (currentTab === "Create Manager Account") {
      return <CreateManagerAccount />;
    }
    if (currentTab === "Auto Assign") {
      return <AutoAssign />;
    }
    return <div>This component shouldn't be returned 💀</div>;
  };

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const query = location.pathname.split("/").at(-1);

    if (query === "view_team") setCurrentTab("Teams");
    else if (query === "delete_team") setCurrentTab("Delete Team");
    else if (query === "assign_graduate") setCurrentTab("Assign Graduate");
    else if (query === "remove_graduate") setCurrentTab("Remove Graduate");
    else if (query === "assign_manager") setCurrentTab("Assign Manager");
    else if (query === "remove_manager") setCurrentTab("Remove Manager");
    else if (query === "create_graduate_account")
      setCurrentTab("Create Graduate Account");
    else if (query === "create_manager_account")
      setCurrentTab("Create Manager Account");
    else if (query === "auto_assign")
      setCurrentTab("Auto Assign");
    else setCurrentTab("Teams");

    () => { };
  }, [location]);

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getAllTeamsList = async () => {
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/TeamView/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedTeamList: teamAndDepartmentType[] = data.data;
      console.log(fetchedTeamList);

      if (data.status === false) {
        toast.error("Failed to fetch departments and teams list");
        return;
      }

      setTeamAndDepartmentList(fetchedTeamList);
    };

    const getAllGradList = async () => {
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/GradView/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedGradList = data.data;
      console.log(fetchedGradList);
      setAllGradList(fetchedGradList);
    };

    const getAllManagerList = async () => {
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/ManView/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedManagerList = data.data;
      console.log(fetchedManagerList);
      setManagerList(fetchedManagerList);
    };

    const getUnassignedGraduatesList = async () => {
      // @Todo use a real endpoint !
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/GradView/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedUnassignedGradList = data.data;
      console.log(fetchedUnassignedGradList);
      setAllGradList(fetchedUnassignedGradList);
    };

    const getAllUnassignedManagersList = async () => {
      // @Todo use a real endpoint !
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/GradView/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedUnassignedManagersList = data.data;
      console.log(fetchedUnassignedManagersList);
      setAllGradList(fetchedUnassignedManagersList);
    };

    const getTeamSizes = async () => {
      // @Todo use a real endpoint !
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/hr/GradView/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      const fetchedTeamSizes = data.data;
      console.log(fetchedTeamSizes);
      setAllGradList(fetchedTeamSizes);
    };

    if (effectRanOnFirstLoad.current === false) {
      getAllTeamsList();
      getAllGradList();
      getAllManagerList();
      // @Todo send team_id to receive member list of each team
    }

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div className="hi-text dark:text-white">{currentTab}</div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl h-fit">
          <button
            onClick={() => navigate("/hr/manage/manage_team")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Manage Teams
          </button>
          <button
            onClick={() => navigate("/hr/manage/delete_team")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Delete Team
          </button>
          <button
            onClick={() => navigate("/hr/manage/assign_graduate")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Assign Graduate
          </button>
          <button
            onClick={() => navigate("/hr/manage/remove_graduate")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Remove Graduate
          </button>
          <button
            onClick={() => navigate("/hr/manage/assign_manager")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Assign Manager
          </button>
          <button
            onClick={() => navigate("/hr/manage/remove_manager")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Remove Manager
          </button>
          <button
            onClick={() => navigate("/hr/manage/create_graduate_account")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Create Graduate Account
          </button>

          <button
            onClick={() => navigate("/hr/manage/create_manager_account")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Create Manager Account
          </button>

          <button
            onClick={() => navigate("/hr/manage/auto_assign")}
            type="button"
            className="w-full border-white border-b-2 rounded-br-2xl text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            AutoAssign
          </button>
        </div>
        <DisplayComponent />
      </section>
      <div></div>
    </div>
  );
};

export default HRManagePage;
