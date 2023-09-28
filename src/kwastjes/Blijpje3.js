import React from "react";
import Blijpje from "./Blijpje";

const Blijpje3 = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
  } = props;

  const qG = setup.thickness * setup.growth;
  const tR = qG * (Math.sin(index) * Math.tan(index)) * setup.modifier;
  return (
    <Blijpje
      {...{
        setup,
        index,
        x1,
        y1,
        commonProps,
        tR,
      }}
    />
  );
};

export default Blijpje3;
