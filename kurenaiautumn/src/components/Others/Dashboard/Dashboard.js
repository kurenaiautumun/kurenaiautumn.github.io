import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';

const Dashboard = () => {
  //const [user, setUser] = useState([]);
  //useEffect(() => {
  //  const user = JSON.parse(localStorage.getItem('user'));
  //  setUser(user)
  //  AllBlogs(user);
  //}, []);

  const { userid } = useParams();

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
          .then((data) => (console.log(data)))
          .catch((err) => console.error(err));
    }
    AllBlogs(userid)
    return (
        <div>
            <p>This is dashboard</p>
        </div>
    );
};

export default Dashboard;