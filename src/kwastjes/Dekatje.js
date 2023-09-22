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
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const x = `${
    (defaultX1 / 10) * setup.growth +
    Math.max(setup.thickness, index ** setup.modifier) * setup.thickness
  }`;
  return (
    <Katje
      {...props}
      transform={commonProps.normalize(
        `translate(${x}, ${defaultY1 / 10 * setup.growth + index}) scale(${Math.min(
          1,
          (1 / index) * setup.thickness * setup.growth
        )})`
      )}
      style={{
        opacity: Math.min(1, 256 / setup.opacity / index),
      }}
    />
  );
};

export default Dekatje;
