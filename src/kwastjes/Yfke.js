import React from "react";
import Aafje from "./Aafje";

const Yfke = (props) => {
  const { index, setup, w, h, x1, y1 } = props;
  const n = Math.ceil(setup.modifier);
  return (
    <>
      <Aafje {...props} stepCount={n} />
      {index < setup.dotsCount / n && <g transform={`rotate(${index},${x1 - w},${y1 + h * n})`}>
        <Aafje {...props} stepCount={n} />
      </g>}
    </>
  );
};

export default Yfke;
