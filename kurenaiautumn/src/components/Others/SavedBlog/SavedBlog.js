import React from 'react';
import './SavedBlog.css'

const SavedBlog = () => {
    return (
        <div className='saved-blog'>
            <div className='flex'> 
            <img className='author-img mr-3' src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=996&t=st=1674753568~exp=1674754168~hmac=e9bb323fadf786dcd26672d9f42e7b94271f0819e97a9e5ebbea54dd2fa3f40a" alt="author-img" />
            <p className='text-sm'>Allison</p>
            </div>
            <h2 className='font-bold my-3'>Lorem ipsum dolor sit amet consectetur</h2>
            <p className='blog-text mb-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat minus dolorum obcaecati quos consectetur, rem perferendis, doloribus ipsa dolores repudiandae hic consequatur cumque ad praesentium et, molestias fuga ab dolore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat minus dolorum obcaecati quos consectetur, rem perferendis, doloribus ipsa dolores repudiandae hic consequatur cumque ad praesentium et, molestias fuga ab dolore.</p>
            <div>
                <span className='bg-slate-100 text-xs py-1 px-2 rounded '>category</span>
            </div>
        </div>
    );
};

export default SavedBlog;