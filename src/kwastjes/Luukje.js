import React from "react";

const Luukje = (props) => {
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
    <line
      x1={defaultX1}
      y1={defaultY1}
      x2={defaultX2}
      y2={defaultY2}
      {...commonProps}
    />
  );
};

export default Luukje;
