import React, { useRef, useHistory } from "react";

import { useStoreContext } from "../utils/GlobalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import { LOGIN } from "../utils/actions";
import SignUpForm from "./SignUpForm/SignUpForm";

function UnAuthenticated() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignUpForm />
        </Route>
      </div>
    </Router>
  );
}

export default UnAuthenticated;
