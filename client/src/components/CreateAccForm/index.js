import React, { useRef, useEffect } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_ACCOUNT, LOADING, SHOW_FORM, ALERT } from "../../utils/actions";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./style.css";

function CreateAccForm() {
  const [state, dispatch] = useStoreContext();

  const accountNameRef = useRef();
  const clientNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const zoneRef = useRef();

  useEffect(() => {
    dispatch({
      type: ALERT,
      message: "",
    });
  }, "");

  const saveAccount = async (event) => {
    // possibly remove prevent default
    event.preventDefault();

    // object to post account and save to user
    const { email } = JSON.parse(localStorage.getItem("userInfo"));
    const postAccount = {
      account: {
        accountName: accountNameRef.current.value.toLowerCase().trim(),
        clientContact: {
          clientName: clientNameRef.current.value.toLowerCase().trim(),
          phone: phoneRef.current.value.toLowerCase().trim(),
          email: emailRef.current.value.toLowerCase().trim(),
        },
        location: {
          address: addressRef.current.value.toLowerCase().trim(),
          distZone: zoneRef.current.value.toLowerCase().trim(),
        },
      },
      userEmail: email,
    };
    dispatch({ type: LOADING });

    const saveAccount = await API.saveAccount(postAccount);
    console.log("saveAccount", saveAccount);
    const { data } = await API.findNewAccount(email);
    console.log("addAccount", data.accounts[0]);

    dispatch({
      type: ADD_ACCOUNT,
      account: data.accounts[0],
    });

    console.log("Account array: ", state.accounts);

    accountNameRef.current.value = "";
    clientNameRef.current.value = "";
    phoneRef.current.value = "";
    emailRef.current.value = "";
    addressRef.current.value = "";
    zoneRef.current.value = "";

    dispatch({
      type: SHOW_FORM,
      display: false,
    });

    dispatch({
      type: ALERT,
      message: "Account created!",
    });
  };

  const renderForm = () => {
    dispatch({
      type: SHOW_FORM,
      display: true,
    });
  };

  const closeForm = (e) => {
    e.stopPropagation();

    dispatch({
      type: SHOW_FORM,
      display: false,
    });
  };

  return (
    <div>
      {state.message ? (
        <div className="alert alert-success" role="alert">
          {state.message}
        </div>
      ) : (
        ""
      )}

      {!state.display ? (
        <div className="show-btn-div">
          <button className="btn show-btn" onClick={() => renderForm()}>
            <FaPlus /> Add an account
          </button>
        </div>
      ) : (
        <div className="close-btn-div">
          <button
            className="btn btn-outline close-btn"
            onClick={(e) => closeForm(e)}
          >
            <FaMinus /> Close
          </button>
        </div>
      )}

      {state.display ? (
        <div className="container">
          <form className="account-form">
            <div className="form-group">
              <label>Account Name</label>
              <input
                name="account-name"
                ref={accountNameRef}
                placeholder="Name"
                className="form-control account-input"
              />
            </div>
            <div className="form-group">
              <label>Client Name</label>
              <input
                name="client-name"
                ref={clientNameRef}
                placeholder="Full Name"
                className="form-control account-input"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="client-phone"
                ref={phoneRef}
                placeholder="(555) 555-5555"
                className="form-control account-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                ref={emailRef}
                placeholder="example@example.com"
                className="form-control account-input"
              />
            </div>
            <div className="form-group">
              <label>Account Location</label>
              <input
                name="account-location"
                ref={addressRef}
                placeholder="312 N. Plants St."
                className="form-control account-input"
              />
            </div>
            <div className="form-group">
              <label>District Zone</label>
              <input
                name="district-zone"
                ref={zoneRef}
                placeholder="Zone 8"
                className="form-control account-input"
              />
            </div>
            <button type="submit" className="btn submit" onClick={saveAccount}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreateAccForm;
