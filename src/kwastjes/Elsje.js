import React from "react";

const Elsje = (props) => {
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

  // const x3 = defaultX2 + index * 2;
  // const y3 = defaultY2 * setup.modifier;
  return (
    <path
      d={`M${defaultX1},${defaultY1} L${defaultX2},${defaultY2} L${
        defaultX2 * 5
      },${defaultY2 + 500 * setup.modifier} L${defaultX2 - 70},${
        defaultY2 - 500 * setup.modifier
      }`}
      {...commonProps}
    />
  );
};

export default Elsje;
