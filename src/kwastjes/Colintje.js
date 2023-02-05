import React from "react";

const Colintje = (props) => {
  const {
    // setup,
    index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const x3 = defaultX2 + index * 2;
  const y3 = defaultY2 * index;
  return <path d={`M${defaultX1},${defaultY1} L${defaultX2},${defaultY2} L${x3},${y3}`} {...commonProps} />;
};

export default Colintje;
