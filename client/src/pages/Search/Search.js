import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import Results from "../../components/Results/Results";
import { RESULTS } from "../../utils/actions";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import API from "../../utils/API";
import BackBtn from "../../components/BackBtn";
import "./style.css";

function Search(type) {
  const [state, dispatch] = useStoreContext();

  // switch (type ) {
  //   case

  // }
  const last = async () => {
    const splitURL = state.pageLinks.prev.split("=");
    const pageStr = splitURL[1];

    const nextQuery = {
      query: splitURL[2],
      page: pageStr[0],
    };

    const { data } = await API.searchPage(nextQuery);

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
  };

  const next = async () => {
    const splitURL = state.pageLinks.next.split("=");
    const pageStr = splitURL[1];

    const nextQuery = {
      query: splitURL[2],
      page: pageStr[0],
    };

    const { data } = await API.searchPage(nextQuery);

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
  };

  return (
    <div className="container">
      <SearchForm />
      <Results />
      {state.results.length <= 1 ? (
        ""
      ) : (
        <div className="row">
          <div className="col-md-6 d-flex justify-content-end">
            {state.pageLinks.prev ? (
              <div className="col-md-6 d-flex justify-content-end">
                <FaArrowLeft onClick={last} style={{ cursor: "pointer" }} />{" "}
              </div>
            ) : (
              <div className="col-md-6 d-flex justify-content-end text-muted">
                <FaArrowLeft />{" "}
              </div>
            )}
          </div>
          {state.pageLinks.next ? (
            <div className="col-md-6 d-flex justify-content-start">
              <FaArrowRight onClick={next} style={{ cursor: "pointer" }} />
            </div>
          ) : (
            <div className="col-md-6 d-flex justify-content-start text-muted">
              <FaArrowRight />
            </div>
          )}
        </div>
      )}
      {/* <footer>
        <Link to="/account">
          <BackBtn />
        </Link>
      </footer> */}
    </div>
  );
}

export default Search;
