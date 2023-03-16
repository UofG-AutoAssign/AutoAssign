import { FC } from "react";
import ForgotPassCard from "../components/ForgotPassCard";
import LoginCard from "../components/LoginCard";
import Navbar from "../components/Navbar";
import ResetCard from "../components/ResetCard";
import SignUpCard from "../components/SignUpCard";

type LandingPageProps = {
  pageType: "Login" | "Signup" | "SendEmail" | "ResetPassword";
};

const LandingPage: FC<LandingPageProps> = ({ pageType }) => {
  let text1: string | undefined,
    text2: string | undefined,
    component: JSX.Element | undefined;

  switch (pageType) {
    case "Login":
      text1 = "Login";
      text2 = "In order to proceed, please login using your user credentials";
      component = <LoginCard />;
      break;

    case "ResetPassword":
      text1 = "Reset Password";
      text2 = "Reset your password and also confirm your new password";
      component = <ResetCard />;
      break;

    case "SendEmail":
      text1 = "Forgot Password";
      text2 =
        "Enter your email, and a link will be sent to you to reset your password";
      component = <ForgotPassCard />;
      break;

    case "Signup":
      text1 = "Sign Up";
      text2 = "Enter your details to create your account";
      component = <SignUpCard />;
      break;

    default:
      break;
  }

  return (
    <div>
      <nav className="sticky top-0 z-50">
        <Navbar hideLogoutButton={true} hideAccountButton={true} />
      </nav>
      <div className="flex flex-col md:flex-row justify-between bg-white dark:bg-gray-700 min-h-screen py-12 transition-all delay-100">
        <div className="w-full bg-loginBlue basis-1/2 rounded-r-3xl flex flex-col justify-center shadow-lg py-5">
          <div className="bg-loginTeal w-3/4 h-3/4 rounded-3xl mx-auto p-5 gap-5 flex flex-col">
            <p className="text-blue-800 text-5xl font-semibold">{text1}</p>
            <p className="text-black text-xl">{text2}</p>
          </div>
        </div>
        <div className="w-full h-screen basis-1/2 min-h-screen m-5">
          <div className="bg-gray-200 dark:bg-gray-400 basis-1/2 rounded-3xl w-3/4 mx-auto p-5 transition-all delay-150">
            {component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
