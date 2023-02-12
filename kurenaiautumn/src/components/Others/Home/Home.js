import React from 'react';
import { useQuery } from 'react-query';
import user from '../../img/user.png';
import SavedBlog from '../SavedBlog/SavedBlog';
import './Home.css';

const Home = () => {
    const {
        data: blogs = [],
        isLoading,
      } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
          const result = await fetch("http://localhost:5000/blogs");
          const data = await result.json();
          return data;
        },
      });
      
    
    return (
        <div>
            <div className="user-details flex mt-5">
            <img className='user-img mr-4' src={user} alt=""></img>
            <div>
            <p>user name</p>
            {/* <p className='text-xs'>2 blogs</p> */}
            </div>
            </div>
            <h2 className='text-xl font-semibold mt-10'> Saved Blog </h2>
            {
                blogs.map(saved => <SavedBlog saved={saved} key={saved._id}></SavedBlog>)
            }
        </div>
    );
};

export default Home;