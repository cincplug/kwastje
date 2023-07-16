import React from "react";
import katjes from "./katjes";

const Katje = (props) => {
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
  const welkeKatjeRaw = (katjes.length * (defaultX1 - breedtje / 2)) / (w - breedtje);
  let welkeKatje = Math.round(
    welkeKatjeRaw
  );
  const scale = welkeKatje - welkeKatjeRaw;
  if (index !== welkeKatje && setup.isSimplified) welkeKatje = katjes.length - index;
  return (
    <image
      className="katje"
      href={katjes[welkeKatje]}
      transform={`translate(${breedtje / 2 + scale * setup.thickness}, 100) rotate(${
        (welkeKatje * defaultX2) / (100000 / (setup.modifier + setup.growth)) - 1
      })`}
      {...commonProps}
      style={{
        opacity:
          index === welkeKatje ? 1 : Math.min(1, setup.opacity / (index * 64)),
      }}
    />
  );
};

export default Katje;
