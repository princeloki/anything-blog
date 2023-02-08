import { useState } from 'react'
import './App.css'
import Pages from './Routes'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  )
}

export default App
