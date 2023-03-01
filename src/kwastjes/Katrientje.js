import React from "react";

const Katrientje = (props) => {
  const {
    setup,
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
  const y3 = defaultY2 * index * setup.modifier;
  return <path d={`M${defaultX2},${defaultY2} L${x3},${y3 * defaultX1}`} {...commonProps} />;
};

export default Katrientje;
