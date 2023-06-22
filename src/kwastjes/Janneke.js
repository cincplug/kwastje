import React from "react";

const Janneke = (props) => {
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
      },${
        Math.cos(defaultY1) * index + h / 2
      } ${defaultX2},${defaultY2} ${Math.abs(
        Math.sin(defaultX2 * index + w / 2)
      )},${Math.cos(defaultY2) * index + h / 2}`}
      {...commonProps}
    />
  );
};

export default Janneke;
