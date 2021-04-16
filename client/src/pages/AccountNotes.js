import React, { useRef } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import "./Search/style.css";

function AccountNotes() {
  const [state, _] = useStoreContext();
  const { accountID } = state;

  console.log("Account ID: ", accountID)

//   const noteRef = useRef();
//   let history = useHistory();

//   const addNote = async (objectID) => {
//     const note = {
//       id: objectID,
//       note: {
//         note: noteRef.current.value,
//         date: new Date(),
//       },
//     };
//     const addNote = await API.postPlantNote(state.account.accountID, note);
//     console.log("Added Note: ", addNote);

//     history.push("/account");
//   };

//   const changeNote = (note) => {
//     dispatch({
//       type: "CHANGE_NOTES",
//       newNote: note,
//     });
//   };

  return (
    <div className="container notes-con">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
            <h1>Account Notes</h1>
          </div>
        </div>
      </div>
      <div style={{ padding: "5%" }} className="container spotlight-card">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2>Notes </h2>
            <h3>Last Modified: Insert Date</h3>
            <div className="form-group">
              <textarea
                name="Notes"
                // ref={noteRef}
                placeholder="Add A Note"
                // value={notes}
                // onChange={(e) => changeNote(e.target.value)}
                style={style}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center">
            <button className="btn plant" onClick={() => console.log("Clicked Add Btn")}>
              Add
            </button>
          </div>
          <div className="col-sm-5 col-md-5 col-lg-5"></div>
          <div className="col-sm-5 col-md-5 col-lg-5"></div>
        </div>
      </div>
    </div>
  );
}

const style = {
  display: "block",
  height: "500px",
  width: "100%",
};

export default AccountNotes;
