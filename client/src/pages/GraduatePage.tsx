import { FC, useContext } from "react";
import LandingButtonLink from "../components/LandingButtonLink";
import Navbar from "../components/Navbar";
import { LandingButtonLinkProps } from "../constants/Interfaces";
import AuthContext from "../context/AuthContext";
import themeStore from "../context/themeStore";

// Displays landing buttons for the Preference Form and Your Team pages
const GraduatePage: FC = () => {
  const authContext = useContext(AuthContext);

  const data: LandingButtonLinkProps[] = [
    {
      title: "Form",
      desc: "Submit this form to learn more about team preferences.",
      btn_color: "bg-btnColor1",
      link: "graduate/team/preference_form",
      initialState: "Assign Graduate",
    },
    {
      title: "Your Team",
      desc: "View Team.",
      btn_color: "bg-btnColor2",
      link: "graduate/team/view_team",
      initialState: "Assign Graduate",
    },
  ];

  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      <div className="page-background dark:bg-gray-800">
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
};

export default GraduatePage;
