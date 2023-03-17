import { useRef } from "react";
import { environmentalVariables } from "../../constants/EnvironmentalVariables";
import authStore from "../../context/authStore";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePasswordTable = (): JSX.Element => {
  const confirmChangePasswordModalId = "confirm-graduate2";
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
  const routerNavigator = useNavigate();

  const handleChangePassword = async () => {
    // No empty fields allowed
    if (
      !currentPasswordRef.current?.value ||
      !newPasswordRef.current?.value ||
      !confirmNewPasswordRef.current?.value
    ) {
      toast.error("No empty fields allowed");
      return;
    }

    // Check for new password confirmation
    if (
      newPasswordRef.current?.value !== confirmNewPasswordRef.current?.value
    ) {
      toast.error("Unmatching new passwords");
      return;
    }

    // Password validity checks
    if (
      newPasswordRef.current.value.length < 6 ||
      newPasswordRef.current.value.length > 15
    ) {
      toast.error("Password must be between 6 to 15 characters long");
      return;
    }

    if (newPasswordRef.current.value.includes(" ")) {
      toast.error("You cannot have spaces in your password");
      return;
    }

    let noDigit = true;

    for (let i = 0; i < newPasswordRef.current.value.length; i++) {
      const charCode = newPasswordRef.current.value.charCodeAt(i);
      if (!isNaN(charCode) && charCode >= 48 && charCode <= 57) {
        noDigit = false;
      }
    }

    if (noDigit) {
      toast.error("Password must have a digit");
      return;
    }

    console.log("Passed all tests");

    axios
      .put(
        `${environmentalVariables.backend}home/ChangePassword/`,
        {
          pwd: currentPasswordRef.current?.value,
          pwd1: newPasswordRef.current?.value,
          pwd2: confirmNewPasswordRef.current?.value,
        },
        {
          headers: {
            AUTHORIZATION: authStore.authToken,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);

        if (data.status === true) {
          toast.success("Password sucessfully changed!");

          setTimeout(() => {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("userType");
            sessionStorage.removeItem("username");
            routerNavigator("/");
          }, 1000);

          return;
        }

        toast.error("Failed to change password");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Displays pop-up if user is sure of changing their password
  const ConfirmChangePasswordModal = (): JSX.Element => {
    return (
      <>
        <div className="modal z-50 overflow-y-auto">
          <div className="modal-box flex flex-col bg-white dark:bg-gray-600">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Are you Sure?{" "}
            </h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="py-4 text-black dark:text-white">
                  Are you sure that you want to change password ?{" "}
                </span>
              </label>
            </div>

            <div className="modal-action">
              <label
                htmlFor={confirmChangePasswordModalId}
                className="btn bg-gray-200 text-black shadow-lg"
              >
                Cancel
              </label>
              <label
                htmlFor={confirmChangePasswordModalId}
                className="btn bg-blue-800 text-white"
                onClick={() => handleChangePassword()}
              >
                Yes, I am sure
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full pr-5">
      <div className="mb-7 text-black dark:text-white">
        Input your current and your new password twice.
      </div>
      <form>
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="current_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your current password
            </label>
            <input
              ref={currentPasswordRef}
              type="text"
              id="current_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Current Password"
              required
            ></input>
          </div>
          <div>
            <label
              htmlFor="new_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your new password
            </label>
            <input
              ref={newPasswordRef}
              type="text"
              id="new_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New Password"
              required
            ></input>
          </div>

          <div>
            <label
              htmlFor="confirm_new_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm your new password
            </label>
            <input
              ref={confirmNewPasswordRef}
              type="text"
              id="confirm_new_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm New Password"
              required
            ></input>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor={confirmChangePasswordModalId}
            className="btn my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </label>

          <input
            type="checkbox"
            id={confirmChangePasswordModalId}
            className="modal-toggle"
          />
          <ConfirmChangePasswordModal />
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordTable;
