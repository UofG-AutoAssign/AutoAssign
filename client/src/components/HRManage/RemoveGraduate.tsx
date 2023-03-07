import { FC, useState } from "react";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";
import RemoveGraduateModal from "../modals/RemoveGraduateModal";

// Permanently delete a graduate account
const RemoveGraduate: FC = () => {
  const GraduateTable = ({
    graduateList,
  }: {
    graduateList: string[];
  }): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredPeople =
      query === ""
        ? graduateList
        : graduateList.filter((graduateName) => {
            return graduateName.toLowerCase().includes(query.toLowerCase());
          });

    return (
      <div className="bg-white dark:bg-gray-800 overflow-x-auto relative shadow-md sm:rounded-lg h-96 w-96 overflow-y-scroll">
        <input
          className="w-full border-none my-2 pl-5 pr-10 font-semibold text-left text-sm leading-5 text-black dark:text-white focus:ring-0 bg-gray-100 dark:bg-gray-700"
          type={"text"}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={"Search Names"}
        />
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
          <tbody>
            {graduateList.length === 0 ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-400 whitespace-nowrap dark:text-white"
                >
                  Empty
                </th>
                <td className="py-4 px-6 text-right"></td>
              </tr>
            ) : (
              filteredPeople.map((managerName) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {managerName}
                    </th>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-3/4 pr-5">
      <div className="mb-7 text-black dark:text-white">
        Type the graduates email and delete their account permanently.
      </div>
      <form>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Graduate email
            </label>
          </div>
          <input
            type="text"
            id="first_name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="graduate@email.com                         "
            required
          ></input>
          <div className="flex flex-col items-center">
            <label
              htmlFor={confirmGraduateToTeamModalId2}
              className="btn my-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Delete
            </label>

            <input
              type="checkbox"
              id={confirmGraduateToTeamModalId2}
              className="modal-toggle"
            />
            <RemoveGraduateModal />

            <div className="my-5 p-5 w-full border-2 border-red-800 bg-red-500 bg-opacity-50 basis-1/2 rounded-3xl flex flex-col justify-center shadow-lg py-5">
              <div className="hi-text dark:text-white text-xl mb-5">All Year 2 Graduates</div>
              <GraduateTable graduateList={["Jack", "Jack", "Jack", "Jack"]}/>
              <button
                type="button"
                className="opacity-100 my-8 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:scale-110 transition-all duration-150"
              >
                Remove All Year 2 Graduates
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RemoveGraduate;
