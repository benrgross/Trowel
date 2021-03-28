import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory, Link } from "react-router-dom";
import { SAVE_TO_ACCOUNT } from "../../utils/actions";
import "./style.css";

function CurrentAccountCard() {
  const [state, dispatch] = useStoreContext();
  const {
    accountID,
    accountName,
    address,
    client,
    clientEmail,
    clientPhone,
    distZone,
  } = state.account;
  console.log("Account State:", state.account);
  let history = useHistory();

  const addPlant = () => {
    // dispatch state of current account that the plant will be saved to
    dispatch({
      type: SAVE_TO_ACCOUNT,
      accountName: accountName,
    });
    history.push("/search");
  };
  return (
    <div className="container">
      <h1>Account Page</h1>
      <div className="card account-cards " key={accountID}>
        <div className="card-body ">
          <span>
            <h5 className="account-title">Account: {accountName}</h5>
          </span>
          <h6>Client: {client}</h6>
          <ul>
            <li>{clientPhone}</li>
            <li>{clientEmail}</li>
          </ul>
          <p>location: {address}</p>
          <p>distribution zone: {distZone}</p>
          {/* <p># of Plants: {plants.length}</p> */}
        </div>
        <span>
          <button className="btn btn-danger" onClick={addPlant}>
            Add Plant
          </button>
        </span>
      </div>
    </div>
  );
}

export default CurrentAccountCard;
