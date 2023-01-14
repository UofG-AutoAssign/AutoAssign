import React from "react";
import AvatarBar from "../components/AvatarBar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { Fragment } from 'react'


interface Props {}

const ComfirmPopup: React.FC = () => {
    return (
      <>
        // head page//
        <label
          htmlFor="my-modal"
          className="btn bg-loginBlue focus:bg-loginBlue text-black"
        >  
          Create Account
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal z-10 overflow-y-auto">
          <div className="modal-box flex flex-col">
            <h3 className="font-bold text-lg">Are you Sure? </h3>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="py-4">Are you sure that you want to delete [member]? </span>
              </label>
            </div>
  
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Cancel
              </label>
              <label htmlFor="my-moal" className="btn bg-red-600">
                Yes, I'm sure
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ComfirmPopup;