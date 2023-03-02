import React, { useState } from 'react';
import { useEffect } from 'react';
// import { useQuery } from 'react-query';

const Dashboard = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
  }, []);
    console.log(user["_id"])

    useEffect(() => {
        AllBlogs();
    }, []);

    function AllBlogs(){
        fetch(`http://100.25.166.88:8080/dashboard/${user["_id"]}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => (console.log(data)))
          .catch((err) => console.error(err));
    }
    return (
        <div>
            <p>This is dashboard</p>
        </div>
    );
};

export default Dashboard;