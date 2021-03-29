import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";
import "./style.css";

function Footer() {
  return (
    <div className="footer-margin">
      <footer className="footer">
        <div style={{ margin: "0" }} className="container">
          <Link to="/account">
            <button className="btn page" style={{ cursor: "pointer" }}>
              <FaArrowCircleLeft /> Account
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
