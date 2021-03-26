import "./home.css";
import React, { useRef, useState, useEffect } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { SET_SAVED_ACCOUNT } from "../../utils/actions";

const Home = () => {
  const [_, dispatch] = useStoreContext();
  const [savedAccounts, setSavedAccounts] = useState([]);

  let history = useHistory();

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
  }, []);

  const getSavedAccounts = async () => {
    const { data } = await API.getAccounts();

    // set data to state
    setSavedAccounts(data);
    console.log("Account Data: ", data);
  };

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

    accountNameRef.current.value = "";
    clientNameRef.current.value = "";
    phoneRef.current.value = "";
    emailRef.current.value = "";
    addressRef.current.value = "";
    zoneRef.current.value = "";
    notesRef.current.value = "";
  };

  const viewAccount = ({ accountName, clientContact, location, notes }) => {
    const accountObj = {
        accountName,
        client: clientContact.clientName,
        clientPhone: clientContact.phone,
        clientEmail: clientContact.email,
        address: location.address,
        distZone: location.distZone,
        notes
    }

    dispatch({
        type: SET_SAVED_ACCOUNT,
        account: accountObj
    })

    history.push("/account")
  }

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
      {savedAccounts.length ? (
        <div>
          {savedAccounts.map((account) => {
            return (
              <div className="container">
                <div className="card">
                  <div className="card-body" onClick={() => viewAccount(account)}>
                    <span>
                      <h5 className="account-title">
                        Account: {account.accountName}
                      </h5>
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
                  <span>
                    <button className="btn btn-danger">
                      <FaTimes /> Delete Account{" "}
                    </button>
                  </span>
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
