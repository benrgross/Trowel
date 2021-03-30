import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory, Link } from "react-router-dom";
import { SAVE_TO_ACCOUNT } from "../../utils/actions";
import { FaPhoneSquareAlt, FaEnvelope } from "react-icons/fa";
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
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3"></div>
        <div className="col-sm-12 col-md-4 col-lg-3"></div>
        <div className="col-sm-12 col-md-4 col-lg-3"></div>
        <div className="col-sm-12 col-md-4 col-lg-3">
          <span>
            <button
              style={{ width: "60%" }}
              className="btn plant"
              onClick={addPlant}
            >
              Add Plant
            </button>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-3"></div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="card indiv-account-cards" key={accountID}>
            <div className="card-body ">
              <span>
                <h5 className="account-title account-info">
                  Account: {accountName}
                </h5>
              </span>
              <p className="account-info">Client: {client}</p>
              <div>
                <p>
                  <FaPhoneSquareAlt /> {clientPhone}
                </p>
                <p>
                  <FaEnvelope /> {clientEmail}
                </p>
              </div>
              <p className="account-info">location: {address}</p>
              <p className="account-info">{distZone}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3"></div>
      </div>
    </div>
  );
}

export default CurrentAccountCard;
