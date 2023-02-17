import React, { createContext, useState } from 'react';

export const BlogDataContext = createContext({
    blogs: [],
    setBlogs: ()=> {}
})