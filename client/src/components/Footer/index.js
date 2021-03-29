import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";
import "./style.css";

function Footer() {
  return (
    <footer>
      <Link to="/account">
        <button className="btn page" style={{ cursor: "pointer" }}>
          <FaArrowCircleLeft /> Account
        </button>
      </Link>
      <Link to="/search">
        <button className="btn page" style={{ cursor: "pointer" }}>
          <FaPlus /> Search Plants
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
