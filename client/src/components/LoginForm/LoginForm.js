import React, { useRef, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN, ALERT, SHOW_FORM } from "../../utils/actions";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./login.css";

function LoginForm() {
  const [state, dispatch] = useStoreContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  // const history = useHistory();

  useEffect(() => {
    dispatch({
      type: ALERT,
      message: "",
    });
  }, "");

  const submitLogin = async (e) => {
    e.preventDefault();
    const cred = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log("login cred", cred);

    if (!cred.email && !cred.password) {
      dispatch({
        type: ALERT,
        message: "Invalid email or password",
      });
    } else if (!cred.email && cred.password) {
      dispatch({
        type: ALERT,
        message: "Invalid email or password",
      });
    } else if (cred.email && !cred.password) {
      dispatch({
        type: ALERT,
        message: "Invalid email or password",
      });
    } else {
      console.log("Login successful!");
    }

    // if (!cred.email && !cred.password) {
    //   alert("Invalid e-mail address and password");
    // } else if (!cred.email && cred.password) {
    //   alert("Invalid e-mail address and password");
    // } else if (cred.email && !cred.password) {
    //   alert("Please enter a password");
    // } else {
    //   console.log("Login successful!");
    // }

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

  // const closeAlert = (e) => {
  //   e.stopPropagation();

  //   dispatch({
  //     type: SHOW_FORM,
  //     display: false,
  //   });
  // };

  return (
    <div className="container-fluid form-group d-flex justify-content-center ">
      <div className="row">
        <div className="col-sm-12 col-md-0 col-lg-0"></div>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <form className="logIn card form">
            <h2 className="text-center">Log In</h2>
            {state.message ? (
              <div className="alert alert-danger" role="alert">
                {state.message}{" "}
              </div>
            ) : (
              ""
            )}
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
            <button type="submit" className="btn submit" onClick={submitLogin}>
              Submit
            </button>
            <Link className="reg-link" to="/signup">
              Sign up
            </Link>
          </form>
        </div>
        <div className="col-sm-12 col-md-0 col-lg-0"></div>
      </div>
    </div>
  );
}

export default LoginForm;
