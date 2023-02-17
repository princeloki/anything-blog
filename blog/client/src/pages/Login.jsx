

import React from "react"
import { useContext, useState } from "react"
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "./components/AuthContext";
import axios from 'axios'


function Login(){
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false)
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e){
        setFormData(prevFormData=>{
            return{
                ...prevFormData,
                [e.target.name]: e.target.value,
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        return(
            axios.post("http://127.0.0.1:3000/api/login", formData)
            .then(data=>{
                if(data.status === 200){  
                    setIsLoggedIn(true)
                    localStorage.setItem("token", data.data.token)
                    navigate("/", {replace: true})
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(error=>{
                console.error(error)
            })
        )
    }

    return(
        <div className="login-page">
            <FaArrowLeft onClick={()=>navigate('/', { replace: true })} className="arrow-left"/>
            <div className="form-page">
                <div className="container">
                    <h1>Sign In</h1>
                    <p>Don't have an account yet? <a href="register">Sign Up</a></p>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <label htmlFor="email">Email Address</label>
                        <input id = "email" name="email" type="email" value={formData.email} onChange={(e)=>handleChange(e)}  placeholder="..Enter your email address please"/>
                        <div className="pass-label">
                            <label htmlFor="password">Password</label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <input id = "password" name="password" type="password" value={formData.password} onChange={(e)=>handleChange(e)}  placeholder="..Enter your password please"/>
                        <div className="check">
                            <input className="checkbox" type="checkbox" />
                            <label id="check-label" htmlFor="checkbox">Remember me!</label>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            <style>
                {
                    `
                    #root{
                        background: rgb(86, 179, 155);
                        height: 100vh;
                        width: 100wh;
                    }
                    `
                }
            </style>
        </div>
    )
}

export default Login



