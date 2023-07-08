import React from "react";
import Blijpje from "./Blijpje";

const Reblijpje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const qG = setup.thickness * setup.growth;
  const tR = qG * (Math.sin(index) * Math.tan(index)) * setup.modifier;
  return (
    <Blijpje
      {...{
        setup,
        index,
        defaultX1,
        defaultY1,
        commonProps,
        tR,
      }}
    />
  );
};

export default Reblijpje;
