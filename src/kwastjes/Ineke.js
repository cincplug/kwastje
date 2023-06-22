import React from "react";

const Ineke = (props) => {
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

  return (
    <path
      d={`M${defaultX1},${defaultY1} Q${Math.pow(
        defaultY1,
        setup.modifier
      )} ${Math.pow(
        defaultX1,
        setup.modifier
      )}, ${defaultY2} ${defaultX2} L${defaultX2},${defaultY2}`}
      {...commonProps}
    />
  );
};

export default Ineke;
