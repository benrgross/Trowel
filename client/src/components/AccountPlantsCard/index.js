import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { useHistory } from "react-router-dom";
import { REMOVE_PLANT } from "../../utils/actions";
import API from "../../utils/API";
import "./accountplant.css";

function AccountPlantCard() {
  const [state, dispatch] = useStoreContext();
  const { accountID, plants } = state.account;
  console.log("Account State:", state.account);
  let history = useHistory();

  const removePlant = async (id, event) => {
    event.stopPropagation();

    const update = await API.updateAccount(accountID, id);
    console.log("Update Successful!", update);

    dispatch({
      type: REMOVE_PLANT,
      plantID: id,
    });
  };

  const getPlant = async (plant, id, notes, lightCondition) => {
    const item = {
      plant,
    };

    localStorage.removeItem("plantURL");
    localStorage.setItem("plantState", JSON.stringify(item));

    const plantObject = {
      id: id,
      atmosHumidity: plant.atmosHumidity,
      images: plant.images,
      bloomMonths: plant.bloomMonths,
      commonName: plant.commonName,
      scientificName: plant.scientificName,
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
      maxTemp: plant.maxTemp,
      minPh: plant.minPh,
      minPrecipitation: plant.minPrecipitation,
      minTemp: plant.maxTemp,
      native: plant.native,
      soilNutriments: plant.soilNutriments,
      soilTexture: plant.soilTexture,
      notes: notes ? notes.note : "",
      notesDate: notes ? notes.date : "",
    };

    dispatch({
      type: "SPOTLIGHT",
      spotlight: plantObject,
      switch: false,
      lightCondition: lightCondition,
    });

    history.push("/plant");
  };

  const getNotes = async (plant, id, notes, event) => {
    event.stopPropagation();

    const plantObject = {
      id: id,
      images: plant.images,
      commonName: plant.commonName,
      scientificName: plant.scientificName,
      flowerColor: {
        color: plant.flowerColor.color,
        conspicuous: plant.flowerColor.conspicuous,
      },
      maxTemp: plant.maxTemp,
      minTemp: plant.minTemp,
      notes: notes ? notes.note : "",
      notesDate: notes ? notes.date : "",
    };

    dispatch({
      type: "SPOTLIGHT",
      spotlight: plantObject,
    });

    history.push("/notes");
  };

  return (
    <div>
      <div className="row d-flex justify-content-center plant-row">
        {plants
          ? plants.map(({ plant, _id, notes, lightCondition }) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 plant-col"
                onClick={() => getPlant(plant, _id, notes, lightCondition)}
              >
                <div
                  className="container spotlight-card card plantAcc-card text-center"
                  key={_id}
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 plant-img-card">
                      <img
                        className=" card-img-top rounded add-plant-img"
                        onClick={() => getPlant(plant, _id, notes)}
                        style={{
                          height: "10rem",
                          cursor: "pointer",
                          width: "12rem",
                        }}
                        src={plant.img}
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <p>{plant.commonName}</p>
                      {plant.scientificName ? (
                        <p> {plant.scientificName}</p>
                      ) : (
                        ""
                      )}
                      <p>Light Condition - {lightCondition}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <button
                        className="btn plant"
                        onClick={(e) => getNotes(plant, _id, notes, e)}
                      >
                        Notes
                      </button>
                      <button
                        className="btn delete-plant"
                        onClick={(e) => removePlant(_id, e)}
                      >
                        Delete Plant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "No Plants Added"}
      </div>
    </div>
  );
}

export default AccountPlantCard;
