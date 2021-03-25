import React, { useRef } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN } from "../../utils/actions";
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

    const { data } = await API.signUp(cred);
    console.log(data);

    if (data.email) {
      history.push("/");
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
    // if ()
  };

  return (
    <div className="container-fluid form-group d-flex justify-content-center">
      <form className="signup" onSubmit={signUp}>
        <h2 className="text-center">Sign Up</h2>
        <div className="form-group">
          <label>Email address</label>
          <input
            className="form-control"
            ref={regPasswordRef}
            type="text"
            name="email"
            placeholder="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            className="form-control"
            ref={regEmailRef}
            type="password"
            name="password"
            placeholder="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/">Log In</Link>
      </form>
    </div>
  );
}

export default SignUpForm;
