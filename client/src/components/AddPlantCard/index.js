import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { SET_SAVED_ACCOUNT } from "../../utils/actions";
import "./spotlight.css";

function AddPlantCard() {
  const [state, dispatch] = useStoreContext();
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
      soilNutriments,
      soilTexture,
      lightCondition,
    },
  } = state;

  console.log(scientificName);
  const lightRef = useRef();
  let history = useHistory();

  const savePlantObj = {
    plant: state.viewPlant,
    accountName: state.accountName,
  };

  const savePlantSelection = async () => {
    const { data: newPlant } = await API.addPlantToAccount(savePlantObj);
    console.log("new Plant", newPlant);

    const saveLight = {
      id: newPlant._id,
      plantId: newPlant.plants[newPlant.plants.length - 1]._id,
      accountName: state.accountName,
      lightCondition: lightRef.current.value,
    };
    await API.addLightConditions(saveLight);

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

    console.log("get plants", data.plants);
    dispatch({
      type: SET_SAVED_ACCOUNT,
      account: accountObj,
    });
    history.push("/account");
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 plant-card-title">
          <h1>{commonName}</h1>
        </div>
      </div>

      {state.switch ? (
        <div className="container">
          <div className="container spotlight-card shadow">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className=" plant-view-card">
                  <div className="row card-top d-flex justify-content-center">
                    {/* <div className="col-sm-0 col-md-1 col-lg-1"></div> */}
                    <div className="col-sm-12 col-md-5 col-lg-5">
                      {img ? (
                        <img
                          className="card-img-top add-plant-img"
                          style={{
                            height: "17rem",
                            cursor: "pointer",
                            // width: "20rem",
                            // marginLeft: "50px",
                          }}
                          src={img}
                          alt={commonName}
                        />
                      ) : (
                        <img
                          className="img-thumbnail"
                          style={{ height: "19rem", cursor: "pointer" }}
                          alt={commonName}
                          src={
                            "https://www.creativefabrica.com/wp-content/uploads/2019/12/09/Plants-Monochrome-Icon-Vector-Graphics-1-5-580x386.jpg"
                          }
                        />
                      )}
                    </div>

                    <div className="col-sm-12 col-md-5 col-lg-5">
                      <p style={{ marginTop: "20px" }}>Name - {commonName}</p>
                      <p>Scientific Name - {scientificName}</p>

                      {edible ? <p>Edible - {edible}</p> : ""}
                      {family ? <p>Family - {family}</p> : ""}
                      {familyCommonName ? (
                        <p>Family Common Name - {familyCommonName}</p>
                      ) : (
                        ""
                      )}
                      {genus ? <p>Genus: {genus}</p> : ""}
                    </div>
                    <div className="hr "></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 card-body info">
                      {growthHabit ? <p>Growth Habit - {growthHabit}</p> : ""}
                      {heightAvgCm ? <p>Average Height - {heightAvgCm}</p> : ""}
                      {light ? <p>Light Index - {light}</p> : ""}
                      {native ? <p>Native To - {native.join(", ")}</p> : ""}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6c card-body info">
                      {maxPh ? <p>Max pH - {maxPh}</p> : ""}
                      {minPh ? <p>Minimum pH - {minPh}</p> : ""}
                      {maxPrecipitation ? (
                        <p>Max Precipitation - {maxPrecipitation}</p>
                      ) : (
                        ""
                      )}
                      {minPrecipitation ? (
                        <p>Minimum Precipitation - {minPrecipitation}</p>
                      ) : (
                        ""
                      )}
                      {atmosHumidity ? <p>Humidity - {atmosHumidity}</p> : ""}
                      {soilNutriments ? (
                        <p>Soil Nutriments - {soilNutriments}</p>
                      ) : (
                        ""
                      )}
                      {soilTexture ? <p>Soil Texture - {soilTexture}</p> : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 card-body info">
                      <form>
                        <span>How Much Sun Will It Get </span>
                        <select
                          ref={lightRef}
                          className="form-control light-choose"
                        >
                          <option>Full Sun</option>
                          <option>Partial Sun</option>
                          <option>Shade</option>
                          <option>Deep Shade</option>
                        </select>
                      </form>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 d-flex card-body info add-btn">
                      <div className="container p-2  d-flex justify-content-center">
                        <button
                          className="btn submit add-plant p-2"
                          onClick={savePlantSelection}
                        >
                          Add Plant
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="container spotlight-card">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className=" plant-view-card">
                  <div className="row card-top d-flex justify-content-center">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      {img ? (
                        <img
                          className="card-img-top img-thumbnail "
                          style={{ height: "16rem", cursor: "pointer" }}
                          src={img}
                          alt={commonName}
                        />
                      ) : (
                        <img
                          className="img-thumbnail"
                          style={{ height: "16rem", cursor: "pointer" }}
                          alt={commonName}
                          src={
                            "https://www.creativefabrica.com/wp-content/uploads/2019/12/09/Plants-Monochrome-Icon-Vector-Graphics-1-5-580x386.jpg"
                          }
                        />
                      )}
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <p>Name - {commonName}</p>
                      <p>Scientific Name - {scientificName}</p>

                      {edible ? <p>Edible - {edible}</p> : ""}
                      {family ? <p>Family - {family}</p> : ""}
                      {familyCommonName ? (
                        <p>Family Common Name - {familyCommonName}</p>
                      ) : (
                        ""
                      )}
                      {genus ? <p>Genus: {genus}</p> : ""}
                    </div>
                    <div className="hr "></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 card-body info">
                      {growthHabit ? <p>Growth Habit - {growthHabit}</p> : ""}
                      {heightAvgCm ? <p>Average Height - {heightAvgCm}</p> : ""}
                      {light ? <p>Light Index - {light}</p> : ""}
                      {native ? <p>Native To - {native.join(", ")}</p> : ""}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6c card-body info">
                      {maxPh ? <p>Max pH - {maxPh}</p> : ""}
                      {minPh ? <p>Minimum pH - {minPh}</p> : ""}
                      {maxPrecipitation ? (
                        <p>Max Precipitation - {maxPrecipitation}</p>
                      ) : (
                        ""
                      )}
                      {minPrecipitation ? (
                        <p>Minimum Precipitation - {minPrecipitation}</p>
                      ) : (
                        ""
                      )}
                      {atmosHumidity ? <p>Humidity - {atmosHumidity}</p> : ""}
                      {soilNutriments ? (
                        <p>Soil Nutriments - {soilNutriments}</p>
                      ) : (
                        ""
                      )}
                      {soilTexture ? <p>Soil Texture - {soilTexture}</p> : ""}
                      {lightCondition ? (
                        <p>Light Condition - {lightCondition}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const style = {
  display: "block",
  height: "500px",
  width: "100%",
};

export default AddPlantCard;
