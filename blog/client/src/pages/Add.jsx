

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

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const [dayOfWeek, dateString] = formattedDate.split(', ');

    const date = `${dayOfWeek}, ${dateString}`;

    const {user} = useContext(UserDataContext)
    const [blogData, setBlogData] = useState({
        Title: "",
        Author: user.name,
        Date: date,
        Category: "",
        Mainimg: "",
        Blogdata: ""
    })

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [posted, setPosted] = useState(false)

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
            setPosted(true)
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
                <div className="page-def">
                    <div className="container">
                        <h1 className='head default'>Blog Maker</h1>
                        {!posted ? (
                        <form onSubmit={postBlog}>
                            <label htmlFor="Title">Title</label>
                            <input className="in-text" onChange={(e)=>handleChange(e)} value={blogData.Title} id="Title" name="Title" type="text" placeholder="...Enter Blog name here"/>
                            <label htmlFor="Category">Category
                            <select value={blogData.Category} name="Category" id="Category"  onChange={(e)=>handleChange(e)} >   
                                <option>--Choose Category--</option>
                                <option value="Music">Music</option>
                                <option value="Travel">Travel</option>
                                <option value="Tech">Tech</option>
                                <option value="Relationships">Relationships</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Fashion">Fashion</option>
                                <option value="DIY">DIY</option>
                            </select>
                            </label>
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
                        )
                        : (
                        <div className="success-post">
                            <h1>Blog Posted Successfully!</h1>
                            <a href="/">Click here to return to the main page</a>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Add