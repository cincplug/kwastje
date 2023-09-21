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
    defaultY1,
    // defaultY2,
  } = props;

  const welkeKatje = Math.round((katjes.length * defaultX1) / w);
  return (
    index && (
      <Katje
        {...props}
        transform={`translate(${defaultX2}, ${defaultY1 / 2}) rotate(${
          (welkeKatje * defaultX1) / ((1 / setup.modifier) * setup.thickness)
        }) scale(${1 - 1 / index * setup.growth})`}
        style={{
          opacity:
            index === welkeKatje
              ? 1
              : Math.min(1, setup.opacity / (index * 64)),
        }}
      />
    )
  );
};

export default Rekatje;
