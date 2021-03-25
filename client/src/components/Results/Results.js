import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import axios from "axios"

function Results() {
  const [state, dispatch] = useStoreContext();

  const getPlant = async (plant) => {
    const item = {
      url: plant.links.self,
    };
    
    const { data } = await API.getPlant(item);
    
    console.log(item.url);
    console.log(plant);
    console.log(data);

    const plantObject = {
      atmosHumidity: data.atmosHumidity,
      bloomMonths: data.bloomMonths,
      commonName: data.commonName,
      edible: data.edible,
      family: data.family,
      familyCommonName: data.familyCommonName,
      color: data.flowerColor.color,
      conspicuous: data.flowerColor.conspicuous,
      genus: data.genus,
      growthHabit: data.growthHabit,
      heightAvgCm: data.heightAvg.cm + "cm",
      img: plant.img,
      light: data.light,
      maxPh: data.maxPh,
      maxPrecipitation: data.maxPrecipitation.mm + "mm",
      maxDeg_f: data.maxTemp.deg_f,
      maxDeg_c: data.maxTemp.deg_c,
      minPh: data.minPh,
      minPrecipitation: data.minPrecipitation.mm + "mm",
      minDeg_f: data.minTemp.deg_f,
      minDeg_c: data.minTemp.deg_c,
      native: data.native,
      scientificName: data.scientific_name,
      soilNutriments: data.soilNutriments,
      soilTexture: data.soilTexture
    };

    // API.savePlant(plantObject)

    // Use a dispatch to send this object and set the values to viewPlant state value
    dispatch({
      type: "SPOTLIGHT",
      spotlight: {
        commonName: plant.commonName,
        scientificName: plant.scientificName,
        img: plant.img
      }
    })

  };

  return (
    <div>
      {state.results.map((plant) => (
        <div className="container">
          <p>{plant.commonName}</p>
          <p>{plant.scientificName} </p>
          <div className="container">
            <img
              onClick={() => getPlant(plant)}
              className="img-thumbnail"
              style={{ height: "200px", cursor: "pointer" }}
              src={plant.img}
            />
          </div>
        </div>
      ))}
      ,
    </div>
  );
}

export default Results;
