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
    let count = 0
    let body = blogs.map((value)=>{
      if (value["title"]){
        count = count + 1;
        if (count>4){
          return null
        }
        let url = `../blog/${value["_id"]}`
        return (
        <div class="col-sm-3" style={{marginBottom: "20px"}}>
            <div class="row" style={{marginLeft: "20px"}}> 
            <div class="col-sm-12">
              <div>
                <img src={value["titleImage"]} style={{width:"200px", height: "200px"}}></img>
              </div><br></br>
                <a href={url} onClick={() => window.location.reload(false)}>
                  <h5 style={{width:"100%", color: "black", overflow: "hidden"}}>{value['title']}</h5>
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
    <div class="container-fluid" style={{width: "100%", marginTop:"10px"}}>
      <h6>Continue reading more articles by our writers</h6>
      <PlotBlogs />
    </div>
  )
};

export default Recommendations;