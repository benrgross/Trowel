import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { LOADING, RESULTS } from "../../utils/actions";
import "./search.css";

function SearchForm() {
  const queryRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: LOADING,
    });
    const query = queryRef.current.value;
    const { data } = await API.searchPlantCommon(query);
    console.log(data);
  };

  return (
    <div className="container">
      <form className="shadow">
        <div className="form-group ">
          <label>Search For Plant</label>
          <input
            ref={queryRef}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
