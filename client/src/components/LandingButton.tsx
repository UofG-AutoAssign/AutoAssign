export interface LandingButtonProps {
  title: string;
  desc: string;
  btn_color: string;
}

const LandingButton: React.FC<LandingButtonProps> = ({
  title,
  desc,
  btn_color,
}) => {
  return (
    <button
      className={`${btn_color} h-36 flex flex-col w-3/4 mx-auto min-h-40 p-5 rounded-2xl hover:bg-loginBlue hover:scale-110 transition-all delay-100 focus:border-black focus:border-2`}
    >
      <p className="text-left w-fit pb-3 text-xl font-bold text-blue-900">
        {title}
      </p>
      <p className="text-left w-full text-gray-600">{desc}</p>
    </button>
  );
};

export default LandingButton;
