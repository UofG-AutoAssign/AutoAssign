import React from "react";
import { default as logo } from "../assets/react.svg";
import { FcSettings, FcPicture } from "react-icons/all";
import { Link } from "react-router-dom";

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className="navbar bg-white text-black px-5 py-3 mb-5 border-b-slate-200 border-2 flex flex-col justify-between sm:flex-row">
      <div className="">
        <img className="max-w-lg hover:animate-spin" src={logo} />
        <div className="btn btn-ghost normal-case text-xl mx-10">
          AutoAssign
        </div>
        <div>Graduate</div>
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
