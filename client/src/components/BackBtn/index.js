import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

function BackBtn() {
  return (
    <div>
      <button className="btn btn-success" style={{ cursor: "pointer" }}>
        <FaArrowCircleLeft /> Back
      </button>
    </div>
  );
}

export default BackBtn;
