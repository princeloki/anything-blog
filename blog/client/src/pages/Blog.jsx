


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
        if(blog){ 
            const Comments = blog.Comments.length == 0 ? blog.Comments : blog.Comments[0] 
            const mappedComms = (Comments.map((comment, index)=>{
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
            setComs(mappedComms)
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
                        <h2 className="blog-title">{blog.Title}</h2>
                        <div className="blog-info">
                            {blog.userImg ? <img src={blog.userImg} /> : <FaUserAlt className="user-icon"/>}
                            <div className="right">
                                <h4 className="auth">by {blog.Author}</h4>
                                <div className="bot">
                                    <h5 className="cat">{blog.Category}</h5>
                                    <h6 className="dat">{blog.Date}</h6>
                                </div>
                            </div>
                        </div> 
                        <div className="m-img" style={{background: `url(${blog.Mainimg})`}}></div>
                        <div className="cont">
                            <div dangerouslySetInnerHTML={{ __html: blog.Blogdata }} />
                        </div>
                        
                        <div className="comments">
                            <h2>Comments</h2>
                            <Comment
                            id={id} 
                            name={user.username}
                            comments={blog.Comments}/>
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