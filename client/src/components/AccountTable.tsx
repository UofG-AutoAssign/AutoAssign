import { FC, useState } from "react";

const AccountTable: FC<{ data: string[] }> = ({ data }) => {
  // When editing first and last name
  const [isCurrentlyEditingData, setIsCurrentlyEditingData] = useState<boolean>(false);

  const textAccordingtoRowId = (rowId: number): string => {
    if (rowId === 0) return "First Name: ";
    if (rowId === 1) return "Last Name: ";
    if (rowId === 2) return "Email: ";
    else return "Year: ";
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-h-96 overflow-y-scroll">
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
                  {isCurrentlyEditingData ? (
                    <input type="text" className="h-5" />
                  ) : (
                    text
                  )}
                </th>
                <td className="py-4 px-6 text-right">
                  <div
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    edit {rowId}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div onClick={() => setIsCurrentlyEditingData(true)}>click</div>
    </div>
  );
};

export default AccountTable;
