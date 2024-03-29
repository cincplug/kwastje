import React from "react";
import katjes from "./katjes";
import Katje from "./Katje";

const Katje3 = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
  } = props;

  const welkeKatje = Math.round((katjes.length * x1) / w);
  return (
    index && (
      <Katje
        {...props}
        transform={`rotate(${
          (welkeKatje * x1) / y1 / ((1 / setup.modifier) * setup.thickness)
        }) scale(${1 - (1 / (index + 1)) * setup.growth})`}
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

export default Katje3;
