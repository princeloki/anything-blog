

import React,{ useState,useContext } from "react"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { UserDataContext } from "./components/Usercontext"
import { FaUserAlt } from "react-icons/fa"

function Profile(){
    const [option, setOption] = useState(null)
    const [editing, setEditing] = useState(false)
    const [switchTo, setSwitchTo] = useState(null)
    const {user} = useContext(UserDataContext)

    const setSide = () =>{
        if(option == "Edit"){
            return(<Edit />)
        } else if(option == "Help"){
            return(<Help />)
        } else{
            return(<Account />)
        }
    }

    const Account = () =>{
        return(
            <div className="prof-page">
                <h1 className="prof-h1">Account Information</h1>
                <div className="prof-img-sec">
                    {user.image ? <img src={user.image} alt="Profile Image" /> : <FaUserAlt />}
                    {user.image ? <button>Change</button> : <button>Upload</button>}
                </div>
                <div className="prof-info">
                    <h4 className="prof-item">Name: {user.name}</h4>
                    <h4 className="prof-item">Username: {user.username}</h4>
                    <h4 className="prof-item">Email: {user.email}</h4>
                </div>
            </div>
        )
    }

    const Edit = () =>{
        return(
            <div className="prof-page">
                <h1 className="prof-h1">Edit</h1>
                <div className="sec-item-row">
                    {switchTo=="username" ? 
                    <input className="prof-input" type="text" placeholder="...Enter new username"/> :
                    <h4 className="prof-item">Username: {user.username}</h4> 
                    }
                    <a className="prof-tag" onClick={()=>{
                        setEditing(true)
                        setSwitchTo("username")
                    }} href="#">Change Username</a>
                </div>
                <div className="sec-item-row">
                    {switchTo=="password" ? 
                        <input className="prof-input" type="text" placeholder="...Enter new password"/>:
                        <h4 className="prof-item">Pasword: *********</h4>
                    }
                    <a className="prof-tag" onClick={()=>{
                        setEditing(true)
                        setSwitchTo("password")
                    }} href="#">Change Password</a>
                </div>
                {editing && 
                <button onClick={()=>{
                    setEditing(false) 
                    setSwitchTo(null)}}>
                        Save Changes
                </button>}
            </div>
        )
    }

    const Help = () =>{
        return(
            <div className="prof-page">
                <h1 className="prof-h1">Help</h1>
            </div>
        )
    }

    return(
        <div>
            <div className="main-container">
                <div className="page-def">
                    <div className="container">
                        <h1 className='head default'>Profile</h1>
                        <div className="separator">
                            <div className="side-bar">
                                <a onClick={()=>setOption("Account")}href="#">Account Info</a>
                                <a onClick={()=>setOption("Edit")} href="#">Edit</a>
                                <a onClick={()=>setOption("Help")} href="#">Help</a>
                            </div>
                            <div className="main-prof">
                                {setSide()}
                            </div>
                        </div>
                    </div>
                </div>
                <Nav />
            </div>
            <Footer />
        </div>
    )
}

export default Profile