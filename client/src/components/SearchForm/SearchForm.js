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
    const pageLinks = data.links;
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
      pageLinks: pageLinks,
    });

    queryRef.current.value = "";
  };

  return (
    <div className="container">
      <form className="shadow search-form">
        <div className="form-group">
          <input
            ref={queryRef}
            type="email"
            placeholder="Search by plant name"
            className="form-control"
            id="plant-search"
            aria-describedby="search-form"
          />
        </div>
        <button type="submit" className="btn search" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
