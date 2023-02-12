import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faM, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext,useState } from "react"
import { UserDataContext } from "./Usercontext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Nav({type, username}){
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserDataContext)

    function logout(){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/login", {replace: true})
        window.location.reload()
    }

    return(
        <nav>
            <ul>
                <a href="#"><h1 className="logo">aNyThNG</h1></a>
                <div className="links">
                    {user.username && <a href="feed">Feed</a>}
                    {user.type=="Creator" && <a href="add">Add</a>}
                    {user.username && <a href="profile">Profile</a>}
                    <a href={user.username ? "#" : "Login"} onClick={user.username ? logout : null}>{user.username ? "Logout" : "Sign In"}</a>
                    {!user.username && <a href="Register">Register</a>}
                </div>
                
                <div className="search-bar">
                    {type!="Creator" &&
                        <div className="search-sub">
                            <button className="subscribe-button">Subscribe</button>
                            <input type="text" placeholder="..Search for blogs" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    }
                    {user.username && <FontAwesomeIcon icon={faUser} />}
                </div>
            </ul>
        </nav>
    )
}

export default Nav