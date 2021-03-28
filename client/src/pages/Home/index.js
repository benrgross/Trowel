import "./home.css";
import React, { useEffect } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  REMOVE_ACCOUNT,
  SET_SAVED_ACCOUNT,
  LOAD_ACCOUNTS,
} from "../../utils/actions";
import CreateAccForm from "../../components/CreateAccForm";

const Home = () => {
  const [state, dispatch] = useStoreContext();

  let history = useHistory();

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

  // const saveAccount = async (event) => {
  //   // possibly remove prevent default
  //   event.preventDefault();

  //   // object to post account and save to user
  //   const { email } = JSON.parse(localStorage.getItem("userInfo"));
  //   const postAccount = {
  //     account: {
  //       accountName: accountNameRef.current.value.toLowerCase().trim(),
  //       clientContact: {
  //         clientName: clientNameRef.current.value.toLowerCase().trim(),
  //         phone: phoneRef.current.value.toLowerCase().trim(),
  //         email: emailRef.current.value.toLowerCase().trim(),
  //       },
  //       location: {
  //         address: addressRef.current.value.toLowerCase().trim(),
  //         distZone: zoneRef.current.value.toLowerCase().trim(),
  //       },
  //     },
  //     userEmail: email,
  //   };
  //   dispatch({ type: LOADING });

  //   const saveAccount = await API.saveAccount(postAccount);
  //   console.log("saveAccount", saveAccount);
  //   const { data } = await API.findNewAccount(email);
  //   console.log("addAccount", data.accounts[0]);

  //   dispatch({
  //     type: ADD_ACCOUNT,
  //     account: data.accounts[0],
  //   });

  //   console.log("Account array: ", state.accounts);

  //   accountNameRef.current.value = "";
  //   clientNameRef.current.value = "";
  //   phoneRef.current.value = "";
  //   emailRef.current.value = "";
  //   addressRef.current.value = "";
  //   zoneRef.current.value = "";
  // };

  const viewAccount = async (account) => {
    const { data } = await API.getPlantsByAccount({
      accountName: account,
    });

    console.log("Clicked Account Data: ", data);

    const accountObj = {
      accountID: data._id,
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
      <h1>Dashboard</h1>
      <CreateAccForm />
      <h2>Your accounts: </h2>

      {state.accounts.length ? (
        <div className="container">
          {state.accounts.map((account) => {
            return (
              <div
                className="card"
                key={account._id}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="card-body"
                  onClick={() => viewAccount(account.accountName)}
                >
                  <span>
                    <h5
                      className="account-title"
                      style={{ textTransform: "capitalize" }}
                    >
                      Account: {account.accountName}
                    </h5>
                  </span>
                  <h6 style={{ textTransform: "capitalize" }}>
                    Client: {account.clientContact.clientName}
                  </h6>
                  <ul>
                    <li>{account.clientContact.phone}</li>
                    <li>{account.clientContact.email}</li>
                  </ul>
                  <p style={{ textTransform: "capitalize" }}>
                    location: {account.location.address}
                  </p>
                  <p style={{ textTransform: "capitalize" }}>
                    distribution zone: {account.location.distZone}
                  </p>
                  <p># of Plants: {account.plants.length}</p>
                  {/* <p>notes: {account.notes.note}</p> */}
                </div>
                <span>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeAccount(account._id)}
                  >
                    <FaRegTrashAlt />
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
