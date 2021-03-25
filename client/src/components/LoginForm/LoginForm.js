import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN } from "../../utils/actions";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./login.css";

function LoginForm() {
  const [state, dispatch] = useStoreContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  // const history = useHistory();

  const submitLogin = async (e) => {
    e.preventDefault();
    const cred = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log("login cred", cred);

    const {
      data: { email, token },
    } = await API.login(cred);

    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        email,
        token,
      })
    );
    dispatch({
      type: LOGIN,
      email,
      token,
    });
  };
  return (
    <div className="container-fluid form-group d-flex justify-content-center">
      <form className="logIn">
        <h2 className="text-center">Log In</h2>
        <div className="form-group">
          <label>Email address</label>
          <input
            className="form-control"
            ref={emailRef}
            type="text"
            name="email"
            placeholder="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitLogin}>
          Submit
        </button>
        <Link to="/signup">SignUp</Link>
      </form>
    </div>
  );
}

export default LoginForm;