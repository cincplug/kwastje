import React from "react";

const Hylke = (props) => {
  const {
    // setup,
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
      d={`M${defaultX1},${defaultY1} Q${defaultX2} ${defaultY2}, ${defaultY1} ${defaultX1} L${defaultY2},${defaultX2}`}
      {...commonProps}
    />
  );
};

export default Hylke;
