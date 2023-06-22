import React from "react";

const Floortje = (props) => {
  const {
    // setup,
    index,
    w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <polyline
      points={`${defaultX1},${defaultY1} ${
        Math.sin(defaultX1 * index) + w / 2
      },${Math.cos(defaultY1) * 3 * index + h} ${defaultX1 - defaultY1 / 2},${
        (defaultY1 - defaultX1) / 2
      } ${defaultX2},${defaultY2} ${w / 2},${h / 2} ${
        Math.cos(defaultY2) * index + h / 2
      }`}
      {...commonProps}
    />
  );
};

export default Floortje;
