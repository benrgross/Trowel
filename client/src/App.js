import React, { useEffect } from "react";
import { useStoreContext } from "./utils/GlobalState";
import { LOGIN } from "./utils/actions";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnAuthenticated from "./components/UnAuthenticated";

function App() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (localStorage.getItem("userInfo")) {
      const { email, token } = JSON.parse(localStorage.getItem("userInfo"));
      dispatch({
        type: LOGIN,
        email,
        token,
      });
    }
  };

  return (
    <div className="App">
      {state.userToken ? <AuthenticatedApp /> : <UnAuthenticated />}
    </div>
  );
}

export default App;
