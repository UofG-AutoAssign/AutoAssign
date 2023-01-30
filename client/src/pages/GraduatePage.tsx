import { FC, useContext } from "react";
import LandingButtonLink, {
  LandingButtonLinkProps,
} from "../components/LandingButtonLink";
import Navbar from "../components/Navbar";
import AuthContext from "../context/AuthContext";
import themeStore from "../context/themeStore";

const GraduatePage: FC = () => {
  const authContext = useContext(AuthContext);

  const data: LandingButtonLinkProps[] = [
    {
      title: "Form",
      desc: "Submit this form to learn more about team preferences.",
      btn_color: "bg-btnColor1",
      link: "preference_page",
      initialState: "Assign Graduate",
    },
    {
      title: "Your Team",
      desc: "View Team.",
      btn_color: "bg-btnColor2",
      link: "graduateTeamPage",
      initialState: "Assign Graduate",
    },
    {
      title: "Roles",
      desc: "Learn more about the roles in general.",
      btn_color: "bg-btnColor3",
      link: "graduate",
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
