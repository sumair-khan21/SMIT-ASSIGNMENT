import React from 'react'

const Footer = ({toggleSidebar}) => {
  return (
    <>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h3>Your Company</h3>
          <p>Empowering the future with innovative solutions. Join us to explore endless possibilities.</p>
          <button className="btn-signup" onClick={toggleSidebar}>Join Now</button>
        </div>
        <div className="footer-section newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
            <button type="submit" className="btn-signup">Subscribe</button>
          </form>
        </div>
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Footer