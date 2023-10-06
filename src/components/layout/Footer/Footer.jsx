import React from "react";
import "./Footer.css";
import logo from "../../../images/logo.png"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="top-footer">
        <div className="midFooter">
          <h1><img style={{height: "70px", width: "70px", borderRadius: "20px", border: "1px solid var(--v1)"}} src={logo} alt="ABS" />
          <br/>E-commerce</h1>
          <p>High Quality is our first priority</p>
        </div>

        <div className="rightFooter">
          <h4>Follow Us</h4>
          <a href="#">Instagram</a>
          <a href="#">Youtube</a>
          <a href="#">Facebook</a>
        </div>
      </div>
      <div className="copy-right">
        <p>Copyrights 2023 &copy; abs E-commerce</p>
      </div>
    </footer>
  );
};

export default Footer;