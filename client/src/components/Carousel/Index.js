import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { useStoreContext } from "../../utils/GlobalState";
import "./style.css";

const handleDragStart = (e) => e.preventDefault();

// next step break up arrays of images into state

function Carousel() {
  const [state, dispatch] = useStoreContext();
  const items = [];
  const responsive = {
    0: { items: 1 },
    1024: { items: 2 },
  };
  if (state.viewPlant.images) {
    state.viewPlant.images.leaf.forEach((image) => {
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
