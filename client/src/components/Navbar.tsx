import { useContext, useEffect, FC } from "react";
import { default as logo } from "../assets/react.svg";
import { FcSettings, FcPicture } from "react-icons/all";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { RiReactjsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineSwitchAccount } from "react-icons/md";
import themeStore from "../context/themeStore";
import { observer } from "mobx-react";

const Navbar: FC = observer(() => {
  const authContext = useContext(AuthContext);

  const backButton = (): JSX.Element => {
    let navigate = useNavigate();
    return (
      <>
        <div className="tooltip tooltip-bottom" data-tip="Go Back">
          <IoIosArrowBack
            className="text-3xl hover:scale-125"
            onClick={() => navigate(-1)}
          />
        </div>
      </>
    );
  };

  const themeToggleButton = (): JSX.Element => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={themeStore.isDarkMode}
          onClick={() => themeStore.switchThemes()}
        />
        <div className="w-11 h-6 bg-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800" />
      </label>
    );
  };

  useEffect(() => {
    authContext?.getUserInfo();

    return () => {
      // Clean up here
    };
  }, []);

  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      <div className="navbar bg-white text-black dark:bg-gray-600 dark:text-white px-7 py-3 mb-5 border-b-slate-200 flex flex-col justify-between sm:flex-row transition-all duration-150 ">
        <div className="gap-5 scale-90 sm:scale-100">
          {backButton()}
          <RiReactjsFill className="max-w-lg hover:animate-spin text-5xl text-teal-400 dark:text-teal-800"/>
          <div className="btn btn-ghost normal-case text-xl">AutoAssign</div>
          <div className="text-xl font-semibold duration-150">{authContext?.userType}</div>
        </div>
        {/* <div className="gap-10 text-3xl invisible sm:visible absolute sm:relative"> */}
        <div className="gap-10 text-3xl">
          {themeToggleButton()}
          <Link to="/account">
            <MdOutlineSwitchAccount className="hover:scale-125 transition-all duration-150"/>
          </Link>
          <AiOutlineSetting className="hover:scale-125 transition-all duration-150"/>
          <Link to="/">
            <button className="btn normal-case bg-blue-600 btn-outline dark:bg-red-500 border-0 text-white rounded-xl w-full sm:w-auto">
              Sign Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
