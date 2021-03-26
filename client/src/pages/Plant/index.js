import "./plant.css"
import React from 'react'
import { useStoreContext } from "../../utils/GlobalState";

const Plant = () => {
    const [state, dispatch] = useStoreContext();

    console.log("State: ",state)

    return (
        <div>
            <h1>View A Plant Here!</h1>
            <h2>Plant Card:</h2>

            {/* <div className="container spotlight-card">
                <p>{state.viewPlant.commonName}</p>
                <p>{state.viewPlant.scientificName} </p>
                <div className="container">
                    <img
                    onClick={() => console.log("Clicked!")}
                    className="img-thumbnail"
                    style={{ height: "200px", cursor: "pointer" }}
                    src={state.viewPlant.img}
                    />
                </div>
            </div> */}
        </div>
    )
}

export default Plant
