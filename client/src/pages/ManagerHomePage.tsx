import { FC, useContext } from "react";
import LandingButtonLink from "../components/LandingButtonLink";
import Navbar from "../components/Navbar";
import { LandingButtonLinkProps } from "../constants/Interfaces";
import AuthContext from "../context/AuthContext";

const ManagerPage: FC = () => {
  const authContext = useContext(AuthContext);

  const data: LandingButtonLinkProps[] = [
    {
      title: "Team Settings",
      desc: "Weight how much you value each technology.",
      btn_color: "bg-btnColor1",
      link: "manager/team/team_preference",
      initialState: "Teams",
    },
    {
      title: "Your Team",
      desc: "View your Team",
      btn_color: "bg-btnColor2",
      link: "manager/team/view_team",
      initialState: "Teams",
    }
  ];

  return (
      <div>
        <nav className="sticky top-0 z-50">
          <Navbar />
        </nav>
        <div>
          <div className="hi-text dark:text-white">
            Hi! {authContext?.username}
          </div>
        </div>
        <div className="p-16 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.map((e) => {
              return (
                <LandingButtonLink
                  title={e.title}
                  desc={e.desc}
                  btn_color={e.btn_color}
                  link={e.link}
                  initialState={"Teams"}
                />
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default ManagerPage;
