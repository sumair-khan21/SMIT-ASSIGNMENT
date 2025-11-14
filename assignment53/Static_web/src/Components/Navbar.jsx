import React from 'react'

const Navbar = ({toggleSidebar}) => {
  return (
    <>
    <nav className='navbar-main'>
        <div className='navbar-logo'>
            <h1>React JS </h1>
                    </div>
                    <div className='navbar-btn'>
                        <button>Discover</button>
                        <button>Experience</button>
                        <button>Destination</button>
                        <button>Information</button>
                    </div>
                    <div>
                        <button className='btn-signup' onClick={toggleSidebar}>Sign Up</button>
                    </div>

    </nav>
    </>
  )
}

export default Navbar