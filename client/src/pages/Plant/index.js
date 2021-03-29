import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import AddPlantCard from "../../components/AddPlantCard";

const Plant = () => {
  const [_, dispatch] = useStoreContext();
  useEffect(() => {
    getPlant();
  }, []);

  const getPlant = async () => {
    if (JSON.parse(localStorage.getItem("plantURL"))) {
      localStorage.removeItem("plantState");
      const { url } = JSON.parse(localStorage.getItem("plantURL"));
      console.log("url", url);

      const item = {
        url: url,
      };

      const { data } = await API.getPlant(item);
      console.log("API Data: ",data);

      const plantObject = {
        img: data.image,
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
    } else if (JSON.parse(localStorage.getItem("plantState"))) {
      const { plant } = JSON.parse(localStorage.getItem("plantState"));
      console.log("Local Storage: ", plant);

      const plantObject = {
        img: plant.image,
        atmosHumidity: plant.atmosHumidity,
        bloomMonths: plant.bloomMonths,
        commonName: plant.commonName,
        edible: plant.edible,
        family: plant.family,
        familyCommonName: plant.familyCommonName,
        flowerColor: {
          color: plant.flowerColor.color,
          conspicuous: plant.flowerColor.conspicuous,
        },
        genus: plant.genus,
        growthHabit: plant.growthHabit,
        heightAvgCm: plant.heightAvg,
        img: plant.img,
        light: plant.light,
        maxPh: plant.maxPh,
        maxPrecipitation: plant.maxPrecipitation,
        maxTemp: {
          deg_f: plant.maxTemp.deg_f,
          deg_c: plant.maxTemp.deg_c,
        },
        minPh: plant.minPh,
        minPrecipitation: plant.minPrecipitation,
        minTemp: {
          deg_f: plant.minTemp.deg_f,
          deg_c: plant.minTemp.deg_c,
        },
        native: plant.native,
        scientificName: plant.scientific_name,
        soilNutriments: plant.soilNutriments,
        soilTexture: plant.soilTexture,
        notes: "",
      };

      dispatch({
        type: "SPOTLIGHT",
        spotlight: plantObject,
        switch: false,
      });
    }
  };
  return (
    <div>
      <AddPlantCard />
    </div>
  );
};

export default Plant;
