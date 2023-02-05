import React from 'react';
import Blog from '../Blog/Blog';
import './Blogs.css'

const Blogs = () => {

    return (
        <div className='blogs'>
            <p className='heading mb-2 text-3xl font-bold'>Recent Posts</p>
            <hr className='mb-10'/>
            <Blog></Blog>
            <Blog></Blog>
            <Blog></Blog>
        </div>
    );
};

export default Blogs;