import Navbar from "../components/general/Navbar";
import axios from "axios";
import authStore from "../context/authStore";
import PreferenceFormTable from "../components/GraduateTeamPage/PreferenceFormTable";
import { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initialComponentGraduate } from "../constants/Types";
import { ManagerTableInterface } from "../constants/Interfaces";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import { toast } from "react-toastify";
import { AiOutlineTeam } from "react-icons/ai";
import { FcDepartment } from "react-icons/fc";
import YourTeamTable from "../components/general/YourTeamTable";


const GraduateTeamPage: FC<{ initialComponent: initialComponentGraduate }> = ({
  initialComponent,
}) => {
  const [currentTab, setCurrentTab] =
    useState<initialComponentGraduate>(initialComponent);

  // List of team members
  const [teammateList, setTeammateList] = useState<ManagerTableInterface[]>([
    { name: "...", email: "..." },
  ]);

  const [teamName, setTeamName] = useState<string>("...");
  const [depName, setDepName] = useState<string>("...");

  // Display page corresponding to the active tab
  const DisplayComponent = (): JSX.Element => {
    if (currentTab === "Your Team") return <YourTeamTable teammateList={teammateList} />;
    else return <PreferenceFormTable />;
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = location.pathname.split("/").at(-1);

    if (query === "view_team") setCurrentTab("Your Team");
    else setCurrentTab("Preference Form");

  }, [location]);

  const effectRanOnFirstLoad = useRef<boolean>(false);
  useEffect(() => {
    const getTeammateList = async () => {
      const { data } = await axios.get(
        `${environmentalVariables.backend}home/grad/team/`,
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      );

      if (data.code !== 200) {
        toast.error("[Team members] " + data.error);
        return;
      }

      const { depart_information: depInfo, man_information: manInfo, team_members: memberList, team_name: teamName } = data.data;
      console.log(manInfo[0], memberList);

      setTeamName(teamName);
      setDepName(depInfo[0].dep_name);

      const newTeamList: ManagerTableInterface[] = []; // This includes the manager at the top of the list

      newTeamList.push({ email: manInfo[0].man_email, name: `[Manager] ${manInfo[0].man_name}` })

      memberList.forEach(({ grad_id, grad_name, grad_email }: any) => {
        newTeamList.push({ email: grad_email, name: grad_name })
      });

      setTeammateList(newTeamList)

      if (data.status === false) toast.error(data.error)

    };

    if (effectRanOnFirstLoad.current === false) getTeammateList();

    return () => {
      effectRanOnFirstLoad.current = true;
    };
  }, []);

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar />
        <div className="hi-text dark:text-white">{currentTab === "Preference Form" ? "Skills Preference Form" : `Your Team`}</div>
        <div className="hi-text dark:text-white text-3xl flex flex-row justify-center items-center">
        <AiOutlineTeam className="text-3xl mr-3 bg-teal-100 rounded-full dark:text-blue-500" />
          Team — {teamName}
          </div>
        <div className="hi-text dark:text-white text-2xl flex flex-row justify-center items-center">
        <FcDepartment className="text-3xl mr-3" />
          Department — {depName}
          </div>
      </nav>
      <section className="flex flex-row gap-5 py-5">
        <div className="w-1/4 bg-loginBlue rounded-r-2xl h-fit">
          <button
            onClick={() => navigate("/graduate/team/view_team")}
            type="button"
            className="w-full border-white border-b-2 rounded-tr-2xl rounded-l-none text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Your Team
          </button>
          <button
            onClick={() => navigate("/graduate/team/preference_form")}
            type="button"
            className="w-full border-white border-b-2 rounded-br-2xl text-white bg-loginBlue hover:bg-loginBlueBold focus:bg-loginBlueBold focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-lg px-5 py-2.5 text-center mb-0"
          >
            Preference Form
          </button>
        </div>

        <div className="w-3/4 pr-5">
          <DisplayComponent />
        </div>
      </section>
    </div>
  );
};

export default GraduateTeamPage;
