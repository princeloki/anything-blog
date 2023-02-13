 import Nav from "./components/Nav"
import React, { Component,useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Add(){
    const [blogData, setBlogData] = useState({
        Category: "",
        blogData: []
    })

    function postBlog(){
        console.log(blogData)
    }   

    function handleChange(e){
        setBlogData(prevBlogData=>{
            return{
            ...prevBlogData,
            [e.target.name]: e.target.value
        }
    })
    }

    return(
        <div className="blog-maker-page">
            <Nav />
            <h1 className='head default'>Blog Maker</h1>
            <label htmlFor="Category">Category</label>
            <input onChange={(e)=>handleChange(e)} value={blogData.Category} id="Category" name="Category" type="text" placeholder="...Enter Blog type here"/>
            <Editor />
            <button className="blog-button" onClick={postBlog}>Post</button>
        </div>
    )
}

export default Add