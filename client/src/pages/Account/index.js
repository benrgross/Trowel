import React from 'react'
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";
import { SAVE_TO_ACCOUNT } from "../../utils/actions";
import API from "../../utils/API"

const Account = () => {
    const [state, dispatch] = useStoreContext();
    const { accountID, accountName, address, client, clientEmail, clientPhone, distZone, notes, plants } = state.account;
    console.log("Account State:", state.account)

    const updatedState = (index) => {
        const plantId = state.account.plants.splice(index, 1);
        console.log("Changed State: ", plantId)
        
        // API.updateAccount(accountID, accountObj)
    }

    let history = useHistory();

    const addPlant = () => {
        // dispatch state of current account that the plant will be saved to
        dispatch({
            type: SAVE_TO_ACCOUNT,
            accountName: accountName
        })

        history.push("/")
    }

    const deletePlant = (id) => {
        API.deletePlant(id)
    }

    return (
        <div className="container">
            <h1>Account Page</h1>
            <div className="card" key="account">
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
                <button className="btn btn-danger" onClick={addPlant}>
                  Add Plant
                </button>
                </span>
            </div>
            <h2>Plants In Account: </h2>
            {plants ? plants.map(({ plant: {
                atmosHumidity, bloomMonths, commonName, edible, family, familyCommonName, genus, growthHabit, img, light, maxPh, maxPrecipitation, minPh, minPrecipitation, native, soilNutriments, soilTexture
            }, _id, notes }, index) => 
                <div className="container spotlight-card" key={_id}>
                    {/* <button onClick={() => deletePlant(_id)}>Delete Plant</button> */}
                    <button onClick={() => updatedState(index)}>Delete Plant</button>
                    <p>Name: {commonName}</p>
                    <p>Humidity: {atmosHumidity}</p>
                    <p>Bloom Months: {bloomMonths}</p>
                    <p>Edible: {edible}</p>
                    <p>Family: {family}</p>
                    <p>Family Common Name: {familyCommonName}</p>
                    <p>Genus: {genus}</p>
                    <p>Growth Habit: {growthHabit}</p>
                    <p>Light Level: {light}</p>
                    <p>Max pH Level: {maxPh}</p>
                    <p>Minimum pH Level: {minPh}</p>
                    <p>Max Precipitation: {maxPrecipitation}</p>
                    <p>Minimum Precipitation: {minPrecipitation}</p>
                    {native ? <p>Native: {native.join(", ")}</p> : undefined}
                    <p>Soil Nutriments: {soilNutriments}</p>
                    <p>Soil Texture: {soilTexture}</p>
                    <p>Notes: {notes}</p>
                    <div className="container">
                    <img
                        className="img-thumbnail"
                        style={{ height: "200px", cursor: "pointer" }}
                        src={img}
                    />
                    </div>
                </div>
            ) : "No Plants Added"}
        </div>
    )
}

export default Account
