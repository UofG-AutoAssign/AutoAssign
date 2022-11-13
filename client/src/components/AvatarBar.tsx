import React from "react";

interface Props {}

const AvatarBar: React.FC<Props> = () => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-start gap-5 p-5 align-middle">
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full sm:w-8 md:w-12 lg:w-16 xl:w-24 mx-auto">
          <span className="text-sm md:text-lg">Avatar</span>
        </div>
      </div>
      <span className=" text-start my-auto text-white">
        Lorem Ipsumis simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </span>
    </div>
  );
};

export default AvatarBar;
