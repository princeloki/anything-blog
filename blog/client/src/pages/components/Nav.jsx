


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
        active == "inactive" ? setActive("active") : setActive("inactive")
    }

    return(
        <nav>
            <ul>
                <a href="/"><h1 className="logo default">aNyThNG</h1></a>
                <div className="links">
                    {user.type=="Reader" && <a onClick={()=>navigate("/favorite", {replace: true})}>Favorites</a>}
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
                                <a onClick={()=>navigate("/profile", {replace: true})}>Profile</a>
                                {user.type=="Creator" && <a onClick={()=>navigate("/add", {replace: true})}>Add New</a>}
                                <a onClick={logout}>Logout</a>
                            </ul>
                        </div>
                        }
                        {!user.username && <a onClick={()=>navigate("/Register", {replace: true})}>Register</a>}
                        {!user.username && <a onClick={()=>navigate("//login", {replace: true}>Sign)}>In</a>}
                    </div>
                </div>
            </ul>
        </nav>
    )
}

export default Nav