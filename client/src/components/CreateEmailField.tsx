import axios from "axios";
import { FC, useState } from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { toast } from "react-toastify";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import authStore from "../context/authStore";

const CreateEmailField: FC<{ createEmailFor: "Graduates" | "Managers" }> = ({ createEmailFor }) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);

  const handleEmailSubmission = async (): Promise<boolean> => {
    const splitEmailList = emails.join(" ").split(" ");
    console.log(splitEmailList);

    if (splitEmailList.length < 1 || (splitEmailList.length === 1 && splitEmailList[0] === "")) {
      toast.error("Enter at least 1 email");
      location.reload();
      return false;
    }

    const postBody = {
      email: emails, role: createEmailFor === "Graduates" ? 1 : 2, url: location.host + "/sign_up/"
    }
    console.log(postBody);


    const { data } = await axios.post(
      `${environmentalVariables.backend}home/hr/Register/`,
      postBody,
      {
        headers: {
          AUTHORIZATION: authStore.authToken,
        },
      }
    );

    console.log(data);

    if (data.status === true) {

      setTimeout(() => {
        location.reload();
      }, 1500);

      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full">
      <form className="">
        <h3 className="text-black dark:text-white">Email</h3>
        <ReactMultiEmail
          className="bg-white dark:bg-gray-700"
          placeholder="Input your email"
          emails={emails}
          onChange={(_emails: string[]) => {
            setEmails(_emails);
          }}
          autoFocus={true}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          getLabel={(email, index, removeEmail) => {
            return (
              <div data-tag key={index}>
                <div data-tag-item>{email}</div>
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  x
                </span>
              </div>
            );
          }}
        />
        <br />
        {/* <p>{emails.join(", ") || "empty"}</p> */}
      </form>
      <div className="w-full flex flex-row justify-center">
        <button
          onClick={() => {
            toast.promise(
              handleEmailSubmission,
              {
                pending: 'Delivering email(s) to server... \n Please do not close this page',
                success: 'Sucessfully delivered email(s) to server!',
                error: 'Failed to send email(s) to server'
              }
            )
          }}
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateEmailField;
