import "./home.css"
import React, { useRef } from 'react'
import axios from "axios"

const Home = () => {
    const nameRef = useRef();
    const locationRef = useRef();
    const contactRef = useRef();

    const saveAccount = (event) => {
        event.preventDefault()
        
        axios.post("/api/accounts", {
            name: nameRef,
            location: locationRef,
            contact: contactRef
        })

        console.log({
            name: nameRef,
            location: locationRef,
            contact: contactRef
        })
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
                        name="name"
                        ref={nameRef}
                        placeholder="Name"
                        className="form-control"
                    />
                    </div>
                    <div className="form-group ">
                    <label>Account Location</label>
                    <input
                        name="location"
                        ref={locationRef}
                        placeholder="Location"
                        className="form-control"
                    />
                    </div>
                    <div className="form-group ">
                    <label>Contact Info</label>
                    <input
                        name="contact"
                        ref={contactRef}
                        placeholder="Phone Number/Email"
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
