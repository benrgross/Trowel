import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { useHistory, Link } from "react-router-dom";
import { SET_SAVED_ACCOUNT } from "../../utils/actions";
import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";
import "./spotlight.css";
function AddPlantCard() {
  const [state, dispatch] = useStoreContext();
  const {
    viewPlant: {
      id,
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
      notesDate,
      soilNutriments,
      soilTexture,
    },
  } = state;
  const lightRef = useRef();
  const noteRef = useRef();
  let history = useHistory();
  const savePlantObj = {
    plant: state.viewPlant,
    accountName: state.accountName,
  };
  const savePlantSelection = async () => {
    console.log("lightRef", lightRef.current.value);
    const { data: newPlant } = await API.addPlantToAccount(savePlantObj);
    const saveLight = {
      id: newPlant._id,
      plantId: newPlant.plants[newPlant.plants.length - 1]._id,
      accountName: state.accountName,
      lightCondition: lightRef.current.value,
    };
    await API.addLightConditions(saveLight);
    console.log("Plant Saved!");
    const { data } = await API.getPlantsByAccount({
      accountName: state.accountName,
    });
    console.log("account pull", data);
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
  const addNote = async (objectID) => {
    console.log("Plant ID: ", objectID);
    console.log("Account ID:", state.account.accountID);
    const note = {
      id: objectID,
      note: {
        note: noteRef.current.value,
        date: new Date(),
      },
    };
    console.log("Posted Note Obj: ", note);
    const addNote = await API.postPlantNote(state.account.accountID, note);
    console.log(addNote);
  };
  const changeNote = (note) => {
    dispatch({
      type: "CHANGE_NOTES",
      newNote: note,
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
          <h1>{commonName}</h1>
        </div>
      </div>

      {state.switch ? (
        <div className="container spotlight-card shadow">
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
                        style={{
                          padding: "50px",
                          height: "2.4rem",
                          width: "10rem",
                        }}
                        className="btn btn-success add-plant p-2"
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
      ) : (
        <div className="container spotlight-card">
          <h2>Notes: </h2>
          <h3>Last Modified: {notesDate}</h3>
          <div className="form-group">
            <textarea
              name="Notes"
              ref={noteRef}
              placeholder="Water once a week..."
              value={notes}
              onChange={(e) => changeNote(e.target.value)}
              style={style}
            ></textarea>
          </div>
          <button onClick={() => addNote(id)}>Add</button>
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
