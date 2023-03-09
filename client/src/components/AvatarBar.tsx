import { FC } from "react";
import Avatar from "react-avatar";

const AvatarBar: FC<{ firstName: string, lastName: string }> = ({ firstName, lastName }) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-center gap-5 p-5 align-middle">
      <div className="avatar placeholder">
        <Avatar
          name={`${firstName} ${lastName}`}
          size={"100"}
          round={true}
          textMarginRatio={0.15}
        />
      </div>
      <div className="text-start my-auto dark:text-white text-black text-4xl mx-auto md:mx-5">
        {firstName} {lastName}
      </div>
    </div>
  );
};

export default AvatarBar;
