import React, { useContext } from "react";
import AvatarBar from "../components/AvatarBar";
import LandingButtonLink, { LandingButtonLinkProps } from "../components/LandingButtonLink";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import AuthContext from "../context/AuthContext";

interface GraduatePageProps {}

const GraduatePage: React.FC<GraduatePageProps> = () => {
  const authContext = useContext(AuthContext);

  const data: LandingButtonLinkProps[] = [
    {
      title: "Form",
      desc: "Submit this form to learn more about team preferences.",
      btn_color: "bg-btnColor1",
      link: "preference_page",
    },
    {
      title: "Your Team",
      desc: "View Team.",
      btn_color: "bg-btnColor2",
      link: "graduate",
    },
    {
      title: "Roles",
      desc: "Learn more about the roles in general.",
      btn_color: "bg-btnColor3",
      link: "graduate",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <div>
        <div className="text-5xl text-center text-blue-900">Hi! {authContext?.username}</div>
      </div>
      <div className="p-16 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
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
    </div>
  );
};

export default GraduatePage;
