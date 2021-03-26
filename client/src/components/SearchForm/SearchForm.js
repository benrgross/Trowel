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
    const query = {
      query: queryRef.current.value,
    };
    const { data } = await API.searchPlants(query);
    console.log("data", data);
    const plants = data.data.map((plant) => {
      return {
        commonName: plant.common_name,
        scientificName: plant.scientific_name,
        img: plant.image_url,
        links: plant.links,
      };
    });
    dispatch({
      type: RESULTS,
      results: plants,
    });
  };

  return (
    <div className="container d-flex justify-content-center">
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
