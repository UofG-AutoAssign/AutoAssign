import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const placeholdertext = "Unauthorized personnel found 🤡"

  useEffect(() => {
    let idx = 0
    setInterval(() => {
      setText(placeholdertext.substring(0, idx))
      idx += 1;
    }, 30)

    setTimeout(() => {
      navigate("/");
    }, 2000);

  }, []);

  return (
    <div className="text-7xl flex flex-col justify-center h-screen w-full items-center text-black dark:text-white font-medium text-center">
      <div>📸🤨</div>
      <div>{text}</div>
    </div>
  );
};

export default NotFoundPage;
