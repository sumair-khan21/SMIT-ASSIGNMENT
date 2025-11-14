import React from 'react'

const Sidebar = ({isOpen, toggleSidebar}) => {
  return (
    <>
     <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={toggleSidebar}>
          &times;
        </button>
        <div className="sidebar-content">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn-signup">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Sidebar