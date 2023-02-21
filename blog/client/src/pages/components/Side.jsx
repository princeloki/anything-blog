

import React, { useContext, useEffect, useState } from 'react';
import { BlogDataContext } from './Blogscontext';

function Side(props) {
  const { blogs } = useContext(BlogDataContext);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setCategoriesLoaded(true);
    }
  }, [blogs]);

  const scrollDown = () => {
    console.log("clicked")
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
  };


  return (
    <div className="side">
      <h2>Common Categories</h2>
      <div className="cats">
        <a className="extra" href="#">Travel</a>
        {categoriesLoaded && blogs ? 
          (
          [...new Set(blogs.map(blog => blog.Category))].splice(0,5).map((Category, index) => (
            <a key={index} className="extra" href="#">{Category}</a>
          ))
        ) : (
          <div></div>
        )}
      </div>
      <div className="bot-tags">
        <a href="#" onClick={scrollDown}>About</a>
        <a href="#">Help</a>
        <a href="#" onClick={scrollDown}>Contact</a>
      </div>
    </div>
  );
}

export default Side;
