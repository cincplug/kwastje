import React from "react";

const Kieke = (props) => {
  const {
    // setup,
    // index,
    w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <line
      x1={defaultX1}
      y1={defaultY1}
      x2={w - (defaultX2 * Math.atan(defaultX1)) / 2}
      y2={h - defaultY2}
      {...commonProps}
    />
  );
};

export default Kieke;
