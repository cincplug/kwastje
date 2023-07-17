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
    style,
    transform,
    isReversed,
  } = props;

  const breedtje = 400 * (isReversed ? -1 : 1);
  const welkeKatjeRaw =
    (katjes.length * (defaultX1 - breedtje / 2)) / (w - breedtje);
  let welkeKatje = Math.round(welkeKatjeRaw);
  const scale = welkeKatje - welkeKatjeRaw;
  if (index !== welkeKatje && setup.isSimplified)
    welkeKatje = isReversed ? index : katjes.length - index;
  return (
    <image
      className="katje"
      href={katjes[welkeKatje]}
      transform={
        transform ||
        `translate(${breedtje / 2 + scale * setup.thickness}, 100) rotate(${
          (welkeKatje * defaultX2) /
            (1000000 / (setup.modifier * setup.growth)) -
          1
        }) ${isReversed ? "scale(-1, 1)" : ""}`
      }
      {...commonProps}
      style={
        style || {
          opacity:
            index === welkeKatje
              ? 1
              : Math.min(1, setup.opacity / (index * 64)),
        }
      }
    />
  );
};

export default Katje;
