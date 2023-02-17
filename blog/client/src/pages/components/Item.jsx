import React,{ useContext } from "react"
import { FaUserAlt } from "react-icons/fa"
import { UserDataContext } from './Usercontext';

function Item(props){
    const {user, setUser} = useContext(UserDataContext)

    return(
        <div className="item-container">
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
        </div>   
    )
    
}

export default Item

