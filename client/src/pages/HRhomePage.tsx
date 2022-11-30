import React from "react";
import AvatarBar from "../components/AvatarBar";
import LandingButton, { LandingButtonProps } from "../components/LandingButton";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

interface Props {}

const HRhomePage: React.FC = () => {
  const data: LandingButtonProps[] = [
    {
      title: "Manage Team",
      desc: "View teams",
      btn_color: "bg-btnColor1",
      link: "hr",
    },
    {
      title: "Remove Graduates",
      desc: "Remove graduate profiles from the app",
      btn_color: "bg-btnColor2",
      link: "hr",
    },
    {
      title: "Remove Managers",
      desc: "Remove manager profiles from the app",
      btn_color: "bg-btnColor3",
      link: "hr",
    },
    {
      title: "Assign Graduates",
      desc: "Manually assign graduates to teams based on their form responses",
      btn_color: "bg-btnColor4",
      link: "hr",
    },
    {
      title: "Assign Managers",
      desc: "Manually assign managers to teams based on their form responses",
      btn_color: "bg-btnColor5",
      link: "hr",
    },
    {
      title: "Auto Assign",
      desc: "Remove manager profiles from the app",
      btn_color: "bg-btnColor6",
      link: "hr",
    },
    {
      title: "Create Account",
      desc: "Create a new account for a graduate, manager, or HR employee",
      btn_color: "bg-btnColor7",
      link: "hr",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="text-5xl text-center text-blue-900 m-5">Hi! Naral</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((e) => {
          return (
            <LandingButton
              title={e.title}
              desc={e.desc}
              btn_color={e.btn_color}
              link={e.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HRhomePage;
