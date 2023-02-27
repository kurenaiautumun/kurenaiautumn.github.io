import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar/Navbar';

const Main = () => {
    //let id;
    let userid=''
    console.log(window.location.pathname)
    userid = window.location.pathname.split('/')[1]
    console.log("user id = ", userid)
    return (
        <div>
            <Navbar id={userid}></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;