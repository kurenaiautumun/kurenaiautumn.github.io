import { useEffect, useState } from "react";
import { json } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState([]);

    const register = () => {
        const body = {
            "username": "admin12345",
            "password": "admin"
          }
        return fetch(
        'http://100.25.166.88:8080/signup',
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
              },
            body:  JSON.stringify(body)
        }
    )
    .then((response) => response.json())
    .then((data)=>console.log('logged in = ', data))
    }

    
    const login = () => {
        const body = {
            "username": "admin123",
            "password": "admin"
          }
        return fetch(
        'http://100.25.166.88:8080/login',
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
              },
            body: JSON.stringify(body),
        }
    )
    .then((response) => response.json())
    .then((data)=>console.log('logged in = ', data))
    }

    const fetchData = () => {
        return fetch(
            "http://100.25.166.88:8080/dashboard/63edb20dbc6eeaedb267112a",
            {
                method: "GET",
                credentials : "include",
            })
            .then((response) => response.json())
            .then((data) => console.log('data =', data));//setUser(data))
      }
    
      useEffect(() => {
        //register();
        let data = login();
        setTimeout(() => {
            fetchData();
          }, 5000);
      },[])
}

export default Dashboard;