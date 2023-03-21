import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar/Navbar';
import { useState, useEffect } from 'react';

const Main = () => {
    //let id;
    return (
        <div style={{width: "100%"}}>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;