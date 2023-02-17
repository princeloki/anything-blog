import React from 'react';
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'
import { useState, useContext } from 'react'
import { UserDataContext } from './components/Usercontext'

function Explore(){
    const { user, setUser } = useContext(UserDataContext);

    return(
        <div>
            <div className="main-container">
                <Nav user={user} />
                <Main />
            </div>
            <Footer />
        </div>
    )
}

export default Explore