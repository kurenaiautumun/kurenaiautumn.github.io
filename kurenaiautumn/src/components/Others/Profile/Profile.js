import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Profile.css'

const Profile = () => {
    return (
        <div className='profile'>
            <p className='font-bold text-3xl mt-8'>User Name</p>
            <div className='mt-5 flex justify-between'>
                <div>
                <Link to="/profile" className='mr-5 text-gray-500 editProfile-nav-item'>Home</Link>
                <Link to="/profile/about" className='text-gray-500 editProfile-nav-item'>About</Link>
                </div>
                <button className='bg-fuchsia-600 rounded-full text-xs text-white font-semibold px-3 py-2 mb-2'>Get Unlimited Access</button>
            </div>
            <hr />
            <Outlet></Outlet>
        </div>
    );
};

export default Profile;