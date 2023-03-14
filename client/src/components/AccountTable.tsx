import axios from "axios";
import { environmentalVariables } from "../constants/EnvironmentalVariables";
import { FC, useState } from "react";
import authStore from "../context/authStore";
import { toast } from "react-toastify";

const AccountTable: FC<{ data: string[] }> = ({ data }) => {
  const [firstName, setFirstName] = useState(data[0]);
  const [lastName, setLastName] = useState(data[1]);

  // When editing first and last name
  const [isCurrentlyEditingData, setIsCurrentlyEditingData] =
    useState<boolean>(false);

  const textAccordingtoRowId = (rowId: number): string => {
    if (rowId === 0) return "First Name: ";
    if (rowId === 1) return "Last Name: ";
    if (rowId === 2) return "Email: ";
    else return "Year: ";
  };

  return (
    <div className="overflow-x-auto relative shadow sm:rounded-lg max-h-96 overflow-y-scroll flex flex-col">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
        <tbody>
          {data.map((text, rowId) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {textAccordingtoRowId(rowId)}
                  {isCurrentlyEditingData && (rowId === 0 || rowId === 1) ? (
                    <input
                      type="text"
                      className="h-5"
                      defaultValue={rowId === 0 ? firstName : lastName}
                      onChange={(e) => {
                        if (rowId === 0) {
                          setFirstName(e.target.value);
                        } else if (rowId === 1) {
                          setLastName(e.target.value);
                        }
                      }}
                    />
                  ) : rowId === 0 ? (
                    firstName
                  ) : rowId === 1 ? (
                    lastName
                  ) : (
                    data[2]
                  )}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col py-4 items-center bg-white dark:bg-gray-800">
        <button
          type="button"
          className="w-52 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
          onClick={() => {
            if (isCurrentlyEditingData === true) {
              setIsCurrentlyEditingData(false);

              //sends a put request to the database to change

              let user = sessionStorage.getItem("userType")?.toLowerCase();

              if (user === "graduate") {
                user = "grad";
              }
              if (user === "manager") {
                user = "man";
              }
              console.log(data);

              axios
                .put(
                  `${environmentalVariables.backend}home/${user}/`,
                  {
                    first_name: firstName,
                    second_name: lastName,
                    email: data[2],
                  },
                  {
                    headers: {
                      AUTHORIZATION: authStore.authToken,
                    },
                  }
                )
                .then((response) => {
                  console.log(response);

                  if (response.data.code === 200) {
                    toast.success("Changes saved to database");

                    setTimeout(() => {
                      location.reload();
                    }, 1000);
                  } else {
                    toast.error("Failed to make changes...");
                  }
                })
                .catch((error) => {
                  toast.error(error);
                });
            } else {
              setIsCurrentlyEditingData(true);
            }
          }}
        >
          {isCurrentlyEditingData === true ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default AccountTable;
