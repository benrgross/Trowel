import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
function Results() {
  const [state, dispatch] = useStoreContext();

  const getPlant = async (plant) => {
    console.log(plant);
    const item = {
      url: plant.links.self,
    };
    console.log(item.url);
    const { data } = await API.getPlant(item);
    console.log(data);

    // Use a dispatch to send this object and set the values to viewPlant state value
    console.log({
      commonName: plant.commonName,
      scientificName: plant.scientificName,
      img: plant.img,
    });
  };

  return (
    <div>
      {state.results.map((plant) => (
        <div className="container">
          <p>{plant.commonName}</p>
          <p>{plant.scientificName} </p>
          <div className="container">
            <img
              onClick={() => getPlant(plant)}
              className="img-thumbnail"
              style={{ height: "200px", cursor: "pointer" }}
              src={plant.img}
            />
          </div>
        </div>
      ))}
      ,
    </div>
  );
}

export default Results;
