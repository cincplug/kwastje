import React from "react";

const Colintje = (props) => {
  const {
    // setup,
    index,
    // w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  const y3 = y2 * index;
  return <path d={`M${x1},${y1} L${x2},${y2} L${x1},${y3}`} {...commonProps} />;
};

export default Colintje;
