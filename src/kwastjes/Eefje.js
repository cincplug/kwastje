import React from "react";

const Eefje = (props) => {
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
    <polyline
      points={`${defaultX1},${defaultY1} ${defaultX2},${defaultY2} ${defaultY1},${defaultX1} ${defaultY2},${defaultX2}`}
      {...commonProps}
    />
  );
};

export default Eefje;
