import React from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_ACCOUNT, SET_SAVED_ACCOUNT, VIEW_ACCOUNT_NOTES } from "../../utils/actions";
import { useHistory } from "react-router-dom";
import { FaRegTrashAlt, FaPhoneSquareAlt, FaEnvelope } from "react-icons/fa";
import "./style.css";

function AccountCard() {
  const [state, dispatch] = useStoreContext();

  let history = useHistory();

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

    localStorage.setItem(
      "currentAccount",
      JSON.stringify({
        accountName: account,
      })
    );

    dispatch({
      type: SET_SAVED_ACCOUNT,
      account: accountObj,
    });

    history.push("/account");
  };

  const removeAccount = async (id, event) => {
    event.stopPropagation();

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

  const viewAccountNotes = async (accountID, event) => {
    event.stopPropagation();

    dispatch({
      type: VIEW_ACCOUNT_NOTES,
      accountID,
    });

    history.push("/account-notes");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {state.accounts.length ? (
            <div className="row">
              {state.accounts.map((account) => {
                return (
                  <div className="col-md-6">
                    <div className="card account-cards" key={account._id}>
                      <div
                        className="card-body"
                        onClick={() => viewAccount(account.accountName)}
                      >
                        <span className="account-title account-info">
                          <h5>Account: {account.accountName}</h5>
                          <button
                            type="button"
                            className="btn delete"
                            onClick={(e) => removeAccount(account._id, e)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </span>
                        <p className="account-info">
                          Client: {account.clientContact.clientName}
                        </p>
                        <div>
                          <p>
                            <FaPhoneSquareAlt /> {account.clientContact.phone}
                          </p>
                          <p>
                            <FaEnvelope /> {account.clientContact.email}
                          </p>
                        </div>
                        <p className="account-info">
                          location: {account.location.address}
                        </p>
                        <p className="account-info">
                          {account.location.distZone}
                        </p>
                        <p># of Plants: {account.plants.length}</p>
                        <button
                            type="button"
                            className="btn show-btn"
                            onClick={(e) => viewAccountNotes(account._id, e)}
                          >
                            View Notes
                          </button>
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
      </div>
    </div>
  );
}

export default AccountCard;
