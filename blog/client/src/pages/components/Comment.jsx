import React,{useState,useContext} from 'react';
import { FaUserAlt } from "react-icons/fa"
import { UserDataContext } from './Usercontext';
import axios from 'axios';

function Comment(props){
    const id = props.id ? props.id : ""
    const {user} = useContext(UserDataContext)
    const [comment, setComment] = props.comments ? useState(props.body) : useState("")

    const comments = props.comments ? props.comments : []
    const replies = props.replies ? props.replies : []
    const [formData, setFormData] = useState({
        name: user.username,
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
        comments[0].push(formData)
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
                <FaUserAlt />
            </div>}
            <form onSubmit={addComment}>
                <div className="com-mid">
                    {props.complete && <p className="com-user"><br/>{props.name}</p>}
                    {props.complete==true ? <p className="comment-paragraph">{props.body}</p> : 
                    <textarea onChange={handleChange} 
                    value={formData.body} name="body" className="comment-input" 
                    placeholder="...Add a comment"/>}
                </div>
                {props.complete && <button onClick={addReply}>Reply</button>}
                {!props.complete && <button type='submit'>Comment</button>}
            </form>
        </div>
    )
}

export default Comment