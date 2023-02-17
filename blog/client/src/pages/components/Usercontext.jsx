import React, { createContext } from 'react';

export const UserDataContext = createContext({
  user: {
    type: '',
    name: '',
    email: '',
    username: '',
    password: '',
    second_password: '',
    blogs:[],
    subscribed: false,
  },
  setUser: () => {}
});