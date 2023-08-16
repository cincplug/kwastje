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
    <path
      d={`M${defaultX1},
      ${defaultY1}
      L${w / 2 - defaultX2 * Math.tan(defaultX1)},
      ${h - defaultY2 * Math.atan(defaultY1)}`}
      {...commonProps}
    />
  );
};

export default Kieke;
