import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useContext, useState } from "react";
import AvatarBar from "../components/AvatarBar";
import LandingButtonLink, { LandingButtonLinkProps } from "../components/LandingButtonLink";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import AuthContext from "../context/AuthContext";
import LandingButtonModal from "../components/LandingButtonModal";

interface Props {}

const HRhomePage: React.FC = () => {
  const authContext = useContext(AuthContext);

  const data: LandingButtonLinkProps[] = [
    {
      title: "Manage Team",
      desc: "View teams",
      btn_color: "bg-btnColor1",
      link: "hr_manage",
      initialState: "Teams"
    },
    {
      title: "Remove Graduates",
      desc: "Remove graduate profiles from the app",
      btn_color: "bg-btnColor2",
      link: "hr_manage",
      initialState: "Remove Graduate",
    },
    {
      title: "Remove Managers",
      desc: "Remove manager profiles from the app",
      btn_color: "bg-btnColor3",
      link: "hr_manage",
      initialState: "Remove Manager"
    },
    {
      title: "Assign Managers",
      desc: "Manually assign managers to teams based on their form responses",
      btn_color: "bg-btnColor5",
      link: "hr_manage",
      initialState: "Assign Manager"
    },
    {
      title: "Assign Graduates",
      desc: "Manually assign graduates to teams based on their form responses",
      btn_color: "bg-btnColor4",
      link: "hr_manage",
      initialState: "Assign Graduate"
    },
    {
      title: "Create Account",
      desc: "Create a new account for a graduate, manager, or HR employee",
      btn_color: "bg-btnColor7",
      link: "hr",
      initialState: "Teams"
    },
  ];

  const assignGradModalId: string = "assign-grad";

  const assignGradModal = (): JSX.Element => {
    const listOfYears: string[] = ["2020", "2021", "2022"];
    const [selectedYear, setSelectedYear] = useState<string>("Select Year");

    function classNames(...classes: any) {
      return classes.filter(Boolean).join(" ");
    }

    return (
      <div className="modal overflow-y-clip">
        <div className="modal-box flex flex-col bg-white">
          <h3 className="font-bold text-lg text-black">Assign Graduates</h3>
          <div className="flex flex-row gap-2 justify-between">
            <div className="form-control max-w-xs w-full ">
              <input
                type="text"
                placeholder="Select Year"
                className="input input-bordered w-full max-w-xs bg-gray-50 text-black"
                value={selectedYear}
              />
              <label className="label"></label>
            </div>
            <Menu as="div" className="relative inline-block text-left h-1 ">
              <div>
                <Menu.Button className="inline-flex w-full  justify-center rounded-md border  border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                  Select Year
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-50 absolute right-2 mt-2 w-56  overflow-visible origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {listOfYears.map((year) => {
                      return (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setSelectedYear(year)}
                              type="submit"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full px-4 py-2 text-left text-sm"
                              )}
                            >
                              {year}
                            </button>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="flex flex-row gap-3">
            <input type="checkbox" className="checkbox bg-gray-200" />
            <div className="text-black">All Years</div>
          </div>
          <div className="modal-action">
            <label
              htmlFor={assignGradModalId}
              className="btn bg-gray-200 text-black"
            >
              59/79 response
            </label>
            <label
              htmlFor={assignGradModalId}
              className="btn bg-blue-700 text-white"
            >
              Assign Graduates ✓
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="text-5xl text-center text-blue-900 m-5">
          Hi! {authContext?.username}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((e) => {
          return (
            <LandingButtonLink
              title={e.title}
              desc={e.desc}
              btn_color={e.btn_color}
              link={e.link}
              initialState={e.initialState}
              key={e.title}
            />
          );
        })}
        <LandingButtonModal
          title="Auto Assign"
          btn_color="bg-btnColor6"
          desc="Remove manager profiles from the app"
          modal={assignGradModal()}
          modalId={assignGradModalId}
        />
        
      </div>
    </div>
  );
};

export default HRhomePage;
