import React from "react";

const Annijtje = (props) => {
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
      y1={defaultX2}
      x2={defaultY1}
      y2={defaultY2}
      {...commonProps}
    />
  );
};

export default Annijtje;
