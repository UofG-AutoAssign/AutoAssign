import { observer } from "mobx-react";
import React, { useContext } from "react";
import AvatarBar from "../components/AvatarBar";
import LandingButtonLink, {
  LandingButtonLinkProps,
} from "../components/LandingButtonLink";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import AuthContext from "../context/AuthContext";
import themeStore from "../context/themeStore";

const ManagerPage: React.FC = observer(() => {
  const authContext = useContext(AuthContext);

  const data: LandingButtonLinkProps[] = [
    {
      title: "Team Settings",
      desc: "Weight how much you value each technology.",
      btn_color: "bg-btnColor1",
      link: "managerTeam",
      initialState: "Teams",
    },
    {
      title: "Your Team",
      desc: "View your Team",
      btn_color: "bg-btnColor2",
      link: "managerTeam",
      initialState: "Teams",
    },
    {
      title: "Roles",
      desc: "Learn more about roles here at {company_name}",
      btn_color: "bg-btnColor3",
      link: "manager",
      initialState: "Teams",
    },
  ];

  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      <div className="page-background dark:bg-gray-400">
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
    </div>
  );
});

export default ManagerPage;
