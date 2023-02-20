

import React,{ useContext,useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { UserDataContext } from './Usercontext';
import axios from 'axios'

function Item(props){
    const {user, setUser} = useContext(UserDataContext)
    const [blog, setBlog] = useState(null)

    const handleClick = async ()=>{
        const response = await axios.get(`http://127.0.0.1:3000/api/blogs/${props.blog._id}`)
        const data = await response
        console.log(data)
        setBlog(data) 
    }

    return(
        <a href="#" onClick={handleClick} className="item-container">
            <div className="item-box" style={{background: `url(${props.blog.Mainimg})`}}>
                <div className="article-header">
                    <h2 className="category">{props.blog.Category}</h2>
                    <h1 className="article-title">{props.blog.Title}</h1>
                    <div className="article-info">
                        {user.image? <img className="author-img" src={user.image}/> : <FaUserAlt className="author-img"/>}
                        <p className="author">By {props.blog.Author}</p>
                        <p className="date">{props.blog.Date}</p>
                    </div>
                </div>
            </div>
        </a>   
    )
    
}

export default Item

