import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "reactstrap";

function Navbar() {
  return (
    <Nav
      style={{ backgroundColor: "rgb(206 153 4 / 65%)" }}
      className="navbar navbar-expand-md  navbar-dark pr-lg-1 pl-sm-5 justify-content-between"
    >
      <Link className="navbar-brand nav-text" to="/home">
        <img
          // style={{ height: "80px" }}
          className="navbar-logo"
          src="images/Trowel-logo.png"
          alt="trowel"
        />
      </Link>

      <button
        className="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-toggle"
        aria-controls="nav-content"
        aria-expanded="false"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="navbar-collapse collapse nav-group " id="navbar-toggle">
        <ul className="navbar-nav nav-group ml-auto ">
          <li className="nav-item">
            <Link to="/" className="nav-link nav-text">
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link nav-text">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </Nav>
  );
}

export default Navbar;
