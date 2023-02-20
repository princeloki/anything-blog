

import React from 'react';
import Item from './Item'
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
            </div>
            <div className="side">
                <h2>Popular Categories</h2>
                    <div className="cats">
                        <a className="extra" href="#">Travel</a>
                        <a className="extra" href="#">Fashion</a>
                        <a className="extra" href="#">Lifestyle</a>
                        <a className="extra" href="#">Technology</a>
                        <a className="extra" href="#">Relationships</a>
                    </div>
            </div>
        </div>
    )
}

export default Main