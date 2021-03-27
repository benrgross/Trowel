import "./plant.css";
import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { SET_SAVED_ACCOUNT } from "../../utils/actions";

const Plant = () => {
  const [state, dispatch] = useStoreContext();

  let history = useHistory();

  const savePlantObj = {
    plant: state.viewPlant,
    accountName: state.accountName,
  };

  console.log("Plant To Save: ", savePlantObj);

  const {
    viewPlant: {
      commonName,
      scientificName,
      img,
      atmosHumidity,
      edible,
      family,
      familyCommonName,
      genus,
      growthHabit,
      heightAvgCm,
      light,
      maxPh,
      maxPrecipitation,
      minPh,
      minPrecipitation,
      native,
      notes,
      soilNutriments,
      soilTexture,
    },
  } = state;

  const savePlantSelection = async () => {
    const { data: newPlant } = await API.addPlantToAccount(savePlantObj);
    console.log("Plant Saved!");

    const { data } = await API.getPlantsByAccount({
      accountName: state.accountName,
    });

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

  return (
    <div>
      <h1>View A Plant Here!</h1>
      <h2>Plant Card:</h2>

      <div className="container spotlight-card">
        <button onClick={savePlantSelection}>Add Plant</button>
        <p>Name: {commonName}</p>
        <p>Scientific Name: {scientificName}</p>
        {atmosHumidity ? <p>Humidity: {atmosHumidity}</p> : ""}
        {edible ? <p>Edible: {edible}</p> : ""}
        {family ? <p>Family: {family}</p> : ""}
        {familyCommonName ? <p>Family Common Name: {familyCommonName}</p> : ""}
        {genus ? <p>Genus: {genus}</p> : ""}
        {growthHabit ? <p>Growth Habit: {growthHabit}</p> : ""}
        {heightAvgCm ? <p>Average Height: {heightAvgCm}</p> : ""}
        {light ? <p>Light Level: {light}</p> : ""}
        {maxPh ? <p>Max pH Level: {maxPh}</p> : ""}
        {minPh ? <p>Minimum pH Level: {minPh}</p> : ""}
        {maxPrecipitation ? <p>Max Precipitation: {maxPrecipitation}</p> : ""}
        {minPrecipitation ? (
          <p>Minimum Precipitation: {minPrecipitation}</p>
        ) : (
          ""
        )}
        {native ? <p>Native: {native.join(", ")}</p> : ""}
        {soilNutriments ? <p>Soil Nutriments: {soilNutriments}</p> : ""}
        {soilTexture ? <p>Soil Texture: {soilTexture}</p> : ""}
        <p>Notes: {notes}</p>
        <div className="container">
          {img ? (
            <img
              className="img-thumbnail"
              style={{ height: "200px", cursor: "pointer" }}
              src={img}
              alt={commonName}
            />
          ) : (
            <img
              className="img-thumbnail"
              style={{ height: "200px", cursor: "pointer" }}
              alt={commonName}
              src={
                "https://www.creativefabrica.com/wp-content/uploads/2019/12/09/Plants-Monochrome-Icon-Vector-Graphics-1-5-580x386.jpg"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Plant;
