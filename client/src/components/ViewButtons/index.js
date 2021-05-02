import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { CAROUSEL } from "../../utils/actions";
import "./style.css";

function ViewButtons() {
  const [state, dispatch] = useStoreContext();
  const viewImages = (type) => {
    dispatch({
      type: CAROUSEL,
      view: type,
      carousel: true,
    });
  };

  return (
    <div>
      {state.viewPlant.images.leaf.length > 0 ? (
        <button className="btn submit view " onClick={() => viewImages("leaf")}>
          leaf
        </button>
      ) : (
        " "
      )}{" "}
      {state.viewPlant.images.bark.length > 0 ? (
        <button className="btn submit view " onClick={() => viewImages("bark")}>
          bark
        </button>
      ) : (
        " "
      )}{" "}
      {state.viewPlant.images.flower.length > 0 ? (
        <button
          className="btn submit view "
          onClick={() => viewImages("flower")}
        >
          flower
        </button>
      ) : (
        " "
      )}{" "}
      {state.viewPlant.images.habit.length > 0 ? (
        <button
          className="btn submit view "
          onClick={() => viewImages("habit")}
        >
          habit
        </button>
      ) : (
        " "
      )}{" "}
      {state.viewPlant.images.other.length > 0 ? (
        <button
          className="btn submit view "
          onClick={() => viewImages("other")}
        >
          other
        </button>
      ) : (
        " "
      )}{" "}
    </div>
  );
}

export default ViewButtons;
