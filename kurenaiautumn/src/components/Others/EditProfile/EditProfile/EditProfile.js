import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <p className="font-bold text-3xl mt-8">Settings</p>
      <div className="editprofile-nav mt-5 flex justify-between">
        <div className="mb-2">
          <Link
            to="/editprofile"
            className="text-gray-500 editProfile-nav-item"
          >
            Account
          </Link>
        </div>
      </div>
      <hr />
      <Outlet></Outlet>
    </div>
  );
};

export default EditProfile;
