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

<<<<<<< HEAD
  const getPlant = async (plant, id, notes, lightCondition) => {    
=======
  const getPlant = async (plant, id, notes, lightCondition) => {
    console.log("Light Condition: ", lightCondition);

>>>>>>> main
    const item = {
      plant,
    };

    localStorage.removeItem("plantURL");
    localStorage.setItem("plantState", JSON.stringify(item));

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
      notesDate: notes ? notes.date : "No Notes Have Been Added Yet",
    };

    dispatch({
      type: "SPOTLIGHT",
      spotlight: plantObject,
      switch: false,
      lightCondition: lightCondition
    });

    history.push("/plant");
  };

  const getNotes = async (plant, id, notes, event) => {
    event.stopPropagation();

    const plantObject = {
      id: id,
      commonName: plant.commonName,
      flowerColor: {
        color: plant.flowerColor.color,
        conspicuous: plant.flowerColor.conspicuous,
      },
      maxTemp: {
        deg_f: plant.maxTemp.deg_f,
        deg_c: plant.maxTemp.deg_c,
      },
      minTemp: {
        deg_f: plant.minTemp.deg_f,
        deg_c: plant.minTemp.deg_c,
      },
      notes: notes ? notes.note : "",
      notesDate: notes ? notes.date : "No Notes Have Been Added Yet",
    };
    console.log("Plant Object: ", plantObject);

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
