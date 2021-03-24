import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "reactstrap";

function Navbar() {
  return (
    <Nav
      style={{ backgroundColor: "rgb(206 153 4 / 65%)" }}
      className="navbar navbar-expand-md  navbar-dark pr-lg-1 pl-sm-5 justify-content-between"
    >
      <Link className="navbar-brand nav-text" to="/">
        Trowell
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
            <Link to="/home" className="nav-link nav-text">
              Accounts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link nav-text">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/plant" className="nav-link nav-text">
              Spotlight
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Saved"
              className="nav-link nav-text"
              style={{ marginRight: "50px" }}
            >
              Saved Plants
            </Link>
          </li>
        </ul>
      </div>
    </Nav>
  );
}

export default Navbar;
