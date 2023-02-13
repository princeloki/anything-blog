import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faM, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FaUserAlt } from "react-icons/fa"
import { useContext,useState } from "react"
import { UserDataContext } from "./Usercontext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Nav({type, username}){
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserDataContext)
    const [active, setActive] = useState("inactive")

    function logout(){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/login", {replace: true})
        window.location.reload()
    }

    function show(){
        console.log("logging")
        active == "inactive" ? setActive("active") : setActive("inactive")
    }

    return(
        <nav>
            <ul>
                <a href="#"><h1 className="logo">aNyThNG</h1></a>
                <div className="links">
                    {user.type=="Reader" && <a href="favorite">Favorites</a>}
                </div>
                
                <div className="search-bar">
                    {type!="Creator" &&
                        <div className="search-sub">
                            <button className="subscribe-button">Subscribe</button>
                            <input type="text" placeholder="..Search for blogs" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    }
                    <div className="user-sec">
                        {user.username && 
                            (user.image ? <img onClick={show} className="user-icon" src={user.image} alt="" /> : <FaUserAlt onClick={show} className="user-icon"/>)
                        }
                        {user.username &&
                        <div className={"profile-menu " + active}>

                            <p className="user-name">{user.username}</p>
                            <p className="user-email">{user.email}</p>
                            <ul>
                                <a href="profile">Profile</a>
                                {user.type=="Creator" && <a href="add">Add New</a>}
                                <a href="#" onClick={logout}>Logout</a>
                            </ul>
                        </div>
                        }
                        {!user.username && <a href="Register">Register</a>}
                        {!user.username && <a href="/login">Sign In</a>}
                    </div>
                </div>
            </ul>
        </nav>
    )
}

export default Nav