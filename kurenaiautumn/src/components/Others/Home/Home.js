import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';
import { Link } from "react-router-dom";

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
      let url = `blog/${value["_id"]}`
      return (
      <div>
        <Link to={url}>{value['title']}</Link>
        <li>{value["userId"]}</li>
        <li>{value["_id"]}</li>
      </div>
    )});

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
    fetch(`http://100.25.166.88:8080/`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {console.log(data); setBlogs(data); setConfirm(1)})
  }
  return (
    <div>
      <h1>Homepage</h1>
      <PlotBlogs />
    </div>
  )
};

export default Home;