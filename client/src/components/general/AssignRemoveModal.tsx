import { FC } from "react";
import { confirmGraduateToTeamModalId2, confirmGraduateToTeamModalId3 } from "../../constants/ModalIDs";

type AssignRemoveModalType = {
    handleSubmission: () => Promise<void>,
    modalType: "AssignGraduate" | "RemoveGraduate" | "AssignManager" | "RemoveManager" | "DeleteTeam";
}

const AssignRemoveModal: FC<AssignRemoveModalType> = ({ handleSubmission, modalType }) => {
    let text: string | undefined,
    modalId: string | undefined,
    submitBtnColor: string | undefined;

    switch (modalType) {
        case "AssignGraduate":
            text = "assign graduate";
            modalId = confirmGraduateToTeamModalId2;
            submitBtnColor = `bg-blue-700`;
            break;

        case "RemoveGraduate":
            text = "remove graduate";
            modalId = confirmGraduateToTeamModalId2;
            submitBtnColor = `bg-red-700`;
            break;

        case "AssignManager":
            text = "assign manager";
            modalId = confirmGraduateToTeamModalId3;
            submitBtnColor = `bg-blue-700`;
            break;

        case "RemoveManager":
            text = "remove manager";
            modalId = confirmGraduateToTeamModalId2;
            submitBtnColor = `bg-red-700`;
            break;

        case "DeleteTeam":
            text = "delete team";
            modalId = confirmGraduateToTeamModalId2;
            submitBtnColor = `bg-red-700`;
            break;
    
        default:
            break;
    }

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
                Are you sure that you want to {text}?{" "}
              </span>
            </label>
          </div>
          <div className="modal-action">
            <label
              htmlFor={modalId}
              className="btn bg-gray-200 text-black shadow-lg"
            >
              Cancel
            </label>
            <div onClick={() => handleSubmission()}>
              <label
                htmlFor={modalId}
                className={`btn text-white ${submitBtnColor}`}
              >
                Yes, I&apos;m sure
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignRemoveModal;
