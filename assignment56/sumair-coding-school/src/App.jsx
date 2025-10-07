import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Course from './Pages/Course'
import Contact from './Pages/Contact'

const App = () => {
  
  return (
    <>
    <Routes>
      <Route index element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/course' element={<Course />}/>
      <Route path='/contact' element={<Contact />}/>
    </Routes>
    </>
  )
}

export default App
