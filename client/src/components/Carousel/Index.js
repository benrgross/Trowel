import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { useStoreContext } from "../../utils/GlobalState";
import "./style.css";

const handleDragStart = (e) => e.preventDefault();

// next step break up arrays of images into state
// if ie bark is in object of images -> put bark into state with array of url tags
// if bark is in state add bark button and so on for each category of images.

function Carousel() {
  const [state, dispatch] = useStoreContext();
  const items = [];
  const responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  };
  if (state.viewPlant.images.leaf) {
    state.viewPlant.images[state.view].forEach((image) => {
      items.push(
        <img
          className="img-thumbnail"
          src={image.image_url}
          onDragStart={handleDragStart}
        />
      );
    });
  }

  return <AliceCarousel mouseTracking items={items} />;
}

export default Carousel;
