import React from "react";
import katjes from "./katjes";

const Katje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const welkeKatje = Math.round(
    (katjes.length * (defaultX1 - 200)) / (w - 400)
  );
  return (
    <image
      className="katje"
      href={katjes[welkeKatje]}
      transform={`translate(200, 100) rotate(${
        (welkeKatje * defaultX2) / (10000 / setup.modifier) - 1
      })`}
      {...commonProps}
    />
  );
};

export default Katje;
