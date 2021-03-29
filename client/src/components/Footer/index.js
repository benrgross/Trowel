import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";
import "./style.css";

function Footer() {
  return (
    <div className="footer-margin shadow">
      <footer className="footer">
        <div className="container footer">
          <Link to="/account">
            <button className="btn page">
              <FaArrowCircleLeft /> Account
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
