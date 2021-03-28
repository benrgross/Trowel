import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory, Link } from "react-router-dom";
import { REMOVE_PLANT, SAVE_TO_ACCOUNT, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import BackBtn from "../../components/BackBtn";

const Account = () => {
  const [state, dispatch] = useStoreContext();
  const {
    accountID,
    accountName,
    address,
    client,
    clientEmail,
    clientPhone,
    distZone,
    notes,
    plants,
  } = state.account;
  console.log("Account State:", state.account);
  let history = useHistory();

  const removePlant = async (id) => {
    dispatch({
      type: LOADING,
    });
    console.log("Account ID", accountID);
    console.log("Plant ID", id);
    const update = await API.updateAccount(accountID, id);
    console.log("Update Successful!", update);

    dispatch({
      type: REMOVE_PLANT,
      plantID: id,
    });
  };
  const addPlant = () => {
    // dispatch state of current account that the plant will be saved to
    dispatch({
      type: SAVE_TO_ACCOUNT,
      accountName: accountName,
    });
    history.push("/");
  };
  const getPlant = async (plant, id, notes) => {
    console.log("Plant ID: ", id);
    console.log("Plant Notes: ", notes);

    const plantObject = {
      id: id,
      atmosHumidity: plant.atmosHumidity,
      bloomMonths: plant.bloomMonths,
      commonName: plant.commonName,
      edible: plant.edible,
      family: plant.family,
      familyCommonName: plant.familyCommonName,
      flowerColor: {
        color: plant.flowerColor.color,
        conspicuous: plant.flowerColor.conspicuous,
      },
      genus: plant.genus,
      growthHabit: plant.growthHabit,
      heightAvgCm: plant.heightAvg,
      img: plant.img,
      light: plant.light,
      maxPh: plant.maxPh,
      maxPrecipitation: plant.maxPrecipitation,
      maxTemp: {
        deg_f: plant.maxTemp.deg_f,
        deg_c: plant.maxTemp.deg_c,
      },
      minPh: plant.minPh,
      minPrecipitation: plant.minPrecipitation,
      minTemp: {
        deg_f: plant.minTemp.deg_f,
        deg_c: plant.minTemp.deg_c,
      },
      native: plant.native,
      scientificName: plant.scientific_name,
      soilNutriments: plant.soilNutriments,
      soilTexture: plant.soilTexture,
      notes: notes ? notes.note : "",
      notesDate: notes ? notes.date : ""
    };
    console.log("Plant Object: ", plantObject);

    dispatch({
      type: "SPOTLIGHT",
      spotlight: plantObject,
      switch: false,
    });

    history.push("/plant");
  };

  return (
    <div className="container">
      <h1>Account Page</h1>
      <div className="card" key="account">
        <div className="card-body">
          <span>
            <h5 className="account-title">Account: {accountName}</h5>
          </span>
          <h6>Client: {client}</h6>
          <ul>
            <li>{clientPhone}</li>
            <li>{clientEmail}</li>
          </ul>
          <p>location: {address}</p>
          <p>distribution zone: {distZone}</p>
          {/* <p># of Plants: {plants.length}</p> */}
        </div>
        <span>
          <button className="btn btn-danger" onClick={addPlant}>
            Add Plant
          </button>
        </span>
      </div>
      <h2>Plants In Account: </h2>
      {plants
        ? plants.map(({ plant, _id, notes, lightCondition }) => (
            <div className="container spotlight-card" key={_id}>
              <img
                className="img-thumbnail"
                style={{ height: "200px", cursor: "pointer" }}
                src={plant.img}
              />
              <button onClick={() => getPlant(plant, _id, notes)}>Notes</button>
              <button onClick={() => removePlant(_id)}>Delete Plant</button>
              <p>Name: {plant.commonName}</p>
              <p>Humidity: {plant.atmosHumidity}</p>
              <p>Light Condition: {lightCondition}</p>
              <p>Bloom Months: {plant.bloomMonths}</p>
              <p>Edible: {plant.edible}</p>
              <p>Family: {plant.family}</p>
              <p>Family Common Name: {plant.familyCommonName}</p>
              <p>Genus: {plant.genus}</p>
              <p>Growth Habit: {plant.growthHabit}</p>
              <p>Light Level: {plant.light}</p>
              <p>Max pH Level: {plant.maxPh}</p>
              <p>Minimum pH Level: {plant.minPh}</p>
              <p>Max Precipitation: {plant.maxPrecipitation}</p>
              <p>Minimum Precipitation: {plant.minPrecipitation}</p>
              {plant.native ? (
                <p>Native: {plant.native.join(", ")}</p>
              ) : undefined}
              <p>Soil Nutriments: {plant.soilNutriments}</p>
              <p>Soil Texture: {plant.soilTexture}</p>

              {/* <p>Notes: {notes}</p> */}
              <div className="container"></div>
            </div>
          ))
        : "No Plants Added"}
      <footer>
        <Link to="/home">
          <BackBtn />
        </Link>
      </footer>
    </div>
  );
};
export default Account;
