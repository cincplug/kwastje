import React from "react";
import Katje from "./Katje";

const Katje2 = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    // commonProps,
    normalize,
  } = props;

  const x = `${
    (x1 / 10) * setup.growth +
    Math.max(setup.thickness, index ** setup.modifier) * setup.thickness
  }`;
  return (
    <Katje
      {...props}
      transform={normalize(
        `translate(${x}, ${(y1 / 10) * setup.growth + index}) scale(${Math.min(
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

export default Katje2;
