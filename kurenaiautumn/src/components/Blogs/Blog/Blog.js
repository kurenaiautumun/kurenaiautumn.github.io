import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import parse from 'html-react-parser';

const Blog = ({blog, handleSaveButton, handleUnsaveButton}) => {
    const {_id,title,details,author,image_url, isSaved}=blog;
 
    return (
        <div className='flex mb-20'>
            <div>
                <img className='blog-img' src={image_url} alt="" />
            </div>
            <div className='content'>
            <Link to={`/blog/${_id}`}><h2 className='blog-title text-xl font-semibold'>{title}</h2></Link>
            <p className="text-slate-400 text-sm my-2">{author?.name}</p>
                <p className='blog-content text-sm py-1'>{parse(details)}</p>
                <Link to={`/blog/${_id}`}><button className="all-btn rounded-full text-xs text-white font-semibold px-3 py-2 mt-5">
          Read more
        </button></Link>
        {
            isSaved === "saved"? <button onClick={() =>handleUnsaveButton(_id)} className='mx-4 text-slate-400 text-xs'> Saved</button> : <button onClick={() =>handleSaveButton(_id)} className='mx-4'><i class="fa-regular fa-bookmark"></i></button>
        }
                    {/* <p className='text-xs mt-1'>Date</p> */}
               
            </div>
        </div>
    );
};

export default Blog;