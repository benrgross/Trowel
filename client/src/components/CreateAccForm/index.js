import React, { useRef } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_ACCOUNT, LOADING, SHOW_FORM } from "../../utils/actions";
import { FaPlus, FaMinus } from "react-icons/fa";

function CreateAccForm() {
  const [state, dispatch] = useStoreContext();

  const accountNameRef = useRef();
  const clientNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const zoneRef = useRef();

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
  };

  const renderForm = () => {
    dispatch({
      type: SHOW_FORM,
      display: false,
    });
  };

  const closeForm = () => {
    // e.preventDefault();
    dispatch({
      type: SHOW_FORM,
      display: true,
    });
  };

  return (
    <div>
      <button className="btn btn-success" onClick={() => renderForm()}>
        <FaPlus /> Add an account
      </button>

      {state.display ? (
        <div className="container">
          <form className="shadow">
            <button
              className="btn btn-outline-danger"
              onClick={() => closeForm()}
            >
              <FaMinus />
            </button>
            <div className="form-group">
              <label>Account Name</label>
              <input
                name="account-name"
                ref={accountNameRef}
                placeholder="Name"
                className="form-control"
              />
            </div>
            <div className="form-group ">
              <label>Client Name</label>
              <input
                name="client-name"
                ref={clientNameRef}
                placeholder="Full Name"
                className="form-control"
              />
            </div>
            <div className="form-group ">
              <label>Phone Number</label>
              <input
                name="client-phone"
                ref={phoneRef}
                placeholder="(555) 555-5555"
                className="form-control"
              />
            </div>
            <div className="form-group ">
              <label>Email</label>
              <input
                name="email"
                ref={emailRef}
                placeholder="example@example.com"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Account Location</label>
              <input
                name="account-location"
                ref={addressRef}
                placeholder="312 N. Plants St."
                className="form-control"
              />
            </div>
            <div className="form-group ">
              <label>District Zone</label>
              <input
                name="district-zone"
                ref={zoneRef}
                placeholder="Zone 8"
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={saveAccount}
            >
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
