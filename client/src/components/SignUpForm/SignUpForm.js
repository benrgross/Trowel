import React, { useRef } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN, ALERT } from "../../utils/actions";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";

function SignUpForm() {
  const [state, dispatch] = useStoreContext();
  let history = useHistory();

  const regEmailRef = useRef();
  const regPasswordRef = useRef();

  const signUp = async (e) => {
    e.preventDefault();
    const cred = {
      email: regEmailRef.current.value,
      password: regPasswordRef.current.value,
    };
    console.log("cred", cred);

    if (!cred.email && !cred.password) {
      dispatch({
        type: ALERT,
        message: "Please enter all fields",
      });
    } else if (!cred.email && cred.password) {
      dispatch({
        type: ALERT,
        message: "Please enter all fields",
      });
    } else if (cred.email && !cred.password) {
      dispatch({
        type: ALERT,
        message: "Please enter all fields",
      });
    } else {
      console.log("Sign-up successful!");
    }

    const { data } = await API.signUp(cred);
    console.log(data);

    history.push("/");

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

  // const alert = () => {
  //   return <h1>You suck lol</h1>;
  // };

  return (
    <div className="container-fluid form-group d-flex justify-content-center">
      <div className="row">
        <div className="col-sm-12 col-md-0 col-lg-0"></div>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <form className="signup card">
            <h2 className="text-center">Sign Up</h2>
            {state.message ? (
              <div className="alert alert-danger" role="alert">
                {state.message}
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label>Email address</label>
              <input
                className="form-control"
                ref={regEmailRef}
                type="text"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                ref={regPasswordRef}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <button type="submit" className="btn submit" onClick={signUp}>
              Submit
            </button>
            <Link className="reg-link" to="/">
              Log In
            </Link>
          </form>
        </div>
        <div className="col-sm-12 col-md-0 col-lg-0"></div>
      </div>
    </div>
  );
}

export default SignUpForm;
