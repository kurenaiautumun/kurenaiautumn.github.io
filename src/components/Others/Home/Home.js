import React from 'react';
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
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
        let url = `blog/${value["_id"]}`
        return (
        <div class="row" style={{marginLeft: "20px"}}> 
          <div>
            <Link to={url}><h3 style={{float:"left", width:"100px", color: "#FA013D"}}>{value['title']}</h3></Link>
          </div>
          <img src={value["titleImage"]} style={{width:"200px", height: "200px"}}></img>
        </div>
    )}});

    console.log("body = ", body)

    return (
      <div>
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
    fetch(`${process.env.REACT_APP_URL}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {console.log(data); setBlogs(data); setConfirm(1)})
  }
  return (
    <div class="container-fluid" style={{opacity: "1"}}>
      <div class="row">
        <h1 style={{float: "right", width: "60%", textAlign: "right"}}>Autumn Kurenai</h1>
        <img style={{width:"60px", height:"44px", float:"left"}} src="https://kurenai-image-testing.s3.ap-south-1.amazonaws.com/logow+(1).jpeg"></img>
      </div>
      <PlotBlogs />
    </div>
  )
};

export default Home;