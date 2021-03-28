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
          <Route exact path="/" component={Home} />
          <Route exact path="/plant" component={Plant} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
      <div className="container">
        <Footer />
      </div>
    </Router>
  );
}

export default AuthenticatedApp;
