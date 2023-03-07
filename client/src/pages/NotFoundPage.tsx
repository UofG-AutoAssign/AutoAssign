import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("Unauthorized personnel found")

  useEffect(() => {
    setTimeout(() => {
      setText("Redirecting back to login...")
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => {};
  }, []);

  return (
    <div className="text-7xl flex flex-col justify-center h-screen w-full items-center text-black dark:text-white font-medium text-center">
      <div>📸🤨</div>
      <div>{text}</div>
    </div>
  );
};

export default NotFoundPage;
