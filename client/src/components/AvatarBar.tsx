import { FC } from "react";
import Avatar from "react-avatar";

const AvatarBar: FC = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-center gap-5 p-5 align-middle">
      <div className="avatar placeholder">
        {/* <div className="bg-neutral-focus text-neutral-content rounded-full sm:w-8 md:w-12 lg:w-16 xl:w-24 mx-auto"> */}
          {/* <span className="text-sm md:text-lg">Avatar</span> */}
            <Avatar name="Johny Johnson" size={"100"} round={true} textMarginRatio={.15}/>
          </div>
      {/* </div> */}
      <div className="text-start my-auto dark:text-white text-black text-4xl mx-auto md:mx-5">
        Johny Johnson
      </div>
    </div>
  );
};

export default AvatarBar;
