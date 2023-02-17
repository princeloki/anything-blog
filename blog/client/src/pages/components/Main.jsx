

import React from 'react';
import Item from './Item'
import { useEffect, useContext,useState } from 'react'
import { BlogDataContext } from './Blogscontext';

function Main(props){
    const {blogs, setBlogs} = useContext(BlogDataContext)
    const [items, setItems] = useState([])

    useEffect(() =>{
        const bgs =blogs.map((blog, index)=>{
            return(
            <Item 
            key={index}
            blog={blog} 
            />
            )
        })
        setItems(bgs)
    },[blogs])
    
    return(
        <div className='body-section'>
            {items}
        </div>
    )
}

export default Main