import React from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_ACCOUNT, SET_SAVED_ACCOUNT } from "../../utils/actions";
import { useHistory } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

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
    <div>
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
}

export default AccountCard;
