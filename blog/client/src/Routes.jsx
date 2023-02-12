import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Add from './pages/Add'
import Profile from './pages/Profile'
import Subscribe from './pages/Subscribe'


const Pages = () => (
    <Routes>
      <Route exact path="/" element={<Explore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/feed" element={<Feed/>} />
      <Route path="/add" element={<Add />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sub" element={<Subscribe />} />
      {/* <Route component={NotFoundPage} /> */}
    </Routes>
  );
  
  export default Pages