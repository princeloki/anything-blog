import './App.css'
import Pages from './Routes'
import { BrowserRouter } from 'react-router-dom';
import React, { useContext, useState,useEffect } from "react"
import axios from 'axios'
import { AuthContext } from './pages/components/AuthContext'
import { UserDataContext } from './pages/components/Usercontext'
import { BlogDataContext } from './pages/components/Blogscontext'

function App() {
  const [blogs, setBlogs] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
      type: '',
      name: '',
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

  useEffect(()=>{
    try{
      axios.get("http://127.0.0.1:3000/api/blogs")
      .then(data=>{
        setBlogs(data.data)
      })
      .catch(err=>{
        console.error(err);
      })
    } catch(err){

    }
  },[])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() =>{
    if(isLoggedIn && !user.username) {
      fetchData();
    }
  }, [isLoggedIn, user.username])

  return (
    <BlogDataContext.Provider value={{ blogs, setBlogs }}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <UserDataContext.Provider value={{ user, setUser }}>
          <div className="App">
            <BrowserRouter>
              <Pages />
            </BrowserRouter>
          </div>
        </UserDataContext.Provider>
    </AuthContext.Provider>
  </BlogDataContext.Provider>
  )
}

export default App
