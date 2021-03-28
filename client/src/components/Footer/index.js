import React from "react";
import { useHistory, Link } from "react-router-dom";

import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";

function Footer() {
  return (
    <footer>
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
    </footer>
  );
}

export default Footer;
