import React from "react"
import Nav from './components/Nav'

function Login(){
    return(
        <div className="app">
            <div className="form-page">
                <div className="container">
                    <h1>Sign In</h1>
                    <p>Don't have an account yet? <a href="register">Sign Up</a></p>
                    <form onSubmit="">
                        <label htmlFor="email">Email Address</label>
                        <input id = "email" name="email" type="email" placeholder="..Enter your email address please"/>
                        <div className="pass-label">
                            <label htmlFor="password">Password</label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <input id = "password" name="password" type="password" placeholder="..Enter your password please"/>
                        <div className="check">
                            <input id="checkbox" type="checkbox" />
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