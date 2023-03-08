import { FC } from "react";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";

// This union type is for modularizing/refactoring reusable modals into just one file
// type RemoveModalType =
//   | { type: "Remove-manager"; managerName: string }
//   | { type: "Remove-graduate"; graduateName: string };

const RemoveGraduateModal: FC<{
  handleRemoveGrad: () => Promise<boolean>;
}> = ({ handleRemoveGrad }) => {
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
                Are you sure that you want to delete [graduate]?{" "}
              </span>
            </label>
          </div>
          <div className="modal-action">
            <label
              htmlFor={confirmGraduateToTeamModalId2}
              className="btn bg-gray-200 text-black shadow-lg"
            >
              Cancel
            </label>
            <div onClick={() => handleRemoveGrad()}>
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-red-700 text-white"
              >
                Yes, I'm sure
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveGraduateModal;
