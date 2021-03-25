import React from "react";
import React from "react";
import { StoreProvider } from "./utils/GlobalState";
import Navbar from "./components/Navbar/Navbar";

function unRegistered() {
  return (
    <StoreProvider>
      <Navbar />
      <LogIn />
    </StoreProvider>
  );
}

export default unRegistered;
