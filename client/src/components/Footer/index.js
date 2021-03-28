import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Link to="/account">
          <button className="btn btn-success" style={{ cursor: "pointer" }}>
            <FaArrowCircleLeft /> Account
          </button>
        </Link>
        <Link to="/search">
          <button className="btn btn-success" style={{ cursor: "pointer" }}>
            <FaPlus /> Search Plants
          </button>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
