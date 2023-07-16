import React from "react";
import Katje from "./Katje";

const Dekatje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    // defaultY1,
    // defaultY2,
    // commonProps,
  } = props;

  const breedtje = 400;
  return (
    <Katje
      {...props}
      transform={`translate(${
        defaultX1 / 2 + index ** setup.modifier - breedtje / 1 / setup.thickness
      }, 0) rotate(${-index * setup.modifier}) scale(${
        index / (index + setup.growth / 10)
      })`}
      style={{
        opacity: Math.min(1, setup.opacity / (index * 128)),
      }}
    />
  );
};

export default Dekatje;
