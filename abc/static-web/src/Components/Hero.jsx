import React from 'react'

const Hero = ({toggleSidebar}) => {
  return (
    <>
     <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Our Platform</h1>
        <p>Discover a world of opportunities with our innovative solutions and join us today!</p>
        <button className="btn-signup" onClick={toggleSidebar}>Get Started</button>
      </div>
    </section>
    </>
  )
}

export default Hero