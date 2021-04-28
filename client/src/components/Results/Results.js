import React from "react";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import "./style.css";

function Results() {
  const [state, dispatch] = useStoreContext();

  let history = useHistory();

  const getPlant = async (plant) => {
    const item = {
      url: plant.links.self,
    };
    localStorage.removeItem("plantURL");
    localStorage.setItem("plantURL", JSON.stringify(item));

    const { data } = await API.getPlant(item);
    console.log("dataforben", data.images);

    const plantObject = {
      images: data.images,
      atmosHumidity: data.atmosHumidity,
      bloomMonths: data.bloomMonths,
      commonName: data.commonName,
      scientificName: data.scientificName,
      edible: data.edible,
      family: data.family,
      familyCommonName: data.familyCommonName,
      flowerColor: {
        color: data.flowerColor.color,
        conspicuous: data.flowerColor.conspicuous,
      },
      genus: data.genus,
      growthHabit: data.growthHabit,
      growthForm: data.growthForm,
      growthRate: data.growthRate,
      heightAvgCm: data.heightAvg.cm,
      img: plant.img,
      light: data.light,
      maxPh: data.maxPh,
      maxPrecipitation: data.maxPrecipitation.mm,
      maxTemp: data.maxTemp,
      minPh: data.minPh,
      minPrecipitation: data.minPrecipitation.mm,
      minTemp: data.minTemp,
      native: data.native,
      soilNutriments: data.soilNutriments,
      soilTexture: data.soilTexture,
      soilHumidity: data.soilHumidity,
      lightCondition: state.viewPlant.lightCondition,
      notes: "",
    };

    console.log("Plant Obj: ", plantObject);

    dispatch({
      type: "SPOTLIGHT",
      url: data.url,
      spotlight: plantObject,
      switch: true,
    });

    history.push("/plant");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            {state.results[0] === {} ? (
              " "
            ) : (
              <div className="row">
                {state.results.map((plant) => (
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div
                      className="card plant-card"
                      onClick={() => getPlant(plant)}
                    >
                      {plant.img ? (
                        <div className="row">
                          <div className="col-md-12">
                            <div className="img-container">
                              <img
                                alt={plant.commonName}
                                className="card-img-top rounded search-plant-img"
                                src={plant.img}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="img-container">
                          <img
                            onClick={() => getPlant(plant)}
                            className="card-img-top rounded search-plant-img"
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
        </div>
      </div>
    </div>
  );
}

export default Results;
