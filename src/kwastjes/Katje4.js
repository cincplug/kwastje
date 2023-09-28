import React from "react";
import Katje from "./Katje";

const Katje4 = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    // x1,
    x2,
    // y1,
    y2,
    commonProps,
  } = props;

  const x = `${
    (x2 / y2) * setup.growth +
    Math.max(setup.thickness, index * setup.modifier) * setup.thickness
  }`;
  return (
    <Katje
      {...props}
      transform={commonProps.normalize(
        `translate(${x}, ${index * setup.growth}) scale(${setup.growth / x * index})`
      )}
      style={{
        opacity: Math.min(1, 1 / w * index * setup.opacity),
      }}
    />
  );
};

export default Katje4;
