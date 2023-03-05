

import React,{useState,useContext} from 'react';
import { FaUserAlt } from "react-icons/fa"
import { UserDataContext } from './Usercontext';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import { ImReply } from "react-icons/im";

 
function Comment(props){
    const id = props.id ? props.id : ""
    const {user} = useContext(UserDataContext)

    const name = user.type == "Creator" ? user.name : user.username
    const comments = props.comments ? props.comments : []
    const replies = props.replies ? props.replies : []
    const [formData, setFormData] = useState({
        name: name,
        image: user.image,
        body: "",
        replies: replies,
        complete: true
    })

    function handleChange(e){
        setFormData(prevFormData=>{
            return{
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    function addComment(e){
        e.preventDefault()
        comments.length !=0 ? comments[0].push(formData) : comments.push(formData)
        formData.body ?
        axios.post(`http://127.0.0.1:3000/api/comment/${id}`, comments)
        .then(message=>{
            location.reload();
        })
        .catch(err=>{
            console.log(err)
        })
        : alert("Enter a comment")
    }

    function addReply(){
        console.log("replies")
    }

    return(  
        <div className="com">
            {props.complete &&
            <div className="identity">
                {props.image ? <img src={props.image} /> : <FaUserAlt />}
            </div>}
            {!props.complete ? (
                <form onSubmit={addComment}>
                    <div className="com-mid">
                    {props.complete && <p className="com-user"><br/>{props.name}</p>}
                    {props.complete==true ? (
                        <p className="comment-paragraph">{props.body}</p>
                    ) : (
                        <textarea
                        onChange={handleChange} 
                        value={formData.body}
                        name="body"
                        className="comment-input" 
                        placeholder="...Add a comment"
                        />
                    )}
                    </div>
                    {!props.complete && <button className="submit-b" type="submit"><IoSend/></button>}
                </form>
                ) : (
                <div className="com-mid">
                    <p className="com-user"><br/>{props.name}</p>
                    <p className="comment-paragraph">{props.body}</p>
                </div>
                )
            }

        </div>
    )
}

export default Comment