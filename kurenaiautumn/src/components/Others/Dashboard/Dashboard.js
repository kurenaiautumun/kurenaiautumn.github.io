import React from 'react';
import { useEffect } from 'react';
// import { useQuery } from 'react-query';

const Dashboard = () => {
    let userid = document.getElementById('userid').innerText;
    console.log(userid)

    useEffect(() => {
        //setArray({});
        //setComments({});
        AllBlogs();
    }, []);

    function AllBlogs(){
        fetch(`http://100.25.166.88:8080/dashboard/${userid}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => (console.log(data.user)))
          .catch((err) => console.error(err));
    }
    return (
        <div>
            <p>This is dashboard</p>
        </div>
    );
};

export default Dashboard;