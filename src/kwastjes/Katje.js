import React from "react";
import katjes from "./katjes";

const Katje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    defaultX1,
    // defaultX2,
    // defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const breedtje = 400;
  const welkeKatje = Math.round(
    (katjes.length * (defaultX1 - breedtje / 2)) / (w - breedtje)
  );
  if (index !== welkeKatje && setup.isSimplified) return null;
  return (
    <image
      className="katje"
      href={katjes[welkeKatje]}
      transform={`translate(${breedtje / 2}, ${breedtje / 4})`}
      {...commonProps}
    />
  );
};

export default Katje;
