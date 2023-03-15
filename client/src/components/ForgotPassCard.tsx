import { MouseEvent, FC, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { environmentalVariables } from "../constants/EnvironmentalVariables";

const ForgotPassCard: FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleForgetPasswordSubmission = async (e: MouseEvent) => {
    try {
      e.preventDefault();
      // Notification for when any field is empty
      if (!emailInputRef.current?.value) {
        toast.error("Please enter the required credentials");
        return;
      }

      const { data } = await axios.post(
        `${environmentalVariables.backend}home/reset/`,
        {
          email: emailInputRef.current.value,
          url: location.hostname + ":5173" + "/enter_new_password/"
        }
      );
      console.log(data);

      if (data.status === true) {
        toast.success("Sucessfully Sent!");

      } else {
        toast.error(`Failed to register new password: ${data.error}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-5">
      <div className="space-y-4">
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              onClick={(e) => handleForgetPasswordSubmission(e)}
              className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset Password
            </button>
          </div>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            <Link
              to="/"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Return to login page
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassCard;
