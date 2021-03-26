import "./plant.css";
import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";

const Plant = () => {
  const [state, dispatch] = useStoreContext();
  // console.log("State: ", state.viewPlant);

  const savePlantObj = {
    plant: state.viewPlant,
    accountName: state.accountName
  }

  console.log("Plant To Save: ", savePlantObj)

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
    // const { data: selectedPlant } = await API.savePlant(state.viewPlant);
    const { data: savedPlant } = await API.addPlantToAccount(savePlantObj);

    console.log("Plant Saved!");
  };

  return (
    <div>
      <h1>View A Plant Here!</h1>
      <h2>Plant Card:</h2>

      {/* TODO: Add Ternary statement for null values */}
      <div className="container spotlight-card">
        <button onClick={savePlantSelection}>Add Plant</button>
        <p>Name: {commonName}</p>
        <p>Scientific Name: {scientificName}</p>
        <p>Humidity: {atmosHumidity}</p>
        <p>Edible: {edible}</p>
        <p>Family: {family}</p>
        <p>Family Common Name: {familyCommonName}</p>
        <p>Genus: {genus}</p>
        <p>Growth Habit: {growthHabit}</p>
        <p>Average Height: {heightAvgCm}</p>
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
            onClick={() => console.log("Clicked!")}
            className="img-thumbnail"
            style={{ height: "200px", cursor: "pointer" }}
            src={img}
          />
        </div>
      </div>
    </div>
  );
};

export default Plant;
