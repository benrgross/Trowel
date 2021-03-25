import "./home.css"
import React, { useRef } from 'react'
import API from "../../utils/API"

const Home = () => {
    const accountNameRef = useRef();
    const clientNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const zoneRef = useRef();
    const notesRef = useRef();

    const saveAccount = (event) => {
        event.preventDefault()
        
        const account = {
            accountName: accountNameRef.current.value,
            clientContact: {
                clientName: clientNameRef.current.value,
                phone: phoneRef.current.value,
                email: emailRef.current.value
            },
            location: {
                address: addressRef.current.value,
                distZone: zoneRef.current.value,
            }
        }

        console.log({
            accountName: accountNameRef.current.value,
            clientContact: {
                clientName: clientNameRef.current.value,
                phone: phoneRef.current.value,
                email: emailRef.current.value
            },
            location: {
                address: addressRef.current.value
            }
        })

        // API.saveAccount(account)
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
                        name="Notes"
                        ref={notesRef}
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
        </div>
    )
}

export default Home
