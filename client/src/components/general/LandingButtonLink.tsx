import { FC } from "react";
import { Link } from "react-router-dom";
import { LandingButtonLinkProps } from "../../constants/Interfaces";

const LandingButtonLink: FC<LandingButtonLinkProps> = ({
  title,
  desc,
  btn_color,
  link,
}) => {
  return (
    <>
      <Link to={`/${link}`}>
        <button
          className={`${btn_color} h-36 flex flex-col w-4/5 mx-auto min-h-40 p-5 rounded-2xl hover:scale-110 transition-all delay-100 focus:border-black focus:border-2`}
        >
          <p className="text-left w-fit pb-3 text-xl font-bold text-blue-900">
            {title}
          </p>
          <p className="text-left w-full text-gray-600">{desc}</p>
        </button>
      </Link>
    </>
  );
};

export default LandingButtonLink;
