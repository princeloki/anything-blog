import React from "react"
import Nav from './components/Nav'

function Login(){
    return(
        <div className="app">
            <div className="form-page">
                <div className="container">
                    <h1>Sign Up</h1>
                    <p>Already have an account? <a href="login">Sign In</a></p>
                    <form onSubmit="">
                        <label htmlFor="email">Email Address</label>
                        <input id = "email" name="email" type="email" placeholder="..Enter email address here"/>
                        <label htmlFor="username">Username</label>
                        <input id = "username" name="username" type="username" placeholder="..Enter username here"/>
                        <label htmlFor="password">Password</label>
                        <input id = "password" name="password" type="password" placeholder="..Enter password here"/>
                        <label htmlFor="password">Confirm Password</label>
                        <input id = "second_password" name="password" type="password" placeholder="..Enter password here"/>

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