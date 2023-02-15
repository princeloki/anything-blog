

import Nav from "./components/Nav"
import React, { Component,useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'

function Add(){
    const [blogData, setBlogData] = useState({
        Title: "",
        Category: "",
        mainImg: "",
        blogData: ""
    })

    function postBlog(){
        console.log(blogData.blogData)
    }   

    function handleChange(e){
        console.log(blogData)
        setBlogData(prevBlogData=>{
            return{
            ...prevBlogData,
            [e.target.name]: e.target.value
        }
    })
    }

    function handleEditor(e, value){
        console.log(blogData.blogData)
        setBlogData(prevBlogData=>{
            return{
                ...prevBlogData,
                blogData: value
            }
        })
    }

    function uploadAdapter(loader){
        return {
            upload: async () => {
              const data = new FormData();
              data.append("name", await loader.file.name)
              data.append('img', await loader.file);
        
              try {
                const response = await axios.post('http://127.0.0.1:3000/api/upload', data);
                return {
                  default: response.data.url
                };
              } catch (error) {
                console.error(error);
                throw new Error('Could not upload file.');
              }
            }
          };
    }

    function uploadPlugin(editor){
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>{
            return uploadAdapter(loader);
        }
    }

    return(
        <div>
            <Nav />
            <div className="blog-maker-page">
                <div className="container">
                    <h1 className='head default'>Blog Maker</h1>
                    <label htmlFor="Title">Title</label>
                    <input onChange={(e)=>handleChange(e)} value={blogData.Title} id="Title" name="Title" type="text" placeholder="...Enter Blog name here"/>
                    <label htmlFor="Category">Category</label>
                    <input onChange={(e)=>handleChange(e)} value={blogData.Category} id="Category" name="Category" type="text" placeholder="...Enter Blog type here"/>
                    <div className="upload-info">
                        <button className="upload">Upload main image</button>
                        <p></p>
                    </div>

                    
                <div className='ckeditor'>
                    <CKEditor
                        editor={ ClassicEditor }
                        config={{
                            extraPlugins: [uploadPlugin]
                        }}
                        onChange={ ( e, editor ) => {
                            handleEditor(e, editor.getData());
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>

                    <button className="blog-button" onClick={postBlog}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Add