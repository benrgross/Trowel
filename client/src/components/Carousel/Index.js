import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carouse;";

const handleDragStart = (e) => e.preventDefault();

// use effect to create the jsx for each image in the array of image urls
// push to items

const items = [
  // <img src="path-to-img" onDragStart={handleDragStart} />
];

function Carousel() {
  return <AliceCarousel mouseTracking items={items} />;
}

export default Carousel;
