


import React,{ useState,useEffect,useContext } from "react"
import Nav from './components/Nav'
import axios from 'axios'
import Side from './components/Side'
import Footer from './components/Footer'
import { FaUserAlt } from "react-icons/fa"
import { useParams } from 'react-router-dom';
import Comment from './components/Comment'
import { UserDataContext } from "./components/Usercontext"

function Blog(props){
    const [blog, setblog] = useState(null)
    const {user} = useContext(UserDataContext)
    const {id} = useParams()
    const [coms, setComs] = useState(null)
    
    useEffect(() => {
        async function fetchBlog(){
                const response = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}`)
                setblog(response.data)
            }
        
        fetchBlog()
    }, [])

    useEffect(() => {
        {blog && 
            setComs(blog.Comments[0].map((comment, index)=>{
                return(
                <Comment
                key={index} 
                name={comment.name}
                body={comment.body}
                replies={comment.replies}
                complete={comment.complete}
                />
                )
            }))
        }
    }, [blog])

    return(
        <div>
            <div className="main-container">
                <Nav />
                <div className="mid-section">
                    <Side />
                    {
                    blog==null ? <div><h2>Loading.....</h2></div> :
                    <div className="blog-body">
                        <div className="blog-info">
                            <FaUserAlt className="user-icon"/>
                            <div className="right">
                                <h4 className="auth">{blog.Author}</h4>
                                <div className="bot">
                                    <h5 className="cat">{blog.Category}</h5>
                                    <h6 className="dat">{blog.Date}</h6>
                                </div>
                            </div>
                        </div> 
                        <div className="m-img" style={{background: `url(${blog.Mainimg})`}}></div>
                        <h1 className="blog-title">{blog.Title}</h1>
                        <div className="cont">
                            <div dangerouslySetInnerHTML={{ __html: blog.Blogdata }} />
                        </div>
                        
                        <div className="comments">
                            <h2>Comments</h2>
                            <Comment
                            id={id} 
                            name={user.username}
                            comments={blog.Comments}
                            replies={blog.replies}/>
                            {coms}
                        </div>
                    </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Blog