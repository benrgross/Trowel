import React from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_ACCOUNT, SET_SAVED_ACCOUNT } from "../../utils/actions";
import { useHistory } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
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
                        <span className="account-title">
                          <h5>Account: {account.accountName}</h5>
                          <button
                            className="btn delete"
                            onClick={() => removeAccount(account._id)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </span>
                        <h6 className="account-info">
                          Client: {account.clientContact.clientName}
                        </h6>
                        <ul>
                          <li>{account.clientContact.phone}</li>
                          <li>{account.clientContact.email}</li>
                        </ul>
                        <p className="account-info">
                          location: {account.location.address}
                        </p>
                        <p className="account-info">
                          distribution zone: {account.location.distZone}
                        </p>
                        <p># of Plants: {account.plants.length}</p>
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
