import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export interface LandingButtonModalProps {
  title: string;
  desc: string;
  btn_color: string;
  modal: JSX.Element;
  modalId: string;
}

const LandingButtonModal: React.FC<LandingButtonModalProps> = ({
  title,
  desc,
  btn_color,
  modal,
  modalId,
}) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <label
        htmlFor={modalId}
        className={`${btn_color} h-36 flex flex-col w-4/5 mx-auto min-h-40 p-5 rounded-2xl hover:scale-110 transition-all delay-100 hover:border-black hover:border-2`}
      >
        <p className="text-left w-fit pb-3 text-xl font-bold text-blue-900">
          {title}
        </p>
        <p className="text-left w-full text-gray-600">{desc}</p>
      </label>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      {modal}
    </>
  );
};

export default LandingButtonModal;