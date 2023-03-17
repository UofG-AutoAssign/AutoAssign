import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { departmentAndTeamListHRType } from "./AllTeamsTable";
import { FcDepartment } from "react-icons/all";
import { AiOutlineTeam, AiOutlineMail, AiOutlineSetting } from "react-icons/ai";

const IndividualTeamTable: FC<{
  departmentAndTeamListHR: departmentAndTeamListHRType;
}> = ({ departmentAndTeamListHR }) => {
  const {
    capacity,
    departmentName,
    managerEmail,
    maxCapacity,
    teamName,
    teamMembers,
  } = departmentAndTeamListHR;

  return (
    <div className="w-full min-w-min rounded-2xl bg-white p-2 dark:bg-gray-800">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-loginBlue px-4 py-2 text-left text-sm font-medium  text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-100 focus-visible:ring-opacity-75 dark:text-white">
              <span>
                <div className="text-xl font-black flex flex-row">
                  <FcDepartment className="w-5 h-5 pt-1" />
                  <div>{departmentName}</div>
                </div>

                <div className="font-black flex flex-row ">
                  <AiOutlineTeam className="w-5 h-5 " /> {teamName}
                </div>

                <div className=" flex flex-row font-black">
                  <AiOutlineMail className="w-5 h-5" /> Manager Email:
                  <div className="font-normal">&nbsp;{managerEmail}</div>
                </div>

                <div className=" font-black flex flex-row">
                  <AiOutlineSetting className="w-5 h-5" />
                  Capacity:&nbsp;{capacity}/{maxCapacity}
                </div>
              </span>
              <ChevronUpIcon
                className={`${open
                  ? "rotate-180 transform duration-150"
                  : "hue-rotate-60 transform duration-150"
                  } h-5 w-5   text-black`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              className="pt-4 pb-2 text-sm text-gray-500 mx-auto w-full"
              unmount={false}
            >
              <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <div className="relative flex overflow-x-visible rounded-sm shadow-lg wrap w-full">
                  <div className="grid grid-cols-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <div className="px-6 py-3 font-black">Name</div>
                    <div className="px-6 py-3 font-black">Email</div>
                    {teamMembers.length === 0 ? (
                      <Fragment>
                        <div className="px-6 py-4 border-b">Empty</div>
                        <div className="px-6 py-4 border-b">Empty</div>
                      </Fragment>
                    ) : (
                      teamMembers.map(({ grad_id, grad_name, grad_email }) => (
                        <Fragment key={grad_id}>
                          <div className="px-6 py-4 border-b">{grad_name}</div>
                          <div className="px-6 py-4 border-b">{grad_email}</div>
                        </Fragment>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col items-center bg-white dark:bg-gray-800">
                    <form>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                      </div>
                    </form>
                  </div>
                </div>
              </Transition>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default IndividualTeamTable;
