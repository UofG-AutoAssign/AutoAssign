import React, { useContext, useEffect } from "react";
import AvatarBar from "../components/AvatarBar";
import LandingButton, { LandingButtonProps } from "../components/LandingButton";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import AuthContext from "../context/AuthContext";

interface Props {}

const HRhomePage: React.FC = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext?.getUserInfo();

    // Clean up later
    return () => {
    }
  }, []);

  const data: LandingButtonProps[] = [
    { title: "Manage Team", desc: "View teams", btn_color: "bg-btnColor1" },
    {
      title: "Remove Graduates",
      desc: "Remove graduate profiles from the app",
      btn_color: "bg-btnColor2",
    },
    {
      title: "Remove Managers",
      desc: "Remove manager profiles from the app",
      btn_color: "bg-btnColor3",
    },
    {
      title: "Assign Graduates",
      desc: "Manually assign graduates to teams based on their form responses",
      btn_color: "bg-btnColor4",
    },
    {
      title: "Assign Managers",
      desc: "Manually assign managers to teams based on their form responses",
      btn_color: "bg-btnColor5",
    },
    {
      title: "Auto Assign",
      desc: "Remove manager profiles from the app",
      btn_color: "bg-btnColor6",
    },
    {
      title: "Create Account",
      desc: "Create a new account for a graduate, manager, or HR employee",
      btn_color: "bg-btnColor7",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 m-5">
        {data.map((e) => {
          return (
            <LandingButton
              key={e.title}
              title={e.title}
              desc={e.desc}
              btn_color={e.btn_color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HRhomePage;
