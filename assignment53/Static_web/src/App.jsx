import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Sidebar from './Components/Sidebar';
import About from './Components/About';
import Footer from './Components/Footer';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () =>{
    setIsSidebarOpen(!isSidebarOpen)
  }
  // console.log(isSidebarOpen)
  return (
    <>
    <Navbar toggleSidebar={toggleSidebar}/>
    <Hero toggleSidebar={toggleSidebar}/>
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
    <About />
    <Footer />
    </>
  )
}

export default App