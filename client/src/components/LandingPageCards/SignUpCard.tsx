import axios from "axios";
import { MouseEvent, FC, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";

const SignUpCard: FC = () => {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleNewPasswordSubmission = async (e: MouseEvent) => {
    // Notification for when any field is empty
    if (
      !firstNameInputRef.current?.value ||
      !lastNameInputRef.current?.value ||
      !passwordInputRef.current?.value ||
      !confirmPasswordInputRef.current?.value
    ) {
      toast.error("Please enter the required credentials");
      return;
    }
    e.preventDefault();
    
    // Notification when the two password fields don't match
    if (
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
      ) {
      toast.error("Unmatching passwords");
      return;
    }

    const token = location.pathname.split("/").at(-1);
    console.log(token);
    
    // @Todo change to actual token endpoint
    const { data } = await axios.post(
      `${environmentalVariables.backend}home/register/`,
      {
        first_name: firstNameInputRef.current.value,
        second_name: lastNameInputRef.current.value, 
        token,
        pwd1: passwordInputRef.current.value,
        pwd2: confirmPasswordInputRef.current.value
      },
    );
    console.log(data);
    
    if (data.status === true) {
      toast.success("Sucessfully registered!");
      navigate("/")
    } else {
      toast.error(`Failed to register new password: ${data.error}`);
    }
  };

  return (
    <div>
      <div className="w-full bg-white rounded-lg dark:border md:mt-0 min-w-full xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-lg p-5">
        <div className="space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign Up
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
          <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                ref={firstNameInputRef}
                type="text"
                placeholder="First Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                ref={lastNameInputRef}
                type="text"
                placeholder="Last Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                ref={passwordInputRef}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm New Password
              </label>
              <input
                ref={confirmPasswordInputRef}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              onClick={(e) => handleNewPasswordSubmission(e)}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-5"
            >
              Confirm New Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
