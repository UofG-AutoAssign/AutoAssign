import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface TableProps {
  data: string[];
  action: "swap" | "edit";
  auxiliaryFunction?: () => void;
}

const Table: React.FC<TableProps> = ({ data, action, auxiliaryFunction }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-h-96 overflow-y-scroll">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"></thead>
        <tbody>
          {data.map((person) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {person}
                </th>
                <td className="py-4 px-6 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      if (auxiliaryFunction !== undefined) auxiliaryFunction();
                    }}
                  >
                    {action}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
