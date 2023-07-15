import React from "react";
import katjes from "./katjes";

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
    commonProps,
  } = props;

  const breedtje = 400;
  let welkeKatje = Math.round(
    (katjes.length * (defaultX1 - breedtje / 2)) / (w - breedtje)
  );
  if (index !== welkeKatje && setup.isSimplified)
    welkeKatje = katjes.length - index;
  return (
    <image
      className="katje"
      href={katjes[welkeKatje]}
      transform={`translate(${index + defaultX1}, 100) rotate(${
        (welkeKatje * defaultX2) / ((10000 / setup.modifier) * 2) - 1
      }) scale(${1 / index})`}
      {...commonProps}
    />
  );
};

export default Rekatje;
