import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import image1 from '../../Images/image1.jpeg'

const Blog = ({blog, refetch}) => {
    const {_id,title,details,author}=blog;
    return (
        <div className='flex mb-20 blog'>
            <div>
                <img className='blog-img' src={image1} alt="" />
            </div>
            <div className='content'>
            <Link to={`/blog/${_id}`}><h2 className='blog-title text-xl font-semibold'>{title}</h2></Link>
            <p className="text-slate-400 text-sm my-2">{author.name}</p>
                <p className='blog-content text-sm py-1'>{details}</p>
                <Link to={`/blog/${_id}`}><button className="all-btn rounded-full text-xs text-white font-semibold px-3 py-2 mt-5">
          Read more
        </button></Link>
                    {/* <p className='text-xs mt-1'>Date</p> */}
               
            </div>
        </div>
    );
};

export default Blog;