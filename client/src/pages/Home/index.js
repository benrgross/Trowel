import "./home.css";
import React, { useRef, useEffect } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  REMOVE_ACCOUNT,
  SET_SAVED_ACCOUNT,
  ADD_ACCOUNT,
  LOAD_ACCOUNTS,
  LOADING,
} from "../../utils/actions";

const Home = () => {
  const [state, dispatch] = useStoreContext();
  // const [savedAccounts, setSavedAccounts] = useState([]);

  let history = useHistory();

  const accountNameRef = useRef();
  const clientNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const zoneRef = useRef();
  const notesRef = useRef();

  // get request of accounts from db
  useEffect(() => {
    getSavedAccounts();
  }, []);

  const getSavedAccounts = async () => {
    const { email } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await API.getAccounts(email);
    console.log("getAccounts", data);

    // set data to state
    dispatch({
      type: LOAD_ACCOUNTS,
      accounts: data.accounts,
    });
    console.log("Account Data: ", data);
  };

  const saveAccount = async (event) => {
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

    // setSavedAccounts(account, ...savedAccounts);
    console.log("newAccount: ", account);

    accountNameRef.current.value = "";
    clientNameRef.current.value = "";
    phoneRef.current.value = "";
    emailRef.current.value = "";
    addressRef.current.value = "";
    zoneRef.current.value = "";
    notesRef.current.value = "";
  };

  const viewAccount = async (account) => {
    const { data } = await API.getPlantsByAccount({
      accountName: account,
    });

    const accountObj = {
      accountName: data.accountName,
      client: data.clientContact.clientName,
      clientPhone: data.clientContact.phone,
      clientEmail: data.clientContact.email,
      address: data.location.address,
      distZone: data.location.distZone,
      notes: data.notes,
      plants: data.plants,
    };

    dispatch({
      type: SET_SAVED_ACCOUNT,
      account: accountObj,
    });

    history.push("/account");
  };

  const removeAccount = async (id) => {
    try {
      await API.deleteAccount(id);
      console.log("Deleted Account ID: ", id);
      dispatch({
        type: REMOVE_ACCOUNT,
        _id: id,
      });
    } catch (err) {
      console.log(err);
    }
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
            className="btn btn-primary"
            onClick={saveAccount}
          >
            Submit
          </button>
        </form>
      </div>
      {state.accounts.length ? (
        <div className="container">
          {state.accounts.map((account) => {
            return (
              <div className="card" key={account._id}>
                <div
                  className="card-body"
                  onClick={() => viewAccount(account.accountName)}
                >
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
                  <p>notes: {account.notes.note}</p>
                </div>
                <span>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeAccount(account._id)}
                  >
                    <FaTimes /> Delete Account{" "}
                  </button>
                </span>
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
