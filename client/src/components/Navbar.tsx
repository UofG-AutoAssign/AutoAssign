import React from "react";
import { default as logo } from "../assets/react.svg";
import { FcSettings, FcPicture } from "react-icons/all"

interface Props {}

const Navbar: React.FC<Props> = () => {

  return (
    <div className="navbar bg-white text-black px-5 py-3 mb-5 border-b-slate-200 border-2">
      <div className="navbar-start">
        <img className="max-w-lg hover:animate-spin" src={logo}/>
        <div className="btn btn-ghost normal-case text-xl mx-10">
          AutoAssign
        </div>
        <div>Graduate</div>
      </div>
      <div className="navbar-end gap-10 text-3xl">
        <FcPicture className="hover:text-5xl transition-all delay-150"/>
        <FcSettings className="hover:text-5xl transition-all delay-150"/>
        <button className="btn bg-blue-800 border-blue-500 text-white">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
