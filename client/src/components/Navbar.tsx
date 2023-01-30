import React, { useContext, useState, useEffect } from "react";
import { default as logo } from "../assets/react.svg";
import { FcSettings, FcPicture } from "react-icons/all";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { DiReact } from "react-icons/all";
import { useNavigate } from "react-router-dom";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
const authContext = useContext(AuthContext);

const backButton = (): JSX.Element => {
    let navigate = useNavigate();
    return (
      <>
        <button className="btn bg-blue-800  text-btnColor2" onClick={() => navigate(-1)}>Back</button>
      </>
    );
  };



  useEffect(() => {
    authContext?.getUserInfo();

    return () => {
      // Clean up here
    };
  }, []);

  return (
    <div className="navbar bg-white text-black px-5 py-3 mb-5 border-b-slate-200 border-2 flex flex-col justify-between sm:flex-row">
      <div className="">
        {/* <DiReact className="text-teal-400 text-5xl hover:animate-spin"/> */}

        {/* <button className="btn">Button</button> */}
        {/*{backButton()}*/}

        <img className="max-w-lg hover:animate-spin" src={logo} />
        {/* <Link to="/"> */}
          <div className="btn btn-ghost normal-case text-xl mx-10">
            AutoAssign
          </div>
        {/* </Link> */}
        <div className="text-xl">{authContext?.userType}</div>
      </div>
      <div className="gap-10 text-3xl">
        <Link to="/account">
          <FcPicture className="hover:text-5xl transition-all delay-150" />
        </Link>
        <FcSettings className="hover:text-5xl transition-all delay-150" />
        <Link to="/">
          <button className="btn bg-blue-800 border-blue-500 text-white">
            Sign Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
