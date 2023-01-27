import React from "react";

const Account = () => {
  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Username</p>
        <div className="flex">
          <p className="text-xs mt-1 mr-3">ABC</p>
        </div>
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
              <h3 className="text-lg font-bold">User name</h3>
              <p className="py-4">
                You've been selected for a chance to get one year of
                subscription to use Wikipedia for free!
              </p>
              <div className="modal-action flex">
              <label
                  htmlFor="my-modal-3"
                  className="rounded-full text-xs font-semibold px-3 py-2 ml-5"
                >
                  Cancel
                </label>
                <label
                  htmlFor="my-modal-3"
                  className="bg-fuchsia-600 rounded-full text-xs text-white font-semibold px-3 py-2 ml-5"
                >
                  Save
                </label>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Account;
