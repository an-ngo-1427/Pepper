import React from "react";
import "../../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-nav">
          <a href="#privacy">Private Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <nav className="social-media">
          <a href="http://instagram.com">Instagram</a>
          <a href="http://youtube.com">YouTube</a>
        </nav>
        <p>&copy; 2024 Pepper's Happy Trails. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
