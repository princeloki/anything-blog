import React from 'react';
import Nav from './components/Nav'
import Main from './components/Main'
import { useState, useContext } from 'react'
import { UserDataContext } from './components/Usercontext'

function Explore(){
    const { user, setUser } = useContext(UserDataContext);

    return(
        <div>
            <Nav user={user} />
            <Main />
        </div>
    )
}

export default Explore