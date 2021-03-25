import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import { useStoreContext, StoreProvider } from "../utils/GlobalState";
import Navbar from "./Navbar/Navbar";
import Search from "../pages/Search";
import Home from "../pages/Home";
import Plant from "../pages/Plant";
import { LOGOUT } from "../utils/actions";

function AuthenticatedApp() {
  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LOGOUT });
  };
  const [state, dispatch] = useStoreContext();
  return (
    <Router>
      <div>
        <Navbar />
        <Header />
        <button className="btn btn-danger" onClick={logout}>
          LOGOUT
        </button>
        <Switch>
          <StoreProvider>
            <Route exact path="/" component={Search} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/plant" component={Plant} />
          </StoreProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default AuthenticatedApp;
