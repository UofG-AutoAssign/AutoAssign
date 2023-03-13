import { useState } from "react";
import { gradType } from "../../pages/HRManagePage";

const UnassignedGraduateTable = ({
    graduateList,
}: {
    graduateList: gradType[];
}): JSX.Element => {
    const [query, setQuery] = useState<string>("");

    const filteredPeople =
        query === ""
            ? graduateList
            : graduateList.filter((graduateName) => {
                return graduateName.email.toLowerCase().includes(query.toLowerCase());
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
                        filteredPeople.map((gradName) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {gradName.email}
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

export default UnassignedGraduateTable