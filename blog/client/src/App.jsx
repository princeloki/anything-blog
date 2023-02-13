import './App.css'
import Pages from './Routes'
import { BrowserRouter } from 'react-router-dom';
import React, { useContext, useState,useEffect } from "react"
import axios from 'axios'
import { AuthContext } from './pages/components/AuthContext'
import { UserDataContext } from './pages/components/Usercontext'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
      type: '',
      username: '',
      email: '',
      blogs:[],
      subscribed: false,
      image: ""
  })

  const fetchData = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:3000/api/secret',{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if(response.data){  
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      } 
    } catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() =>{
    console.log(isLoggedIn)
    if(isLoggedIn && !user.username) {
      fetchData();
    }
  }, [isLoggedIn, user.username])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <UserDataContext.Provider value={{ user, setUser }}>
        <div className="App">
          <BrowserRouter>
            <Pages />
          </BrowserRouter>
        </div>
      </UserDataContext.Provider>
  </AuthContext.Provider>
  )
}

export default App
