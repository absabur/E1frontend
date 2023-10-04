import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
import MetaDeta from "../layout/MetaDeta";
//
//

const Error = ({ message }) => {
  return (
    <div className="error-div">
    <MetaDeta title="Not Found" />
      <h1>{message}</h1>
      <div className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </div>
      <Link
        style={{ textDecoration: "none", color: "var(--white)", width: "60%" }}
        to="/"
      >
        <button className="v2button" style={{ padding: "10px", width: "100%" }}>
          Back to Home Page
        </button>
      </Link>
    </div>
  );
};

export default Error;
