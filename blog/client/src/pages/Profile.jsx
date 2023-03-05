

import React,{ useState,useContext, useCallback } from "react"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { UserDataContext } from "./components/Usercontext"
import { FaUserAlt } from "react-icons/fa"
import axios from "axios"

function Profile(){
    const [option, setOption] = useState(null)
    const [editing, setEditing] = useState(false)
    const [switchTo, setSwitchTo] = useState(null)
    const {user} = useContext(UserDataContext)

    const [imageData, setImageData] = useState({
        type: "image",
        newOne: ""
    })

    async function sendUpdate(e){
        e.preventDefault()
        setEditing(false);
        setSwitchTo(null);

        let inputVal;
        let type;
        if (switchTo === "password") {
          inputVal = document.getElementById("pass").value;
          type = "password";
        } else {
          inputVal = document.getElementById("user").value;
          type = "username";
        }

        const ndata = ({
            user: user.username,
            type: type,
            newOne: inputVal,
        })
        try{
            const response = await axios.post("http://127.0.0.1:3000/api/update", ndata)
            const res = response.data
        } catch(err){
            console.log(err)
        }
    }

    async function sendImage(data){
        const ndata = ({
            user: user.username,
            type: data.type,
            newOne: data.newOne,
        })
        try{
            const response = await axios.post("http://127.0.0.1:3000/api/update", ndata)
            const res = response.data
        } catch(err){
            console.log(err)
        }
    }

    async function uploadImage(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("img", file);
        formData.append("name", file.name);
        try {
          const response = await axios.post("http://127.0.0.1:3000/api/upload", formData);
          const imageURL = response.data;
          setImageData(prevFormData => {
            return {
              ...prevFormData,
              newOne: imageURL,
            };
          });
        } catch (err) {
          console.log(err);
        }
    }

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
                    {user.image ? <img src={user.image} className="prof-img" alt="Profile Image" /> : <FaUserAlt className="prof-img"/>}
                </div>
                <div className="prof-info">
                    <h4 className="prof-item">Name: {user.name}</h4>
                    <h4 className="prof-item">Username: {user.username}</h4>
                    <h4 className="prof-item">Email: {user.email}</h4>
                </div>
            </div>
        )
    }

    const Edit = () => {
        return (
            <div className="prof-page">
                <h1 className="prof-h1">Edit</h1>
                <div className="sec-item-row">
                    <div className="prof-img-sec">
                        {user.image ? (
                        <img src={user.image} className="prof-img" alt="Profile Image" />
                        ) : (
                        <FaUserAlt className="prof-img" />
                        )}
                        <div className="prof-img-sec-row">
                            <label className="prof-button" htmlFor="up">
                                {user.image ? "Change" : "Upload"}
                            </label>
                            <input type="file" id="up" accept="image/*" onChange={(e) => uploadImage(e)} hidden />
                            <button className="save" onClick={() => sendImage(imageData)}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="sec-item-row">
                    <div className="sec-row" onClick={() => setSwitchTo("username")}>
                        <h4 className="prof-item">Username: {user.username}</h4>
                        <a onClick={()=>setEditing(true)} className="prof-tag" href="#">
                            Change Username
                        </a>
                    </div>
                </div>
                <div className="sec-item-row">
                    <div onClick={() => setSwitchTo("password")}>
                        <h4 className="prof-item">Password: *********</h4>
                        <a onClick={()=>setEditing(true)} className="prof-tag" href="#">
                            Change Password
                        </a>
                    </div>
                </div>
                {editing && 
                <form onSubmit={sendUpdate}>
                    {switchTo === "password" ? (
                        <input className="prof-input" id = "pass" name="password" type="password" placeholder="..Enter your new password"/>
                    ) : (
                        <input className="prof-input" id = "user" name="user" type="text" placeholder="..Enter your new Username here"/>
                    )}
                    <button className="save" type="submit">
                        Save
                    </button>
                </form>
                }

            </div>
        );
    };


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