import React from "react";
import EditModal from "../EditModal/EditModal";

const Account = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Username</p>
        <p className="text-xs mt-1 mr-3">ABC</p>
      </div>
      <div className="flex justify-between my-3">
        <p className="text-sm font-semibold">Email address</p>
        <p className="text-xs">abc@gmail.com</p>
      </div>
      <div className="flex justify-between my-3">
        <p className="text-sm font-semibold">Edit profile</p>
        <div className="text-xs">
            {/* Modal button */}
          <label htmlFor="my-modal-3">
            <i class="fa-solid fa-pen-to-square"></i>
          </label>

          {/* Modal popup */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label htmlFor="my-modal-3" className="absolute right-3 top-2">
                ✕
              </label>
              <h3 className="text-lg font-bold">Edit profile</h3>
              <div className="py-4">
                <EditModal></EditModal>
              </div>
           
            </div>
          </div>
          </div>
      </div>
      <hr />
      <div className="mt-4">
        <p className="text-sm text-red-600  cursor-pointer">Deactivate account</p>
        <p className="text-xs">Your account will be deactiveted until you sign in back.</p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-red-600  cursor-pointer">Delete account</p>
        <p className="text-xs">Delete your account permanently.</p>
      </div>
    </div>
  );
};

export default Account;
