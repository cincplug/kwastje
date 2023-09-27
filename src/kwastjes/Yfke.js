import React from "react";
import Aafje from "./Aafje";

const Yfke = (props) => {
  const { index, w, x1, y1 } = props;
  return (
    <>
      <Aafje {...props} stepCount={4} />
      <g transform={`rotate(${index},${x1 - w},${y1 * index})`}>
        <Aafje {...props} stepCount={2} />
      </g>
    </>
  );
};

export default Yfke;
