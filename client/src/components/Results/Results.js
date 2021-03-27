import React from "react";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./style.css";

function Results() {
  const [state, dispatch] = useStoreContext();

  console.log("Account Name: ", state.accountName);

  let history = useHistory();

  const getPlant = async (plant) => {
    const item = {
      url: plant.links.self,
    };

    const { data } = await API.getPlant(item);

    const plantObject = {
      atmosHumidity: data.atmosHumidity,
      bloomMonths: data.bloomMonths,
      commonName: data.commonName,
      edible: data.edible,
      family: data.family,
      familyCommonName: data.familyCommonName,
      flowerColor: {
        color: data.flowerColor.color,
        conspicuous: data.flowerColor.conspicuous,
      },
      genus: data.genus,
      growthHabit: data.growthHabit,
      heightAvgCm: data.heightAvg.cm,
      img: plant.img,
      light: data.light,
      maxPh: data.maxPh,
      maxPrecipitation: data.maxPrecipitation.mm,
      maxTemp: {
        deg_f: data.maxTemp.deg_f,
        deg_c: data.maxTemp.deg_c,
      },
      minPh: data.minPh,
      minPrecipitation: data.minPrecipitation.mm,
      minTemp: {
        deg_f: data.minTemp.deg_f,
        deg_c: data.minTemp.deg_c,
      },
      native: data.native,
      scientificName: data.scientific_name,
      soilNutriments: data.soilNutriments,
      soilTexture: data.soilTexture,
      notes: "",
    };

    dispatch({
      type: "SPOTLIGHT",
      spotlight: plantObject,
    });

    history.push("/plant");
  };

  return (
    <div>
      {state.results.length <= 1 ? (
        ""
      ) : (
        <div>
          {state.results.map((plant) => (
            <div className="container">
              <div className="card">
                {plant.img ? (
                  <div className="img-container">
                    <img
                      onClick={() => getPlant(plant)}
                      alt={plant.commonName}
                      className="img-thumbnail"
                      src={plant.img}
                    />
                  </div>
                ) : (
                  <div className="img-container">
                    <img
                      onClick={() => getPlant(plant)}
                      className="img-thumbnail"
                      alt={plant.commonName}
                      src={
                        "https://www.creativefabrica.com/wp-content/uploads/2019/12/09/Plants-Monochrome-Icon-Vector-Graphics-1-5-580x386.jpg"
                      }
                    />
                  </div>
                )}
                <div className="card-body">
                  <p>{plant.commonName}</p>
                  <p>{plant.scientificName} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
