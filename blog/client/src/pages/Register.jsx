import React from "react"
import Nav from './components/Nav'
import {useState} from 'react'
import axios from "axios";

function Register(){
    const [formData, setFormData] = useState({
        type: '',
        email: '',
        username: '',
        password: '',
        second_password: '',
        blogs:[],
        subscribed: false,
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
        const emailR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordNumR = /[0-9]/
        const passwordCapR = /[A-Z]/
        var passwordRangeR = /^.{8,20}$/;
        return(
            formData.second_password == formData.password ? 
            emailR.test(formData.email) == true ?
            passwordNumR.test(formData.password) == true ? 
            passwordCapR.test(formData.password) == true ? 
            passwordRangeR.test(formData.password) == true ?
            axios.post("http://localhost:3000/register", formData)
            .then(data=>{
                console.log(data);
            })
            : alert("Password must be between 8 and 20 character in length")
            : alert("Password must contain at least one upper case letter")
            : alert("Password must contain at least one number")
            : alert("'.' is missing from the email")
            : alert("Passwords do not match")
        )
    }

    return(
        <div className="app">
            <div className="form-page">
                <div className="container">
                    <h1>Sign Up</h1>
                    <p>Already have an account? <a href="login">Sign In</a></p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Choose account type
                            <select name="type" value={formData.type} className="select" onChange={(e)=>handleChange(e)}>
                                <option>--Choose Account Type--</option>
                                <option value="Reader">Reader</option>
                                <option value="Creator">Creator</option>
                            </select>
                        </label>
                        <label htmlFor="email">Email Address</label>
                        <input id = "email" name="email" type="email" value={formData.email} onChange={(e)=>handleChange(e)} placeholder="..Enter email address here"/>
                        <label htmlFor="username">Username</label>
                        <input id = "username" name="username" type="username" value={formData.username} onChange={(e)=>handleChange(e)}  placeholder="..Enter username here"/>
                        <label htmlFor="password">Password</label>
                        <input id = "password" name="password" type="password" value={formData.password} onChange={(e)=>handleChange(e)}  placeholder="..Enter password here"/>
                        <label htmlFor="password">Confirm Password</label>
                        <input id = "second_password" name="second_password" type="password" value={formData.second_password} onChange={(e)=>handleChange(e)} placeholder="..Enter password here"/>
                        <button type="submit">Sign Up</button>
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

export default Register