import React from "react";
import Katje from "./Katje";

const Dekatje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    // defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  return (
    <Katje
      {...props}
      transform={commonProps.normalize(
        `translate(${`${
          defaultX1 / setup.growth +
          Math.max(setup.thickness, index ** setup.modifier) / setup.thickness
        }`}, 0) scale(${
          index / (index + setup.growth)
        })`
      )}
      style={{
        opacity: 1 - Math.min(1, 256 / setup.opacity / index),
      }}
    />
  );
};

export default Dekatje;
