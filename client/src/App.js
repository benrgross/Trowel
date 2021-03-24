import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import { StoreProvider } from "./utils/GlobalState";
import Navbar from "./components/Navbar/Navbar";
import Search from "./pages/Search";
import Home from "./pages/Home"
import Plant from "./pages/Plant"

//use global context

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Header />
        <Switch>
          <StoreProvider>
            <Route exact path="/" component={Search} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/plant" component={Plant} />
            {/* <Route exact path="/saved" component={Saved} />
            <Route exact path="/books/:id" component={Book} />
            <Route component={NoMatch} /> */}
          </StoreProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
