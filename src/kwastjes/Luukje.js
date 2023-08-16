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
    <path d={`M${defaultX1}, ${defaultY1} L${defaultX2},${defaultY2}`}
      {...commonProps}
    />
  );
};

export default Luukje;
