import React from 'react';
import './Blog.css'

const Blog = () => {
    return (
        <div className='flex mb-20'>
            <div>
                <img className='blog-img' src="https://images.unsplash.com/photo-1674755615363-f0c5653beb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />
            </div>
            <div className='content'>
                <h2 className='blog-title text-xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, et?</h2>
                <p className='blog-content text-sm py-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis aspernatur eligendi reprehenderit eaque, omnis quis dicta ut, aut ipsum maiores dolore numquam ipsa vero ab impedit, sapiente tempora possimus corrupti!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis aspernatur eligendi reprehenderit eaque, omnis quis dicta ut, aut ipsum maiores dolore numquam ipsa vero ab impedit, sapiente tempora possimus corrupti!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis aspernatur eligendi reprehenderit eaque, omnis quis dicta ut, aut ipsum maiores dolore numquam ipsa vero ab impedit, sapiente tempora possimus corrupti!</p>
                <button className="signup-btn rounded-full text-xs text-white font-semibold px-3 py-2 mt-5">
          Read more
        </button>
        
                    <p className='mt-24 text-xs'>Author</p>
                    <p className='text-xs mt-1'>Date</p>
               
            </div>
        </div>
    );
};

export default Blog;