import axios from "axios";
import { MouseEvent, FC, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import authStore from "../context/authStore";

const ResetCard: FC = () => {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSignin = async (e: MouseEvent) => {
    try {
      e.preventDefault();

      if (
        !passwordInputRef.current?.value ||
        !confirmPasswordInputRef.current?.value
      )
        return;

      const token = location.pathname.split("/").at(-1);

      const { data } = await axios.put(
        `${environmentalVariables.backend}home/reset/`,
        {
          token,
          pwd1: passwordInputRef.current.value,
          pwd2: confirmPasswordInputRef.current.value
        }
      );
      console.log(data);

      if (data.status === true) {
        toast.success("Sucessfully Sent!");

        setTimeout(() => {
          navigate("/")
        }, 1000);
      } else {
        toast.error(`Failed to register new password: ${data.error}`);
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="w-full bg-white rounded-lg dark:border md:mt-0 min-w-full xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-lg p-5">
        <div className="space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Reset Password Page
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your new Password
              </label>
              <input
                ref={passwordInputRef}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm new Password
              </label>
              <input
                ref={confirmPasswordInputRef}
                type="password"
                name="password"
                id="password"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              onClick={(e) => handleSignin(e)}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 my-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetCard;
