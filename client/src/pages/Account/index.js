import React from 'react'
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";


const Account = () => {
    const [state] = useStoreContext();
    const {accountName, address, client, clientEmail, clientPhone, distZone, notes} = state.account;
    console.log("Account State:", state.account)

    let history = useHistory();

    const addPlant = () => {
        history.push("/")
    }

    return (
        <div className="container">
            <h1>Account Page</h1>
            <div className="card">
                <div className="card-body">
                <span>
                    <h5 className="account-title">
                    Account: {accountName}
                    </h5>
                </span>
                <h6>Client: {client}</h6>
                <ul>
                    <li>{clientPhone}</li>
                    <li>{clientEmail}</li>
                </ul>
                <p>location: {address}</p>
                <p>distribution zone: {distZone}</p>
                <p>notes: {notes}</p>
                </div>
                <span>
                <button className="btn btn-danger" onClick={() => addPlant()}>
                  Add Plant
                </button>
                </span>
            </div>
        </div>
    )
}

export default Account
