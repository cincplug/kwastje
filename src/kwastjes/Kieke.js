import React from "react";

const Kieke = (props) => {
  const {
    // setup,
    // index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    normalize,
  } = props;

  return (
    <path
      d={`M${x1},
      ${y1}
      L${w / 2 - x2 * Math.tan(x1)},
      ${h - y2 * Math.atan(y1)}`}
      {...commonProps}
    />
  );
};

export default Kieke;
