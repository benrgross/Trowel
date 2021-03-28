import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import { Nav } from "reactstrap";
import { LOGOUT } from "../../utils/actions";

function Navbar() {
  const [state, dispatch] = useStoreContext();
  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LOGOUT });
  };
  return (
    <Nav
      style={{ backgroundColor: "rgb(206 153 4 / 30%)", height: "" }}
      className="navbar navbar-expand-md  shadow navbar-dark pr-lg-1 pl-sm-5 justify-content-between nav-con"
    >
      <Link className="navbar-brand nav-text" to="/">
        <img
          style={{ height: "80px" }}
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
              Accounts
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/account" className="nav-link nav-text">
              Select Account
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/" className="nav-link nav-text">
              Search
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/plant" className="nav-link nav-text">
              Spotlight
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/Saved" className="nav-link nav-text">
              Saved Plants
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link nav-text"
              style={{ marginRight: "50px" }}
              href="/"
              onClick={logout}
            >
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </Nav>
  );
}

export default Navbar;
