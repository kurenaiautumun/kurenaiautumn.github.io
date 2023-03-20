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

const Signout = () => {

  console.log("in sign out")
  const navigate = useNavigate();

  useTitle("Sign Out")
    fetch(`${process.env.REACT_APP_URL}/logout`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if(data.message!== null){
            toast.success(data.message)
            localStorage.setItem('user', JSON.stringify(null));
            console.log('user id set to empty')
            navigate("/")
            window.location.reload(false);
          }
        })
        .catch((err) => {
      console.error(err)
      if(err){
        toast.error(err)
      }
  });


  return (
    <div>You have been successfully Logged out</div>
  );
};

export default Signout;