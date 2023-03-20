import React from "react";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTItle";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import qs from "qs"

const Signin = () => {
  const [user, setUser] =useState([]);
  const navigate = useNavigate();

  useTitle("Signin")
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleLogin = (data) => {
    console.log(data)
    fetch(`${process.env.REACT_APP_URL}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setUser(data.user._id);
          if(data.user._id !== null){
            toast.success(data.message)
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log("data to be stored locally = ", data.user)
            navigate(`/dashboard`);
            window.location.reload(false);
          }
        })
        .catch((err) => {
      console.error(err)
      if(err){
        toast.error("Wrong Username or Password")
      }
  });
  };


  return (
    <div className="inner-div">
      <div className="justify-center">
        <form
          className="form-div mt-4 rounded-md"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="header flex justify-between py-3">
            <p className="text-fuchsia-700 text-xs font-semibold ml-4">
              ALREADY MEMBERS
            </p>
            {/* <p className="text-gray text-xs font-semibold mr-4">Need help?</p> */}
          </div>
          <div className="form-control w-full px-4 mt-4">
            <input
              {...register("username", { required: "Enter username" })}
              type="text"
              placeholder="User name"
              className="user-input rounded-md w-full my-2"
            />
            {errors.username && (
              <span className="text-red-500 text-xs">{errors.username.message}</span>
            )}
            <input
              {...register("password", { required: "Wrong password" })}
              type="password"
              placeholder="password"
              className="user-input rounded-md w-full mt-2"
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
            )}
          </div>
          <input
            type="submit"
            value="SIGN IN"
            className="all-btn signin-button rounded text-white text-xs font-semibold py-2.5 px-36 my-5 mx-4 lg:mx-6"
          />
        </form>
        <div className="create-account mt-6">
          <p className="text-fuchsia-600 text-xs font-semibold">
            Do you have an account yet?
          </p>
          <Link to="/signup">
            <p className="text-green text-xs font-semibold mt-1">
              Create an account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
