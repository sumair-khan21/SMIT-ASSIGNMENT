import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Sidebar from './Components/Sidebar';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () =>{
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
    <Hero toggleSidebar={toggleSidebar}/>
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
    </>
  )
}

export default App