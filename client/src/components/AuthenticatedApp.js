import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";

import Navbar from "./Navbar/Navbar";
import Search from "../pages/Search";
import Home from "../pages/Home";
import Plant from "../pages/Plant";
import { LOGOUT } from "../utils/actions";

function AuthenticatedApp() {
  return (
    <Router>
      <div>
        <Navbar />
        <Header />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/plant" component={Plant} />
        </Switch>
      </div>
    </Router>
  );
}

export default AuthenticatedApp;
