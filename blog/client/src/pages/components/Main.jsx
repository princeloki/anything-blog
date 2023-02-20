

import React from 'react';
import Item from './Item'
import Side from './Side'
import { useMemo,useEffect, useContext,useState } from 'react'
import { BlogDataContext } from './Blogscontext';

function Main(props){
    const {blogs} = useContext(BlogDataContext)
    const [items, setItems] = useState([])

    const memoizedItems = useMemo(()=>{
        return blogs.map((blog, index)=>{
            return (
                <Item 
                key={index}
                blog={blog}
                />
            )
        })
    },[blogs])

    useEffect(() =>{
        setItems(memoizedItems)
    },[memoizedItems])
    
    return(
        <div className="mid-section">
            <div className='body-section'>
                {items}
                <Side />
            </div>
        </div>
    )
}

export default Main