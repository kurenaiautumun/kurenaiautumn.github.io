import React from 'react';
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Recommendations = () => {
  const [blogs, setBlogs] = useState([])
  const [confirm, setConfirm] = useState(0)

  function PlotBlogs(){
    console.log("confirm = ", confirm)
    if (confirm==0){
      console.log("confirm is 0")
    }
    console.log("plotBlogs = ", blogs)
    let body = blogs.map((value)=>{
      if (value["title"]){
        let url = `../blog/${value["_id"]}`
        return (
        <div class="col-sm-4">
            <div class="row" style={{marginLeft: "20px"}}> 
            <div class="col-sm-6">
                <img src={value["titleImage"]} style={{width:"100px", height: "100px"}}></img>
            </div>
            <div class="col-sm-6">
              <a href={url}>
                <h5 style={{float:"left", width:"100%", color: "#FA013D", overflow: "hidden"}}>{value['title']}</h5>
            </a>
            </div>
            </div>
        </div>
    )}});

    console.log("body = ", body)

    return (
      <div class="row">
        {body}
      </div>
    )
}

  const b=[]
  const c=0

  useEffect(() => {
    setConfirm(0);
    GetAllBlogs();
    }, []);
  async function GetAllBlogs(){
    fetch(`${process.env.REACT_APP_URL}/random?limit=6`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {console.log(data); setBlogs(data); setConfirm(1)})
  }
  return (
    <div class="container-fluid" style={{width: "82%"}}>
      <PlotBlogs />
    </div>
  )
};

export default Recommendations;