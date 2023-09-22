import React from "react";
import Katje from "./Katje";

const Redekatje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    // defaultX1,
    defaultX2,
    // defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const x = `${
    (defaultX2 / 10) * setup.growth +
    Math.max(setup.thickness, index ** setup.modifier) * setup.thickness
  }`;
  return (
    <Katje
      {...props}
      transform={commonProps.normalize(
        `translate(0, ${index * setup.growth}) scale(${setup.growth * setup.thickness / x * index})`
      )}
      style={{
        opacity: Math.min(1, 1 / w * index * setup.opacity),
      }}
    />
  );
};

export default Redekatje;
