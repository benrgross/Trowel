import React, { useEffect } from "react";

import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { useStoreContext } from "../../utils/GlobalState";

const handleDragStart = (e) => e.preventDefault();

// use effect to create the jsx for each image in the array of image urls
// push to items

function Carousel() {
  const [state, dispatch] = useStoreContext();
  const items = [];
  if (state.viewPlant.images) {
    state.viewPlant.images.leaf.forEach((image) => {
      console.log(image.image_url);
      items.push(<img src={image.image_url} onDragStart={handleDragStart} />);
    });
  }
  console.log("items", items);
  //   console.log("viewPlant", state.viewPlant.images.leaf);

  //   useEffect(() => {
  //     console.log("viewPlant", state.viewPlant.images.flower);
  //     // if (leaf) {
  //     //   leaf.forEach((image) => {
  //     //     items.push(<img src="image.image_url" onDragStart={handleDragStart} />);
  //     //   });
  //     // }
  //   }, []);

  return <AliceCarousel mouseTracking items={items} />;
}

export default Carousel;
