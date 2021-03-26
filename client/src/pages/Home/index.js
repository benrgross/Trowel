import "./home.css";
import React, { useRef, useState, useEffect } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_ACCOUNT } from "../../utils/actions";
import { Link } from "react-router-dom";

const Home = () => {
  const [state, dispatch] = useStoreContext();

  const [savedAccounts, setSavedAccounts] = useState([]);
  const [savedPlants, setSavedPlants] = useState([]);

  const accountNameRef = useRef();
  const clientNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const zoneRef = useRef();
  const notesRef = useRef();

  // get request of books from db
  useEffect(() => {
    getSavedAccounts();
    getSavedPlants();
  }, []);

  const getSavedAccounts = async () => {
    const { data } = await API.getAccounts();

    // set data to state
    setSavedAccounts(data);
    console.log("Account Data: ", data);
  };

  const getSavedPlants = async () => {
    const { data } = await API.getPlants();

    // set data to state
    setSavedPlants(data);
    console.log("Plant Data: ", data);
  };
<<<<<<< HEAD

  const saveAccount = (event) => {
    event.preventDefault();

    const account = {
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
      notes: notesRef.current.value.toLowerCase().trim(),
    };

    API.saveAccount(account);
    console.log("newAccount: ", account);
=======

  const saveAccount = (event) => {
    event.preventDefault();

    const account = {
      accountName: accountNameRef.current.value,
      clientContact: {
        clientName: clientNameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
      },
      location: {
        address: addressRef.current.value,
        distZone: zoneRef.current.value,
      },
      notes: notesRef.current.value,
    };

    API.saveAccount(account);

    dispatch({
      type: ADD_ACCOUNT,
      account: account,
    });
>>>>>>> 3e51ac239fcf64072f51a94c12b63a5b945a3792

    accountNameRef.current.value = "";
    clientNameRef.current.value = "";
    phoneRef.current.value = "";
    emailRef.current.value = "";
    addressRef.current.value = "";
    zoneRef.current.value = "";
    notesRef.current.value = "";
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <h2>Accounts: </h2>

      <div className="container">
        <form className="shadow">
          <div className="form-group ">
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
          <div className="form-group ">
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
          <div className="form-group ">
            <label>Account Notes</label>
            <textarea
              name="notes"
              ref={notesRef}
              placeholder="Notes"
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={saveAccount}
          >
            Submit
          </button>
        </form>
      </div>
<<<<<<< HEAD
      {savedAccounts.length ? (
        <div>
          {savedAccounts.map((account) => {
=======
      {state.accounts.length ? (
        <div>
          {state.accounts.map((account) => {
>>>>>>> 3e51ac239fcf64072f51a94c12b63a5b945a3792
            return (
              <div className="container">
                <div className="card">
                  <div className="card-body">
                    <span>
                      <h5 className="account-title">
                        Account: {account.accountName}
                      </h5>
                      <Link to="/">
                        <button className="btn btn-success">
                          {" "}
                          + Add plants
                        </button>
                      </Link>
                    </span>
                    <h6>Client: {account.clientContact.clientName}</h6>
                    <ul>
                      <li>{account.clientContact.phone}</li>
                      <li>{account.clientContact.email}</li>
                    </ul>
                    <p>location: {account.location.address}</p>
                    <p>distribution zone: {account.location.distZone}</p>
                    <p>notes: {account.notes}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h6>No saved accounts yet...</h6>
      )}
    </div>
  );
};

export default Home;
