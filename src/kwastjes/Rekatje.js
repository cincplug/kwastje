import React from "react";
import katjes from "./katjes";
import Katje from "./Katje";

const Rekatje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    x2,
    y1,
    // y2,
  } = props;

  const welkeKatje = Math.round((katjes.length * x1) / w);
  return (
    index && (
      <Katje
        {...props}
        transform={`translate(${x2}, ${y1 / 2}) rotate(${
          (welkeKatje * x1) / ((1 / setup.modifier) * setup.thickness)
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
