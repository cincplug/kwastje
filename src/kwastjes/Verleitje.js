import React from "react";

const Verleitje = (props) => {
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
    <polygon
      points={`${defaultX1},${defaultY1} ${
        Math.sin(defaultX2 * index) + w / 2
      },${Math.cos(defaultY2 * index) + h / 2} ${defaultX1},${defaultY1} ${
        Math.sin(defaultX1) + w / 2
      },${Math.cos(defaultY1 + h / 2)} ${defaultX2},${defaultY2}`}
      {...commonProps}
    />
  );
};

export default Verleitje;
