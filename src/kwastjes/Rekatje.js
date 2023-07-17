import React from "react";
import katjes from "./katjes";
import Katje from "./Katje";

const Rekatje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    defaultX1,
    defaultX2,
    // defaultY1,
    // defaultY2,
  } = props;

  const welkeKatje = Math.round((katjes.length * defaultX1) / w);
  return (
    <Katje
      {...props}
      transform={`translate(${index + defaultX1 / setup.growth}, 100) rotate(${
        (welkeKatje * defaultX2) / ((1 / setup.modifier) * setup.thickness) - 1
      }) scale(${1 / index})`}
      style={{
        opacity:
          index === welkeKatje ? 1 : Math.min(1, setup.opacity / (index * 64)),
      }}
    />
  );
};

export default Rekatje;
