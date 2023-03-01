import React from "react";

const Truusje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  const offset = setup.modifier * 100;
  return <path d={`M${defaultX1},${defaultY1} L${defaultX1 + 30},${defaultY2} L${defaultX1 + offset},${defaultY1 + offset} ${defaultX2 * offset / 10},${defaultY2 / offset}`} {...commonProps} />;
};

export default Truusje;
