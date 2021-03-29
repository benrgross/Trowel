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

    if (!cred.email && !cred.password) {
      alert("Invalid e-mail address and password");
    } else if (!cred.email && cred.password) {
      alert("Invalid e-mail address and password");
    } else if (cred.email && !cred.password) {
      alert("Please enter a password");
    } else {
      console.log("Login successful!");
    }

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
    <div className="container-fluid form-group d-flex justify-content-center ">
      <div className="row">
        <div className="col-sm-12 col-md-0 col-lg-0"></div>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <form className="logIn card form">
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
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitLogin}
            >
              Submit
            </button>
            <Link to="/signup">SignUp</Link>
          </form>
        </div>
        <div className="col-sm-12 col-md-0 col-lg-0"></div>
      </div>
    </div>
  );
}

export default LoginForm;
