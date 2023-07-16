import React from "react";
import katjes from "./katjes";

const Dekatje = (props) => {
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
      transform={`translate(${
        defaultX1 / 2 + index ** setup.modifier - breedtje / 1 / setup.thickness
      }, ${breedtje / 4}) rotate(${index / 10}) scale(${
        index / (index + setup.growth / 10)
      })`}
      {...commonProps}
      style={{
        opacity:
          index === welkeKatje ? 1 : Math.min(1, setup.opacity / (index * 64)),
      }}
    />
  );
};

export default Dekatje;
