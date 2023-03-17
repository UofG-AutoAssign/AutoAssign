import { FC } from "react";
import LandingButtonLink from "../components/general/LandingButtonLink";
import { LandingButtonLinkProps } from "../constants/Interfaces";
import Navbar from "../components/general/Navbar";
import authStore from "../context/authStore";

const HRHomePage: FC = () => {

  // Used for the Landing buttons for the following pages
  const data: LandingButtonLinkProps[] = [
    {
      title: "Manage Team",
      desc: "View teams",
      btn_color: "bg-btnColor1",
      link: "hr/manage/manage_team",
      initialState: "Teams",
    },
    {
      title: "Delete Team",
      desc: "Delete teams",
      btn_color: "bg-orange-300",
      link: "hr/manage/delete_team",
      initialState: "Delete Team",
    },
    {
      title: "Remove Graduates",
      desc: "Remove graduate profiles from the app",
      btn_color: "bg-btnColor2",
      link: "hr/manage/remove_graduate",
      initialState: "Remove Graduate",
    },
    {
      title: "Remove Managers",
      desc: "Remove manager profiles from the app",
      btn_color: "bg-btnColor3",
      link: "hr/manage/remove_manager",
      initialState: "Remove Manager",
    },
    {
      title: "Assign Managers",
      desc: "Manually assign managers to teams based on their form responses",
      btn_color: "bg-btnColor5",
      link: "hr/manage/assign_manager",
      initialState: "Assign Manager",
    },
    {
      title: "Assign Graduates",
      desc: "Manually assign graduates to teams based on their form responses",
      btn_color: "bg-btnColor4",
      link: "hr/manage/assign_graduate",
      initialState: "Assign Graduate",
    },
    {
      title: "Create Graduate Accounts",
      desc: "Create a new account for a graduate, manager, or HR employee",
      btn_color: "bg-btnColor7",
      link: "hr/manage/create_graduate_account",
      initialState: "Teams",
    },
    {
      title: "Create Manager Accounts",
      desc: "Create a new account for a manager, manager, or HR employee",
      btn_color: "bg-btnColor7",
      link: "hr/manage/create_manager_account",
      initialState: "Teams",
    },
    {
      title: "Auto Assign",
      desc: "Automatically assign graduates to teams based on their form responses",
      btn_color: "bg-btnColor6",
      link: "hr/manage/auto_assign",
      initialState: "Teams",
    },
  ];

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="hi-text dark:text-white">
          Hi! {authStore.userType}
        </div>
      </div>
      <div className="p-16 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* Displays all the landing buttons to take you to its respective HR page */}
          {data.map((event) => {
            return (
              <LandingButtonLink
                title={event.title}
                desc={event.desc}
                btn_color={event.btn_color}
                link={event.link}
                initialState={event.initialState}
                key={event.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;
