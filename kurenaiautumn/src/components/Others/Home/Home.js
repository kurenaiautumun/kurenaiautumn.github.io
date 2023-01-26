import React from 'react';
import user from '../../img/user.png';
import SavedBlog from '../SavedBlog/SavedBlog';
import './Home.css';

const Home = () => {
    return (
        <div>
            <div className="user-details flex mt-5">
            <img className='user-img mr-5' src={user} alt=""></img>
            <div>
            <p>user name</p>
            <p className='text-xs'>2 blogs</p>
            </div>
            </div>
            <h2 className='text-xl font-semibold mt-7'>Reading list</h2>
            <SavedBlog></SavedBlog>
            <SavedBlog></SavedBlog>
        </div>
    );
};

export default Home;