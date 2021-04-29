import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { SET_SAVED_ACCOUNT, CAROUSEL } from "../../utils/actions";
import Carousel from "../Carousel/Index";
import { FaRegWindowClose } from "react-icons/fa";

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
      growthRate,
      growthForm,
      heightAvgCm,
      light,
      maxTemp,
      minTemp,
      maxPh,
      maxPrecipitation,
      minPh,
      minPrecipitation,
      native,
      soilNutriments,
      soilTexture,
      soilHumidity,
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

  const viewImages = (type) => {
    dispatch({
      type: CAROUSEL,
      view: type,
      carousel: true,
    });
  };

  // const viewBark = () => {
  //   dispatch({
  //     type: CAROUSEL,
  //     view: "bark",
  //     carousel: true,
  //   });
  // };

  // const viewFlower = () => {
  //   dispatch({
  //     type: CAROUSEL,
  //     view: "flower",
  //     carousel: true,
  //   });
  // };

  const closeCarousel = () => {
    dispatch({
      type: CAROUSEL,
      carousel: false,
    });
  };
  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 plant-card-title">
          <h1>{commonName}</h1>
        </div>

        {state.carousel ? (
          <div className="container carousel-container">
            <FaRegWindowClose
              style={{ cursor: "pointer" }}
              onClick={closeCarousel}
            />
            <Carousel />{" "}
          </div>
        ) : (
          ""
        )}
      </div>

      {state.carousel ? (
        " "
      ) : (
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
                      {state.viewPlant.images.leaf.length > 0 ? (
                        <button
                          className="btn submit add-plant p-2"
                          onClick={() => viewImages("leaf")}
                        >
                          leaf
                        </button>
                      ) : (
                        " "
                      )}{" "}
                      {state.viewPlant.images.bark.length > 0 ? (
                        <button
                          className="btn submit add-plant p-2"
                          onClick={() => viewImages("bark")}
                        >
                          bark
                        </button>
                      ) : (
                        " "
                      )}{" "}
                      {state.viewPlant.images.flower.length > 0 ? (
                        <button
                          className="btn submit add-plant p-2"
                          onClick={() => viewImages("flower")}
                        >
                          flower
                        </button>
                      ) : (
                        " "
                      )}{" "}
                      {state.viewPlant.images.habit.length > 0 ? (
                        <button
                          className="btn submit add-plant p-2"
                          onClick={() => viewImages("habit")}
                        >
                          habit
                        </button>
                      ) : (
                        " "
                      )}{" "}
                      {state.viewPlant.images.other.length > 0 ? (
                        <button
                          className="btn submit add-plant p-2"
                          onClick={() => viewImages("other")}
                        >
                          other
                        </button>
                      ) : (
                        " "
                      )}{" "}
                    </div>

                    <div className="col-sm-12 col-md-5 col-lg-5">
                      <p style={{ marginTop: "20px" }}>
                        Name: <span className="data">{commonName} </span>{" "}
                      </p>
                      <p>
                        Scientific Name:{" "}
                        <span className="data">{scientificName}</span>{" "}
                      </p>

                      {edible ? (
                        <p>
                          Edible: <span className="data">{edible}</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {family ? (
                        <p>
                          Family: <span className="data">{family}</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {familyCommonName ? (
                        <p>
                          Family Common Name:{" "}
                          <span className="data">{familyCommonName}</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {genus ? (
                        <p>
                          Genus: <span className="data">{genus}</span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="hr "></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 card-body info">
                      {growthHabit ? (
                        <p>
                          Growth Habit:{" "}
                          <span className="data">{growthHabit}</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {growthForm ? (
                        <p>
                          Growth Form:{" "}
                          <span className="data">{growthForm}</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {growthRate ? (
                        <p>
                          Growth Rate:{" "}
                          <span className="data">{growthRate}</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {heightAvgCm ? (
                        <p>
                          Average Height:{" "}
                          <span className="data">{heightAvgCm}cm</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {light ? (
                        <p>
                          Light Index: <span className="data">{light}</span>{" "}
                          <br></br>
                          <span className="unit-data">
                            Required amount of light, on a scale from 0 (no
                            light, less than or equal to 10 lux) to 10 (very
                            intensive insolation, greater than or equal to
                            100,000 lux)
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                      {native ? (
                        <p>
                          Native To:{" "}
                          <span className="data">{native.join(", ")}</span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6c card-body info">
                      {maxTemp ? (
                        <p>
                          Max Temp: <span className="data">{maxTemp}F </span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {minTemp ? (
                        <p>
                          Min Temp:
                          <span className="data">{minTemp}F</span>
                        </p>
                      ) : (
                        ""
                      )}
                      {maxPh ? (
                        <p>
                          Max pH: <span className="data">{maxPh}</span>
                        </p>
                      ) : (
                        ""
                      )}
                      {minPh ? (
                        <p>
                          Minimum pH: <span className="data">{minPh}</span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {maxPrecipitation ? (
                        <p>
                          Max Precipitation:{" "}
                          <span className="data">
                            {maxPrecipitation}mm/year
                          </span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {minPrecipitation ? (
                        <p>
                          Minimum Precipitation:{" "}
                          <span className="data">
                            {minPrecipitation}mm/year
                          </span>{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {atmosHumidity ? (
                        <p>
                          Humidity:{" "}
                          <span className="data">{atmosHumidity}</span>{" "}
                          <br></br>
                          <span className="unit-data">
                            Required relative humidity in the air, on a scale
                            from 0 ( less than or equal to 10%) to 10 (greater
                            than or equal to 90%)
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                      {soilHumidity ? (
                        <p>
                          Soil Humidity:{" "}
                          <span className="data">{soilHumidity}</span> <br></br>
                          <span className="unit-data">
                            Required humidity of the soil, on a scale from 0
                            (xerophile) to 10 (subaquatic)
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                      {soilNutriments ? (
                        <p>
                          Soil Nutriments:{" "}
                          <span className="data">{soilNutriments}</span>
                          <br></br>
                          <span className="unit-data">
                            Required quantity of nutriments in the soil, on a
                            scale from 0 (oligotrophic) to 10 (hypereutrophic)
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                      {soilTexture ? (
                        <p>
                          Soil Texture:{" "}
                          <span className="data">{soilTexture}</span> <br></br>
                          <span className="unit-data">
                            Required texture of the soil, on a scale from 0
                            (clay) to 10 (rock)
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>{" "}
                  {state.switch ? (
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
                  ) : (
                    " "
                  )}
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
