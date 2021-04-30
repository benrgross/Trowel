import React, { useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import "./Search/style.css";

function AccountNotes() {
  const [state, dispatch] = useStoreContext();
  const { accountID, accountNotes } = state;

  // UseEffect to grab account data from ID
  useEffect(() => {
    getAccountNote();
  }, [])

  const getAccountNote = async () => {
    const { data } = await API.findAccountById(accountID);

    dispatch({
      type: "STORE_ACCOUNT_NOTES",
      accountNotes: data.notes,
    });
  }

  console.log("State Account Notes: ", accountNotes)

  // TODO: Display every note within the account
  // TODO: Form that sends note obj with a title and note attribute
  // TODO: Edit button that edits an existing note

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
      {/* {notes.map(note => {
       return (
        <div className="container">
          <p>{note ? note.note : "No Notes Added"}</p>
        </div>
        )
      })} */}
    </div>
  );
}

const style = {
  display: "block",
  height: "500px",
  width: "100%",
};

export default AccountNotes;
