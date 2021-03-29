import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import "./style.css";

function BackBtn() {
  return (
    <div>
      <button className="btn back" style={{ cursor: "pointer" }}>
        <FaArrowCircleLeft /> Back
      </button>
    </div>
  );
}

export default BackBtn;
