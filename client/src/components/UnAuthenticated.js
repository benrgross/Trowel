import React, { useRef, useHistory } from "react";
import NavLogin from "./NavLogIn/NavLogin";
import { useStoreContext } from "../utils/GlobalState";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import axios from "axios";
import { LOGIN } from "../utils/actions";
import SignUpForm from "./SignUpForm/SignUpForm";

function UnAuthenticated() {
  return (
    <Router>
      <div>
        <NavLogin />
        <Switch>
          <Route exact path="/signup" component={SignUpForm} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default UnAuthenticated;
