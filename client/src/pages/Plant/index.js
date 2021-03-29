import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
// import { useHistory, Link } from "react-router-dom";
import { SET_SAVED_ACCOUNT } from "../../utils/actions";
// import { FaArrowCircleLeft, FaPlus } from "react-icons/fa";
import AddPlantCard from "../../components/AddPlantCard";
// import "./plant.css";

const Plant = () => {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    const { url } = JSON.parse(localStorage.getItem("plantURL"));
    console.log("url", url);

    const item = {
      url: url,
    };

    const { data } = await API.getPlant(item);

    const plantObject = {
      atmosHumidity: data.atmosHumidity,
      bloomMonths: data.bloomMonths,
      commonName: data.commonName,
      edible: data.edible,
      family: data.family,
      familyCommonName: data.familyCommonName,
      flowerColor: {
        color: data.flowerColor.color,
        conspicuous: data.flowerColor.conspicuous,
      },
      genus: data.genus,
      growthHabit: data.growthHabit,
      heightAvgCm: data.heightAvg.cm,
      // img: data.img,
      light: data.light,
      maxPh: data.maxPh,
      maxPrecipitation: data.maxPrecipitation.mm,
      maxTemp: {
        deg_f: data.maxTemp.deg_f,
        deg_c: data.maxTemp.deg_c,
      },
      minPh: data.minPh,
      minPrecipitation: data.minPrecipitation.mm,
      minTemp: {
        deg_f: data.minTemp.deg_f,
        deg_c: data.minTemp.deg_c,
      },
      native: data.native,
      scientificName: data.scientific_name,
      soilNutriments: data.soilNutriments,
      soilTexture: data.soilTexture,
      notes: "",
    };

    dispatch({
      type: "SPOTLIGHT",
      spotlight: plantObject,
      switch: true,
    });
  };

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
