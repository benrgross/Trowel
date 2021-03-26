import React from 'react'
import { useStoreContext } from "../../utils/GlobalState";
import { FaTimes } from "react-icons/fa";

const Account = () => {
    const [state] = useStoreContext();
    console.log("Account State:", state.account)

    const {accountName, address, client, clientEmail, clientPhone, distZone, notes} = state.account;

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
            </div>
        </div>
    )
}

export default Account
