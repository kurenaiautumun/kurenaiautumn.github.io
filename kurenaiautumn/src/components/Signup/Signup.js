import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTItle';
import './Signup.css'


const Signup = () => {
  const [error,setError]=useState('');
  useTitle("Signup")
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const handleSignup = (data) =>{
        
      fetch("http://100.25.166.88:8080/signup", {
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
      }

console.log(error)
    return (
      
      <div className='inner-div'>
      <div className="justify-center">
      <form className="signup-div rounded-md" onSubmit={handleSubmit(handleSignup)}>
        
        <div className="header flex justify-between py-3">
          <p className="text-fuchsia-700 text-xs font-semibold ml-4">NOT A MEMBER !</p>
          {/* <p className="text-gray text-xs font-semibold mr-4">Need help?</p> */}
        </div>
        <div className="form-control w-full px-6 mt-4">
        <input
            {...register("username", { required: "Enter your username" })}
            type="text"
            placeholder="username"
            className="user-input rounded-md w-full my-2"
          />
          {errors.username && (
            <span className="text-red-500 text-xs">{errors.username.message}</span>
          )}
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
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <input
          type="submit"
          value="SIGN UP"
          className="all-btn rounded text-white text-xs font-semibold py-2.5 px-36 m-6"
        />      
        <p className="text-danger">{error}</p>
      </form>
      <div className="create-account mt-6">
    <p className="text-fuchsia-600 text-xs font-semibold">Already have an account?</p>
      <Link to='/signin'><button className="all-btn rounded-full text-xs text-white font-semibold px-3 py-2 mt-2">
          Sign in
        </button></Link>
    </div>
    </div>     
      </div>
 
    );
};

export default Signup;