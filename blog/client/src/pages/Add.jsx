

import Nav from "./components/Nav"
import React, { useEffect,useState,useContext } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserDataContext } from "./components/Usercontext"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer"

function Add(){
    const navigate = useNavigate();
    // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const [dayOfWeek, dateString] = formattedDate.split(', ');

    const date = `${dayOfWeek}, ${dateString}`;

    const {user, setUser} = useContext(UserDataContext)
    const [blogData, setBlogData] = useState({
        Title: "",
        Author: user.name,
        Date: date,
        Category: "",
        Mainimg: "",
        Blogdata: ""
    })

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    useEffect(() => {
        if (user) {
            setBlogData(prevBlogData => ({
                ...prevBlogData,
                Author: user.name,
            }));
        }
    }, [user, blogData.Mainimg]);

    function postBlog(e){
        e.preventDefault();
        axios.post("http://127.0.0.1:3000/api/blogpost", blogData)
        .then(data => {
            console.log(data.data.message);
            navigate("/", {replace: true});
        })
        .catch(err => {
            console.log(err);
        })
    }   

    function handleChange(e){
        setBlogData(prevBlogData=>{
            return{
            ...prevBlogData,
            [e.target.name]: e.target.value
        }
    })
    }

    function handleEditor(e, value){
        setBlogData(prevBlogData=>{
            return{
                ...prevBlogData,
                Blogdata: value
            }
        })
    }
    function uploadAdapter(loader) {
        return {
            upload: async () => {
                const data = new FormData();
                data.append('img', await loader.file);
    
                try {
                    const response = await axios.post('http://127.0.0.1:3000/api/upload', data);
                    const imageURL = response.data;
    
                    return { default: imageURL };
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

    function uploadImage(e){
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("img", file);
        formData.append("name", file.name);
        axios.post("http://127.0.0.1:3000/api/upload", formData)
        .then(response => {
            const imageURL = response.data;
            setUploadedImageUrl(imageURL);
            setBlogData(prevBlogData =>{
                return {
                    ...prevBlogData,
                    Mainimg: imageURL
                }
            })
        })
    }

    return(
        <div>
            <div className="main-container">
                <Nav />
                <div className="blog-maker-page">
                    <div className="container">
                        <form onSubmit={postBlog}>
                            <h1 className='head default'>Blog Maker</h1>
                            <label htmlFor="Title">Title</label>
                            <input className="in-text" onChange={(e)=>handleChange(e)} value={blogData.Title} id="Title" name="Title" type="text" placeholder="...Enter Blog name here"/>
                            <label htmlFor="Category">Category</label>
                            <input className="in-text"  onChange={(e)=>handleChange(e)} value={blogData.Category} id="Category" name="Category" type="text" placeholder="...Enter Blog type here"/>
                            <div className="upload-info">
                                <input type="file" accept="image/*" onChange={(e)=>uploadImage(e)} className="upload"/>
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

                            <button type="submit" className="blog-button">Post</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Add