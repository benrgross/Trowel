import React, { useRef } from "react";
import API from "../../utils/API";

function SignUpForm() {
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
  };

  return (
    <div className="container-fluid form-group">
      <form className="form-group" onSubmit={signUp}>
        <input
          className="form-control"
          ref={regEmailRef}
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          className="form-control"
          ref={regPasswordRef}
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

export default SignUpForm;
