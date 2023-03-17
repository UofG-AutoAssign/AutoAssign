import { Combobox, Transition } from "@headlessui/react";
import { FC, useState, Fragment, Dispatch, SetStateAction, ReactNode } from "react";
import {
  departmentType,
  gradType,
  managerType,
  teamAndDepartmentType,
} from "../../pages/HRManagePage";

type DropdownAutoCompleteType = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
} & (
  | {
      type: "Manager";
      itemList: managerType[];
    }
  | {
      type: "Graduate";
      itemList: gradType[];
    }
  | {
      type: "DepartmentOnly";
      itemList: departmentType[];
    }
  | {
      type: "TeamAndDepartment";
      itemList: teamAndDepartmentType[];
    }
);

const DropdownAutoComplete: FC<DropdownAutoCompleteType> = ({
  type,
  selected,
  setSelected,
  itemList,
}) => {
  const [query, setQuery] = useState<string>("");

  const patternMatch = (input: string) => {
    return input
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, ""));
  };

  let filteredPeople: typeof itemList = [];

  switch (type) {
    case "Graduate":
      filteredPeople =
        query === ""
          ? itemList
          : itemList.filter((item) => patternMatch(item.email));
      break;

    case "Manager":
      filteredPeople =
        query === ""
          ? itemList
          : itemList.filter((item) => patternMatch(item.email));
      break;

    case "DepartmentOnly":
      filteredPeople =
        query === ""
          ? itemList
          : itemList.filter((item) => patternMatch(item.depart_name));
      break;

    case "TeamAndDepartment":
      filteredPeople =
        query === ""
          ? itemList
          : itemList.filter((item) => patternMatch(item.team_name));
      break;

    default:
      break;
  }

  return (
    <div className="relative min-w-[72px] w-full z-30">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 "
              displayValue={(item) => {
                if (["Graduate", "Manager"].includes(type)) return (item as any).email;
                else if (["DepartmentOnly", "TeamAndDepartment"].includes(type)) return (item as any).depart_name;
              }}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              V
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((item, idx) => {
                  let displayValue: ReactNode;

                  if (["Graduate", "Manager"].includes(type)) displayValue = (item as any).email;
                  else if (["DepartmentOnly"].includes(type)) displayValue = (item as any).depart_name;
                  else if (["TeamAndDepartment"].includes(type)) displayValue = (item as any).team_name;

                  return (
                    <Combobox.Option
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {displayValue}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-blue-600"
                              }`}
                            >
                              ✅
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  );
                })
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default DropdownAutoComplete;
