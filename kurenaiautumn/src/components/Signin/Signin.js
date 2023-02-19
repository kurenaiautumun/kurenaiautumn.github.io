import React, { useState } from "react";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTItle";

const Signin = () => {
  const [error,setError]=useState('');


  useTitle("Login")
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleLogin = (data) => {
    fetch("http://100.25.166.88:8080/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
      console.error(err)
    setError(err.message);
  });
  };

  console.log(error)

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
              {...register("email", { required: "Enter your email" })}
              type="text"
              placeholder="Email"
              className="user-input rounded-md w-full my-2"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
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
            value="LOG IN"
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
