import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AssignGraduate from "../components/HRManage/AssignGraduate";
import AssignManager from "../components/HRManage/AssignManager";
import RemoveGraduate from "../components/HRManage/RemoveGraduate";
import RemoveManager from "../components/HRManage/RemoveManager";
import Navbar from "../components/Navbar";
import { initialComponentHR } from "../constants/Types";

const HRManagePage: FC<{ initialState: initialComponentHR }> = ({
  initialState,
}) => {
  const [currentTab, setCurrentTab] =
    useState<initialComponentHR>(initialState);

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

  // Displays the year 1 and 2 graduates in tables, a button to shift all years, and save
  const CreateAccount = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5 flex flex-col items-center">
        <label
          htmlFor="Type the graduate emails to create their account"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Type the graduate email(s) to create their account
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="grad1@barclays.com, grad2@barclays.com, ..."
        ></textarea>
        <div className="py-8">
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
          >
            Create
          </button>
        </div>

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

  const DisplayComponent = (): JSX.Element => {
    if (currentTab === "Teams") {
      return <TeamTable />;
    }
    if (currentTab === "Assign Graduate") {
      return <AssignGraduate />;
    }
    if (currentTab === "Remove Graduate") {
      return <RemoveGraduate />;
    }
    if (currentTab === "Assign Manager") {
      return <AssignManager />;
    }
    if (currentTab === "Remove Manager") {
      return <RemoveManager />;
    }
    if (currentTab === "Create Account") {
      return <CreateAccount />;
    }
    return <div>This component shouldn't be returned 💀</div>;
  };

  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const query = location.pathname.split("/").at(-1);

    if (query === "view_team") setCurrentTab("Teams");
    else if (query === "assign_graduate") setCurrentTab("Assign Graduate");
    else if (query === "remove_graduate") setCurrentTab("Remove Graduate");
    else if (query === "assign_manager") setCurrentTab("Assign Manager");
    else if (query === "remove_manager") setCurrentTab("Remove Manager");
    else if (query === "create_account") setCurrentTab("Create Account");
    else setCurrentTab("Teams");

    () => {};
  }, [location]);

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
            onClick={() => navigate("/hr/manage/create_account")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Create Account
          </button>
        </div>
        <DisplayComponent />
      </section>
    </div>
  );
};

export default HRManagePage;
