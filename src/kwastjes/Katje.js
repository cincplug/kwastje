import React from "react";
import katjes from "./katjes";

const Katje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    // x2,
    // y1,
    // y2,
    commonProps,
    normalize,
    style,
    transform,
    isReversed,
  } = props;

  const breedtje = Math.min(400, w);
  const welkeKatjeRaw = (katjes.length * (x1 - breedtje / 2)) / (w - breedtje);
  let welkeKatje = Math.round(welkeKatjeRaw);
  const scale = welkeKatje - welkeKatjeRaw;
  return (
    <image
      className={`katje`}
      href={katjes[welkeKatje]}
      transform={
        transform ||
        `translate(${isReversed ? "-" : ""}${
          breedtje / 2 + scale * setup.thickness
        }, 100) ${isReversed ? "scale(-1, 1)" : ""}`
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
