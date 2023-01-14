import React, { useContext } from "react";
import AvatarBar from "../components/AvatarBar";
import LandingButtonLink, { LandingButtonLinkProps } from "../components/LandingButtonLink";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import AuthContext from "../context/AuthContext";

interface Props {}

const ManagerPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  const data: LandingButtonLinkProps[] = [
    {
      title: "Form",
      desc: "Submit this form to learn more about your team preferences.",
      btn_color: "bg-btnColor1",
      link: "manager",
    },
    {
      title: "Your Team",
      desc: "View your Team",
      btn_color: "bg-btnColor2",
      link: "managerTeam",
    },
    {
      title: "Roles",
      desc: "Learn more about roles here at {company_name}",
      btn_color: "bg-btnColor3",
      link: "manager",
    },
    
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="text-5xl text-center text-blue-900 m-5">Hi! {authContext?.username}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((e) => {
          return (
            <LandingButtonLink
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

export default ManagerPage;
