import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query';

const Dashboard = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
    AllBlogs(user["_id"]);
  }, []);

  //const { userid } = useParams();

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
        <div>
          <div>
            <Link to={url}>{value['title']}</Link>
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

function Welcome(){
  if (user){
    return (
      <h2>Welcome, <p style={{color: "red", display: "inline"}}>{user["username"]}</p></h2>
    )
  }
}

useEffect(() => {
  setConfirm(0);
  AllBlogs();
  }, []);

    function AllBlogs(user){
        console.log("user id in allBlogs dashbiard= ", user)
        console.log(`https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/dashboard/${user}`)
        fetch(`https://usershtttps-1398927084.us-east-1.elb.amazonaws.com/dashboard/${user}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => (console.log(data), setBlogs(data.blogs)))
          .catch((err) => console.error(err));
    }
    //AllBlogs(user)
    return (
        <div>
            <Welcome />
            <PlotBlogs />
        </div>
    );
};

export default Dashboard;