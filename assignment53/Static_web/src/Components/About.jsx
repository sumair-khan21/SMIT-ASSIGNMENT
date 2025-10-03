import React from 'react'

const About = () => {
  return (
    <>
    <section className='about-section'>
        <div className="about-img">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="About Us" />
        </div>
        <div className="about-content">
            <h2>About Us</h2>
            <p>We are committed to providing the best services to our customers. Our team of experts works tirelessly to ensure customer satisfaction and deliver top-notch solutions.</p>
            <p>Our mission is to innovate and lead in our industry, setting new standards for excellence and integrity.</p>
            <button className="btn-learn-more">Learn More</button>
        </div>
    </section>
    </>
  )
}

export default About