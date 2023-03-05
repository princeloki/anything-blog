

import React,{ useState,useContext,useRef } from "react"
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
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [imageData, setImageData] = useState({
        type: "image",
        newOne: ""
    })
    const [ambData, setAmbData] = useState({
        type: "",
        newOne: ""
    })

    function handleChange(e){
        setAmbData(()=>{
            return{    
                type: e.target.name,
                newOne: e.target.value,
            }
        })

        if (e.target.name === 'username') {
            usernameRef.current.focus();
        } else if (e.target.name === 'password') {
            passwordRef.current.focus();
        }
    }

    function handleUser(e){

    }

    async function sendUpdate(data){
        const ndata = ({
            user: user.username,
            type: data.type,
            newOne: data.newOne
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
            <button className="save" onClick={() => sendUpdate(imageData)}>
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="sec-item-row">
        <div className="sec-row" onClick={() => setSwitchTo("username")}>
          {switchTo === "username" ? (
            <input
              className="prof-input"
              name="username"
              value={ambData.newOne}
              onChange={(e) => handleChange(e)}
              type="text"
              placeholder="...Enter new username"
              ref={usernameRef}
            />
          ) : (
            <h4 className="prof-item">Username: {user.username}</h4>
          )}
          <a className="prof-tag" href="#">
            Change Username
          </a>
        </div>
      </div>
      <div className="sec-item-row">
        <div onClick={() => setSwitchTo("password")}>
          {switchTo === "password" ? (
            <input
              className="prof-input"
              name="password"
              value={ambData.newOne}
              onChange={(e) => handleChange(e)}
              type="password"
              placeholder="...Enter new password"
              ref={passwordRef}
            />
          ) : (
            <h4 className="prof-item">Password: *********</h4>
          )}
          <a className="prof-tag" href="#">
            Change Password
          </a>
        </div>
      </div>
      {editing && (
        <button
          className="save"
          onClick={() => {
            sendUpdate(passData);
            setEditing(false);
            setSwitchTo(null);
          }}
        >
          Save
        </button>
      )}
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