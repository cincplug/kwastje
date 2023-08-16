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
    <path d={`M${defaultX1}, ${defaultX2} L${defaultY1},${defaultY2}`}
      {...commonProps}
    />
  );
};

export default Annijtje;
