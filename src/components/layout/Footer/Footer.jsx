import React from "react";
import logo from "../../../images/logo.png"
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo & About */}
        <div className="footer-section">
          <h2 className="footer-title"><img src={logo} width={150} alt="" /></h2>
          <p>Your go-to store for the best products at the best prices.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="https://absabur.pro">Portfolio</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <p>Email: absabur929@gmail.com</p>
          <p>Phone: +8801773277050</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/md.abdus.sabur.sayam">Facebook</a>
            <a href="https://x.com/AbdusSaburSayam">Twitter</a>
            <a href="https://github.com/absabur">Github</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Your Brand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
