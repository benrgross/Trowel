import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";

import Navbar from "./Navbar/Navbar";
import Search from "../pages/Search";
import Home from "../pages/Home";
import Plant from "../pages/Plant";
import Account from "../pages/Account";
import Footer from "../components/Footer";

function AuthenticatedApp() {
  return (
    <Router>
      <div>
        <Navbar />
        <Header />
        <Switch>
          <Route exact path="/" component={Account} />
          <Route exact path="/plant" component={Plant} />
          <Route exact path="/account" component={Account} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default AuthenticatedApp;
