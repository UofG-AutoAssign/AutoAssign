import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { observer } from "mobx-react";
import { assign } from "mobx/dist/internal";
import React, { FC, Fragment, useState } from "react";
import AvatarBar from "../components/AvatarBar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import themeStore from "../context/themeStore";
import { ManagerTableType } from "./ManagerTeamPage";

export type initialComponent =
  | "Teams"
  | "Assign Graduate"
  | "Remove Graduate"
  | "Assign Manager"
  | "Remove Manager";
("Create Account");

interface HRManagePageProps {
  initialState: initialComponent;
}

const HRManagePage: FC<HRManagePageProps> = ({ initialState }) => {
  const [currentTab, setCurrentTab] = useState<
    | "Teams"
    | "Assign Graduate"
    | "Remove Graduate"
    | "Assign Manager"
    | "Remove Manager"
    | "Create Account"
  >(initialState);
  // console.log(initialState);

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

  const swapYear = (gradEmail: string, currentYear: number): void => {
    if (currentYear === 1) {
      // remove person from year 1
      // update year 1 list
      let yearOneDummy = [...yearOneGrads].filter((grad) => grad !== gradEmail);
      setYearOneGrads(yearOneDummy);
      // add person to year 2
      let yearTwoDummy = [...yearTwoGrads];
      yearTwoDummy.push(gradEmail);
      setYearTwoGrads(yearTwoDummy);
    } else if (currentYear === 2) {
      // remove person from year 2
      // update year 2 list
      let yearTwoDummy = [...yearTwoGrads].filter((grad) => grad !== gradEmail);
      setYearTwoGrads(yearTwoDummy);
      // add person to year 1
      let yearOneDummy = [...yearOneGrads];
      yearOneDummy.push(gradEmail);
      setYearOneGrads(yearOneDummy);
    } else {
      console.warn("You should not be here");
    }
  };

  const shiftYear = (): void => {
    // add all year 1s to year 2s
    let yearTwoDummy = [...yearTwoGrads];
    for (let i = 0; i < yearOneGrads.length; i++) {
      yearTwoDummy.push(yearOneGrads[i]);
    }
    setYearTwoGrads(yearTwoDummy);

    //remove all year 1s
    setYearOneGrads([]);
  };

  const teamTable = (): JSX.Element => {
    return (
      <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap w-full">
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

  const confirmGraduateToTeamModalId3: string = "confirm-graduate3";

  const assignManager = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5">
        <div className="mb-7 text-black dark:text-white">
          Type the graduates email and the specific team you want to move them
          to.
        </div>
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Graduate email
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="graduate@email.com"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Team & Department
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. Cyber Security"
                required
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor={confirmGraduateToTeamModalId3}
              className="btn my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Assign
            </label>

            <input
              type="checkbox"
              id={confirmGraduateToTeamModalId3}
              className="modal-toggle"
            />
            {/* <button
              type="button"
              className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Assign
            </button> */}
            {reassureModal3()}
          </div>
        </form>
      </div>
    );
  };

  const confirmGraduateToTeamModalId2: string = "confirm-graduate2";

  const removeManager = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5 ">
        <div className="mb-7 text-black dark:text-white">
          Type the managers email and delete their account permanently.
        </div>
        <form>
          <div className="flex flex-col justify-center items-center">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Manager email
            </label>
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

              {reassureModal()}
            </div>
          </div>
        </form>
      </div>
    );
  };

  const removeGraduate = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5">
        <div className="mb-7 text-black dark:text-white">
          Type the graduates email and delete their account permanently.
        </div>
        <form>
          <div className="flex flex-col justify-center items-center">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Graduate email
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="graduate@email.com                         "
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

              {reassureModal()}
            </div>
          </div>
        </form>
      </div>
    );
  };

  const confirmGraduateToTeamModalId: string = "confirm-graduate";

  const assignGraduate = (): JSX.Element => {
    return (
      <div className="w-3/4 pr-5">
        <div className="mb-7 text-black dark:text-white">
          Type the graduates email and the specific team you want to move them
          to.
        </div>
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Graduate email
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="graduate@email.com"
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Team & Department
              </label>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. Cyber Security"
                required
              ></input>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor={confirmGraduateToTeamModalId2}
              className="btn my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </label>

            <input
              type="checkbox"
              id={confirmGraduateToTeamModalId2}
              className="modal-toggle"
            />
            {/* <button
              type="button"
              className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Assign
            </button> */}
            {reassureModal2()}
          </div>
        </form>
      </div>
    );
  };

  const Table = ({
    gradList,
    yearNumber,
  }: {
    gradList: string[];
    yearNumber: number;
  }): JSX.Element => {

    return (
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg h-96 w-96 overflow-y-scroll">
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
              gradList.map((gradName) => {
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

  const createAccount = (): JSX.Element => {
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

        <div className="flex flex-row gap-5">
          <div>
            Year 1
            <Table gradList={yearOneGrads} yearNumber={1} />
          </div>
          <div>
            Year 2
            <Table gradList={yearTwoGrads} yearNumber={2} />
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

  const displayComponent = (): JSX.Element => {
    if (currentTab === "Teams") {
      return teamTable();
    }
    if (currentTab === "Assign Graduate") {
      return assignGraduate();
    }
    if (currentTab === "Remove Graduate") {
      return removeGraduate();
    }
    if (currentTab === "Assign Manager") {
      return assignManager();
    }
    if (currentTab === "Remove Manager") {
      return removeManager();
    }
    if (currentTab === "Create Account") {
      return createAccount();
    }
    return <div>yooo</div>;
  };

  const reassureModal = (): JSX.Element => {
    function classNames(...classes: any) {
      return classes.filter(Boolean).join(" ");
    }

    return (
      <>
        <div className="modal z-50 overflow-y-auto">
          <div className="modal-box flex flex-col bg-white dark:bg-gray-600">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Are you Sure?{" "}
            </h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="py-4 text-black dark:text-white">
                  Are you sure that you want to delete [member]?{" "}
                </span>
              </label>
            </div>

            <div className="modal-action">
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-gray-200 text-black shadow-lg"
              >
                Cancel
              </label>
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-red-700 text-white"
              >
                Yes, I'm sure
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const reassureModal2 = (): JSX.Element => {
    function classNames(...classes: any) {
      return classes.filter(Boolean).join(" ");
    }

    return (
      <>
        <div className="modal z-50 overflow-y-auto">
          <div className="modal-box flex flex-col bg-white dark:bg-gray-600">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Are you Sure?{" "}
            </h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="py-4 text-black dark:text-white">
                  Are you sure that you want to submit [member]?{" "}
                </span>
              </label>
            </div>

            <div className="modal-action">
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-gray-200 text-black shadow-lg"
              >
                Cancel
              </label>
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-blue-800 text-white"
              >
                Yes, I'm sure
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const reassureModal3 = (): JSX.Element => {
    function classNames(...classes: any) {
      return classes.filter(Boolean).join(" ");
    }

    return (
      <>
        <div className="modal z-50 overflow-y-auto">
          <div className="modal-box flex flex-col bg-white dark:bg-gray-600">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Are you Sure?{" "}
            </h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="py-4 text-black dark:text-white">
                  Are you sure that you want to Assign [member]?{" "}
                </span>
              </label>
            </div>

            <div className="modal-action">
              <label
                htmlFor={confirmGraduateToTeamModalId3}
                className="btn bg-gray-200 text-black shadow-lg"
              >
                Cancel
              </label>
              <label
                htmlFor={confirmGraduateToTeamModalId3}
                className="btn bg-blue-800 text-white"
              >
                Yes, I'm sure
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div className="hi-text dark:text-white">
        {currentTab}
      </div>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl">
          <button
            onClick={() => setCurrentTab("Teams")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Manage Teams
          </button>
          <button
            onClick={() => setCurrentTab("Assign Graduate")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Assign Graduate
          </button>
          <button
            onClick={() => setCurrentTab("Remove Graduate")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Remove Graduate
          </button>
          <button
            onClick={() => setCurrentTab("Assign Manager")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Assign Manager
          </button>
          <button
            onClick={() => setCurrentTab("Remove Manager")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Remove Manager
          </button>
          <button
            onClick={() => setCurrentTab("Create Account")}
            type="button"
            className="w-full border-white border-b-2 rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Create Account
          </button>
        </div>
        {displayComponent()}
        {reassureModal()}
      </section>
    </div>
  );
};

export default HRManagePage;
