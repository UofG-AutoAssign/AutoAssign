import { useEffect, FC } from "react";
import { BsFillMoonStarsFill, BsSun } from "react-icons/all";
import { Link, useLocation } from "react-router-dom";
import { RiReactjsFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSwitchAccount } from "react-icons/md";
import themeStore from "../context/themeStore";

const Navbar: FC<{
  hideLogoutButton?: boolean;
  hideAccountButton?: boolean;
}> = ({ hideLogoutButton, hideAccountButton }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const BackButton = (): JSX.Element => {
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

  const ThemeToggleButton = (): JSX.Element => {
    return (
      <label className="swap swap-rotate text-9xl">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={themeStore.isDarkMode}
          onClick={() => themeStore.switchThemes()}
        />
        <BsSun className="swap-off fill-current w-10 h-10" />
        <BsFillMoonStarsFill className="swap-on fill-current w-9 h-9" />
      </label>
    );
  };

  const goBackToLandingPage = () => {
    const query = location.pathname.split("/").at(1)?.toLowerCase();
    console.log(query);
    
    if (query) navigate(`/${query}`);

  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      <div className="navbar bg-gray-100 text-black dark:bg-gray-600 dark:text-white px-7 py-3 border-b-slate-200 flex flex-col justify-between sm:flex-row transition-all duration-150 shadow-xl">
        <div className="gap-5 scale-90 sm:scale-100">
          <BackButton />
          <RiReactjsFill className="max-w-lg hover:animate-spin text-5xl text-teal-400 dark:text-teal-800 saturate-200" />
          <div onClick={() => goBackToLandingPage()} className="btn btn-ghost normal-case text-xl">AutoAssign</div>
        </div>
        <div className="gap-10 text-3xl">
          <ThemeToggleButton />
          {hideAccountButton === true ? null : (
            <Link to="/account">
              <MdOutlineSwitchAccount className="hover:scale-125 transition-all duration-150" />
            </Link>
          )}
          {hideLogoutButton === true ? null : (
            <button
              onClick={() => {
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("userType");
                sessionStorage.removeItem("username");
                navigate("/");
              }}
              className="btn normal-case bg-blue-600 btn-outline dark:bg-red-500 border-0 text-white rounded-xl w-auto"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
