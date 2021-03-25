import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";

import { LOGIN } from "../../utils/actions";
import API from "../../utils/API";

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
    <div className="container-fluid form-group">
      <form className="form-group" onSubmit={submitLogin}>
        <input
          className="form-control"
          ref={emailRef}
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          className="form-control"
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="btn btn-success" type="submit">
          submit{" "}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
