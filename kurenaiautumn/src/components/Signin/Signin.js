import React from "react";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleLogin = (data) => console.log(data);

  return (
    <div className="main-div">
      <div className="justify-center">
        <form
          className="form-div rounded-md"
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
              className="user-input rounded-md w-full my-2 lg:mt-7"
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
            value="SIGN IN"
            className="form-signin all-btn rounded text-white text-xs font-semibold"
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
