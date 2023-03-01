import React from "react";

const Denisje = (props) => {
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
  return <circle cx={x3} cy={defaultY2} r={defaultY1 * setup.modifier} {...commonProps} />;
};

export default Denisje;
