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

      const item = {
        url: url,
      };

      const { data } = await API.getPlant(item);

      const plantObject = {
        img: data.image,
        atmosHumidity: data.atmosHumidity,
        bloomMonths: data.bloomMonths,
        commonName: data.commonName,
        scientificName: data.scientificName,
        edible: data.edible,
        family: data.family,
        familyCommonName: data.familyCommonName,
        flowerColor: {
          color: data.flowerColor.color,
          conspicuous: data.flowerColor.conspicuous,
        },
        genus: data.genus,
        growthHabit: data.growthHabit,
        growthRate: data.growthRate,
        growthForm: data.growthForm,
        shape: data.shape,
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
        soilNutriments: data.soilNutriments,
        soilTexture: data.soilTexture,
        soilHumidity: data.soilHumidity,
        notes: "",
      };

      dispatch({
        type: "SPOTLIGHT",
        spotlight: plantObject,
        switch: true,
      });
    } else if (JSON.parse(localStorage.getItem("plantState"))) {
      const { plant } = JSON.parse(localStorage.getItem("plantState"));

      const plantObject = {
        img: plant.image,
        atmosHumidity: plant.atmosHumidity,
        bloomMonths: plant.bloomMonths,
        commonName: plant.commonName,
        scientificName: plant.scientificName,
        edible: plant.edible,
        family: plant.family,
        familyCommonName: plant.familyCommonName,
        flowerColor: {
          color: plant.flowerColor.color,
          conspicuous: plant.flowerColor.conspicuous,
        },
        genus: plant.genus,
        growthHabit: plant.growthHabit,
        growthRate: plant.growthRate,
        growthForm: plant.growthForm,
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
        soilNutriments: plant.soilNutriments,
        soilTexture: plant.soilTexture,
        soilHumidity: plant.soilHumidity,
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
