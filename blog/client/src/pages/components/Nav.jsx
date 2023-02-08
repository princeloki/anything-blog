import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faM, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function Nav(props){
    return(
        <nav>
            <ul>
                <a href="#"><h1 className="logo">aNyThNG</h1></a>
                <div className="links">
                    {props.username && <a href="feed">Feed</a>}
                    {props.usertype=="creator" && <a href="add">Add</a>}
                    {props.username && <a href="profile">Profile</a>}
                    <a href={props.username ? "Logout" : "Login"}>{props.username ? "Logout" : "Sign In"}</a>
                    {!props.username && <a href="Register">Register</a>}
                </div>
                
                <div className="search-bar">
                    {props.usertype!="creator" &&
                        <div className="search-sub">
                            <button className="subscribe-button">Subscribe</button>
                            <input type="text" placeholder="..Search for blogs" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    }
                    {props.username && <FontAwesomeIcon icon={faUser} />}
                </div>
            </ul>
        </nav>
    )
}

export default Nav