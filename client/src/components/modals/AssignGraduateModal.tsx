import { FC } from "react";
import { confirmGraduateToTeamModalId2 } from "../../constants/ModalIDs";

const AssignGraduateModal: FC<{
  handleAssignGrad: () => Promise<boolean>;
}> = ({ handleAssignGrad }) => {
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
                Are you sure that you want to assign [graduate]?{" "}
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
            <div onClick={() => handleAssignGrad()}>
              <label
                htmlFor={confirmGraduateToTeamModalId2}
                className="btn bg-blue-800 text-white"
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

export default AssignGraduateModal;
