import React from "react";

const Luukje = (props) => {
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

  // const x3 = defaultX2 + index / 2;
  // const y3 = defaultY2 * index * setup.modifier / defaultX2;
  return (
    <path
      d={`M${defaultX1},${defaultY1} L${defaultX1},${defaultY1 * setup.modifier}  L${defaultX1},${
        defaultX2 * setup.modifier
      } L${defaultX1},${defaultY2 * setup.modifier}`}
      {...commonProps}
    />
  );
};

export default Luukje;
