import React from "react";
// import { useStoreContext } from "../../utils/GlobalState";
// import API from "../../utils/API";
// import { useHistory, Link } from "react-router-dom";
// import { SET_SAVED_ACCOUNT } from "../../utils/actions";
// import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";
import AddPlantCard from "../../components/AddPlantCard";
// import "./plant.css";

const Plant = () => {
  // const [state, dispatch] = useStoreContext();
  // const lightRef = useRef();
  // const {
  //   viewPlant: {
  //     id,
  //     commonName,
  //     scientificName,
  //     img,
  //     atmosHumidity,
  //     edible,
  //     family,
  //     familyCommonName,
  //     genus,
  //     growthHabit,
  //     heightAvgCm,
  //     light,
  //     maxPh,
  //     maxPrecipitation,
  //     minPh,
  //     minPrecipitation,
  //     native,
  //     notes,
  //     soilNutriments,
  //     soilTexture,
  //   },
  // } = state;
  // console.log("Switch State: ", state.switch);
  // let history = useHistory();
  // const noteRef = useRef();

  // console.log("Switch State: ", state.switch);

  // const savePlantObj = {
  //   plant: state.viewPlant,
  //   accountName: state.accountName,
  // };

  // console.log("Plant To Save: ", savePlantObj);

  // const savePlantSelection = async () => {
  //   console.log("lightRef", lightRef.current.value);
  //   const { data: newPlant } = await API.addPlantToAccount(savePlantObj);

  //   const saveLight = {
  //     id: newPlant._id,
  //     plantId: newPlant.plants[newPlant.plants.length - 1]._id,
  //     accountName: state.accountName,
  //     lightCondition: lightRef.current.value,
  //   };

  //   await API.addLightConditions(saveLight);
  //   console.log("Plant Saved!");

  //   const { data } = await API.getPlantsByAccount({
  //     accountName: state.accountName,
  //   });
  //   console.log("account pull", data);

  //   const accountObj = {
  //     accountID: data._id,
  //     accountName: data.accountName,
  //     client: data.clientContact.clientName,
  //     clientPhone: data.clientContact.phone,
  //     clientEmail: data.clientContact.email,
  //     address: data.location.address,
  //     distZone: data.location.distZone,
  //     notes: data.notes,
  //     plants: data.plants,
  //   };

  //   dispatch({
  //     type: SET_SAVED_ACCOUNT,
  //     account: accountObj,
  //   });

  //   history.push("/account");
  // };

  // const addNote = async (objectID) => {
  //   console.log("Plant ID: ", objectID);
  //   console.log("Account ID:", state.account.accountID);

  //   const note = {
  //     id: objectID,
  //     note: {
  //       note: noteRef.current.value,
  //       date: new Date(),
  //     },
  //   };
  //   console.log("Posted Note Obj: ", note);

  //   const addNote = await API.postPlantNote(state.account.accountID, note);
  //   console.log(addNote);
  // };

  // const changeNote = (note) => {
  //   dispatch({
  //     type: "CHANGE_NOTES",
  //     newNote: note,
  //   });
  // };

  return (
    <div>
      <AddPlantCard />
    </div>
  );
};

// const style = {
//   display: "block",
//   height: "500px",
//   width: "100%",
// };

export default Plant;
